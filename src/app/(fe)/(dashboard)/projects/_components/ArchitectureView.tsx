'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { db } from '@/lib/filebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import {
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Panel,
  type NodeTypes,
  addEdge,
  ReactFlow,
  ReactFlowProvider,
  type ReactFlowInstance,
  BackgroundVariant,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExpandIcon } from '@/components/ui/expand';
import { UndoIcon } from '@/components/ui/undo';
import { RedoIcon } from '@/components/ui/redo';
import { TerminalIcon } from '@/components/ui/terminal';
import { ActivityIcon } from '@/components/ui/activity';
import { ArchitectureProvider } from './architecture/ArchitectureContext';
import useAllServices from '@/shared/api/queries/useAllServices';
import { useParams } from 'next/navigation';
import ServiceNode from './architecture/ServiceNode';
import ServiceDetailPanel from './service-detail/ServiceDetailPanel';
import ServiceDialog from './architecture/CreateServiceDialog';
import {
  RoomProvider,
  useMyPresence,
  useOthers,
  useStorage,
  useMutation,
  useOthersMapped,
} from '@liveblocks/react';
import { ClientSideSuspense } from '@liveblocks/react';
import { LiveblocksProvider } from '@liveblocks/react';
import Cursor from '@/components/liveblocks/Cursor';
import { LiveList, shallow } from '@liveblocks/client';
import MessagePanel from './MessagePanel';
import axiosClient from '@/lib/axios';
import { ENDPOINT } from '@/shared/constants/endpoint';
import ContextMenu from './architecture/ContextMenu';
import StickyNoteNode from './architecture/StickyNoteNode';

const nodeTypes: NodeTypes = {
  service: ServiceNode,
  stickyNote: StickyNoteNode,
};

const emptyNodes: Node[] = [];
const initialEdges: Edge[] = [];

const loadingSkeletonNodes: Node[] = [
  {
    id: 'skeleton-center',
    type: 'service',
    position: {
      x: 250,
      y: 150,
    },
    data: {
      title: 'Loading...',
      description: 'Loading...',
      source: 'Loading',
      timeAgo: 'Loading...',
      isSkeleton: true,
      isEmptyState: false,
    },
    draggable: false,
  },
];

const emptyStateNodes: Node[] = [
  {
    id: 'empty-state-node',
    type: 'service',
    position: {
      x: 250,
      y: 150,
    },
    data: {
      title: 'Add a Service',
      description: 'Click here to create your first service in this project',
      source: 'or top-right button is fine too.',
      timeAgo: '',
      isSkeleton: true,
      icon: 'plus',
      isEmptyState: true,
    },
    draggable: false,
  },
];

function CursorManager() {
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const rfInstance = useReactFlow();

  const others = useOthersMapped(
    other => ({
      cursor: other.presence.cursor,
      info: other.info,
    }),
    shallow
  );

  const COLORS = [
    '#E57373',
    '#9575CD',
    '#4FC3F7',
    '#81C784',
    '#FFF176',
    '#FF8A65',
    '#F06292',
    '#7986CB',
  ];

  return (
    <>
      {others.map(([id, other]) => {
        if (other.cursor == null) {
          return null;
        }

        return (
          <Cursor
            variant="name"
            name={other.info.name}
            key={id}
            color={[COLORS[id % COLORS.length], COLORS[(id + 1) % COLORS.length]]}
            x={other.cursor.x}
            y={other.cursor.y}
          />
        );
      })}
    </>
  );
}

function Flow() {
  const params = useParams();
  const projectSlug = typeof params.slug === 'string' ? params.slug : '';

  const { data, loading: servicesLoading, refetch: refetchServices } = useAllServices(projectSlug);
  const nodesStorage = useStorage(root => root.nodes);
  const [isStorageLoading, setIsStorageLoading] = useState(true);
  const [isFirestoreLoading, setIsFirestoreLoading] = useState(true);
  const [firestorePositions, setFirestorePositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [stickyNotes, setStickyNotes] = useState<Node[]>([]);
  const [deletedStickyNotes, setDeletedStickyNotes] = useState<Set<string>>(new Set());
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });

  const updateNodePositionInMemory = useMutation(
    ({ storage }, nodeId: string, position: { x: number; y: number }) => {
      if (!isStorageReady) {
        console.warn('Storage not ready yet');
        return;
      }

      try {
        if (!storage) {
          console.warn('Storage not loaded yet');
          return;
        }

        const nodes = storage.get('nodes');
        if (!nodes) {
          console.warn('Nodes not initialized in storage');
          return;
        }

        const nodeIndex = nodes.findIndex(node => node.id === nodeId);
        if (nodeIndex !== -1) {
          nodes.set(nodeIndex, { id: nodeId, position });
        } else {
          nodes.push({ id: nodeId, position });
        }
      } catch (error) {
        console.error('Error in updateNodePositionInMemory:', error);
      }
    },
    [isStorageReady]
  );

  // Save position to Firebase (only called on drag stop)
  const saveNodePositionToFirebase = useCallback(
    async (nodeId: string, position: { x: number; y: number }) => {
      if (!projectSlug || !isStorageReady) return;

      try {
        // Update Liveblocks storage first
        updateNodePositionInMemory(nodeId, position);

        // Save to xyflow collection for service nodes
        const xyflowRef = doc(db, 'xyflow', projectSlug);
        const docSnap = await getDoc(xyflowRef);

        let allNodes: { id: string; position: { x: number; y: number } }[] = [];
        if (docSnap.exists() && docSnap.data().nodes) {
          allNodes = docSnap.data().nodes;
        }

        const nodeIndex = allNodes.findIndex(node => node.id === nodeId);
        if (nodeIndex !== -1) {
          allNodes[nodeIndex] = { id: nodeId, position };
        } else {
          allNodes.push({ id: nodeId, position });
        }

        await setDoc(
          xyflowRef,
          {
            nodes: allNodes,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

        // Also save sticky note position to its own collection if it's a sticky note
        if (nodeId.startsWith('sticky-')) {
          const stickyNoteRef = doc(db, 'sticky-notes', `${projectSlug}-${nodeId}`);
          await setDoc(
            stickyNoteRef,
            {
              position,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        }
      } catch (error) {
        console.error('Error saving node position to Firebase:', error);
      }
    },
    [projectSlug, isStorageReady, updateNodePositionInMemory]
  );

  const [nodes, setNodes, onNodesChangeBase] = useNodesState(emptyNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNodes, setDraggedNodes] = useState<Map<string, { x: number; y: number }>>(
    new Map()
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Node['data'] | null>(null);
  const [hasInitialFitView, setHasInitialFitView] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [dialogInitialScreen, setDialogInitialScreen] = useState<'main' | 'github' | 'database'>(
    'main'
  );

  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = useCallback(() => {
    if (rfInstance) {
      const currentState = {
        nodes: rfInstance.getNodes(),
        edges: rfInstance.getEdges(),
      };

      if (
        historyIndex === -1 ||
        JSON.stringify(currentState) !== JSON.stringify(history[historyIndex])
      ) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(currentState);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  }, [rfInstance, history, historyIndex]);

  useEffect(() => {
    if (nodesStorage !== undefined) {
      setIsStorageLoading(false);
      setIsStorageReady(true);
    }
  }, [nodesStorage]);

  // Listen for sticky note updates and deletions
  useEffect(() => {
    const handleStickyNoteUpdate = (event: CustomEvent) => {
      const { projectSlug: updatedProjectSlug, nodeId, color } = event.detail;

      if (updatedProjectSlug === projectSlug) {
        setStickyNotes(prevStickyNotes =>
          prevStickyNotes.map(node =>
            node.id === nodeId ? { ...node, data: { ...node.data, color } } : node
          )
        );
      }
    };

    const handleStickyNoteDelete = (event: CustomEvent) => {
      const { projectSlug: updatedProjectSlug, nodeId } = event.detail;

      if (updatedProjectSlug === projectSlug) {
        console.log('Handling sticky note delete for:', nodeId);

        // Add to deleted set to prevent re-adding
        setDeletedStickyNotes(prev => new Set([...prev, nodeId]));

        setStickyNotes(prevStickyNotes => {
          const filtered = prevStickyNotes.filter(node => node.id !== nodeId);
          console.log('StickyNotes after filter:', filtered.length);
          return filtered;
        });

        // Also remove from main nodes state
        setNodes(prevNodes => {
          const filtered = prevNodes.filter(node => node.id !== nodeId);
          console.log('Nodes after filter:', filtered.length);
          return filtered;
        });
      }
    };

    window.addEventListener('stickyNoteUpdated', handleStickyNoteUpdate as EventListener);
    window.addEventListener('stickyNoteDeleted', handleStickyNoteDelete as EventListener);

    return () => {
      window.removeEventListener('stickyNoteUpdated', handleStickyNoteUpdate as EventListener);
      window.removeEventListener('stickyNoteDeleted', handleStickyNoteDelete as EventListener);
    };
  }, [projectSlug, setNodes]);

  useEffect(() => {
    if (!projectSlug) return;

    const loadFirestoreData = async () => {
      try {
        // Load node positions
        const xyflowRef = doc(db, 'xyflow', projectSlug);
        const docSnap = await getDoc(xyflowRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.nodes) {
            const positions: Record<string, { x: number; y: number }> = {};
            data.nodes.forEach((node: { id: string; position: { x: number; y: number } }) => {
              positions[node.id] = node.position;
            });
            setFirestorePositions(positions);
          }
        }

        // Load sticky notes
        const stickyNotesQuery = query(
          collection(db, 'sticky-notes'),
          where('projectSlug', '==', projectSlug)
        );
        const stickyNotesSnapshot = await getDocs(stickyNotesQuery);

        const loadedStickyNotes: Node[] = [];
        stickyNotesSnapshot.forEach(doc => {
          const data = doc.data();
          // Skip if already deleted
          if (!deletedStickyNotes.has(data.nodeId)) {
            loadedStickyNotes.push({
              id: data.nodeId,
              type: 'stickyNote',
              position: data.position || { x: 100, y: 100 },
              data: {
                text: data.text || '',
                color: data.color || 'yellow',
              },
            });
          }
        });

        setStickyNotes(loadedStickyNotes);
      } catch (error) {
        console.error('Error loading Firestore data:', error);
      } finally {
        setIsFirestoreLoading(false);
      }
    };

    loadFirestoreData();
  }, [projectSlug, deletedStickyNotes]);

  useEffect(() => {
    if (servicesLoading || isStorageLoading || isFirestoreLoading) {
      setNodes(loadingSkeletonNodes);
      return;
    }

    // Determine service nodes
    let servicesNodes: Node[] = [];
    if (
      data?.get_all_services?.__typename === 'GetAllServicesSuccessResult' &&
      data.get_all_services.services
    ) {
      const services = data.get_all_services.services;

      if (services.length === 0 && stickyNotes.length === 0) {
        setNodes(emptyStateNodes);
        return;
      }

      const sortedServices = [...services].sort((a, b) => a.name.localeCompare(b.name));

      const centerX = 250;
      const centerY = 150;
      const radius = 200;
      servicesNodes = sortedServices.map((service, index) => {
        const storedPosition = firestorePositions[service.id];
        let position;

        if (storedPosition) {
          position = storedPosition;
        } else {
          const angle = (index / sortedServices.length) * 2 * Math.PI;
          position = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          };
        }

        return {
          id: service.id,
          type: 'service',
          position,
          data: {
            title: service.name,
            description: service.name,
            source: service.type || 'Service',
            timeAgo: service.lastDeploymentDate
              ? new Date(service.lastDeploymentDate).toLocaleDateString()
              : 'Not deployed',
            isSkeleton: false,
          },
        };
      });

      if (Object.keys(firestorePositions).length === 0 && servicesNodes.length > 0) {
        const xyflowRef = doc(db, 'xyflow', projectSlug);
        setDoc(
          xyflowRef,
          {
            nodes: servicesNodes.map(node => ({
              id: node.id,
              position: node.position,
            })),
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    }

    // Filter out deleted sticky notes
    const activeStickyNotes = stickyNotes.filter(note => !deletedStickyNotes.has(note.id));

    // Always combine service nodes with active sticky notes
    const allNodes = [...servicesNodes, ...activeStickyNotes];

    // If we have sticky notes but no services, show them
    if (servicesNodes.length === 0 && activeStickyNotes.length > 0) {
      setNodes(activeStickyNotes);
    } else {
      setNodes(allNodes);
    }
  }, [
    data,
    servicesLoading,
    isStorageLoading,
    isFirestoreLoading,
    setNodes,
    projectSlug,
    firestorePositions,
    stickyNotes,
    deletedStickyNotes,
  ]);

  useEffect(() => {
    if (!nodesStorage || servicesLoading || isStorageLoading || isFirestoreLoading) return;

    setNodes(prevNodes => {
      return prevNodes.map(node => {
        const storedNode = nodesStorage.find(n => n.id === node.id);
        if (storedNode) {
          return {
            ...node,
            position: storedNode.position,
          };
        }
        return node;
      });
    });
  }, [nodesStorage, servicesLoading, isStorageLoading, isFirestoreLoading]);

  const handleNodesChange = useCallback(
    (changes: any) => {
      if (servicesLoading || isStorageLoading || isFirestoreLoading || !isStorageReady) {
        setNodes(loadingSkeletonNodes);
        return;
      }

      try {
        changes.forEach((change: any) => {
          if (change.type === 'position') {
            if (isDragging) {
              // Only update in memory during drag (for live collaboration)
              updateNodePositionInMemory(change.id, change.position);
              // Track dragged nodes to save later
              setDraggedNodes(prev => new Map(prev.set(change.id, change.position)));
            }
          }
        });
        onNodesChangeBase(changes);
        if (!isDragging) {
          saveToHistory();
        }
      } catch (error) {
        console.error('Error in handleNodesChange:', error);
        setNodes(loadingSkeletonNodes);
      }
    },
    [
      onNodesChangeBase,
      isDragging,
      saveToHistory,
      updateNodePositionInMemory,
      servicesLoading,
      isStorageLoading,
      isFirestoreLoading,
      setNodes,
      isStorageReady,
    ]
  );

  const handleUndo = useCallback(() => {
    if (historyIndex > 0 && history.length > 1) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const handleZoomIn = async () => {
    if (rfInstance) {
      await rfInstance.zoomIn({ duration: 300 });
    }
  };

  const handleZoomOut = async () => {
    if (rfInstance) {
      await rfInstance.zoomOut({ duration: 300 });
    }
  };

  const handleFitView = async () => {
    if (rfInstance) {
      if (selectedService) {
        const selectedNode = nodes.find(node => node.id === selectedService.id);
        if (selectedNode) {
          const nodePosition = selectedNode.position;
          const remainingWidth = window.innerWidth / 3;
          const centerX = remainingWidth / 2 - 40;

          await rfInstance.setViewport(
            {
              x: centerX - nodePosition.x,
              y: window.innerHeight / 2 - nodePosition.y,
              zoom: 0.9,
            },
            { duration: 800 }
          );
          return;
        }
      }

      await rfInstance.fitView({
        duration: 300,
        padding: 0.2,
        minZoom: 0.3,
        maxZoom: 1,
      });
    }
  };

  const onConnect = useCallback(
    (params: any) => {
      saveToHistory();
      setEdges(eds => addEdge(params, eds));
    },
    [setEdges, saveToHistory]
  );

  const onInit = useCallback(async (instance: ReactFlowInstance) => {
    setRfInstance(instance);
    setHistory([
      {
        nodes: instance.getNodes(),
        edges: instance.getEdges(),
      },
    ]);
    setHistoryIndex(0);
    await instance.setViewport({ x: 0, y: 0, zoom: 1 });
    await instance.fitView({ duration: 0, padding: 0.2, minZoom: 1, maxZoom: 1 });
  }, []);

  useEffect(() => {
    if (
      !hasInitialFitView &&
      !servicesLoading &&
      !isStorageLoading &&
      !isFirestoreLoading &&
      isStorageReady &&
      rfInstance &&
      nodes.length > 0 &&
      !nodes.some(node => node.data.isSkeleton)
    ) {
      setHasInitialFitView(true);

      setTimeout(() => {
        rfInstance.fitView({
          duration: 500,
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1,
        });
      }, 500);
    }
  }, [
    servicesLoading,
    isStorageLoading,
    isFirestoreLoading,
    isStorageReady,
    rfInstance,
    nodes,
    hasInitialFitView,
  ]);

  const onMove = useCallback((event: any) => {
    if (event && event.viewport) {
      setViewport(event.viewport);
    }
  }, []);

  const handleAddNode = useCallback(
    (newNode: Node) => {
      setNodes(prevNodes => {
        if (prevNodes.length === 1 && prevNodes[0].id === 'empty-state-node') {
          return [newNode];
        }
        return [...prevNodes, newNode];
      });

      // If it's a sticky note, also update the stickyNotes state
      if (newNode.type === 'stickyNote') {
        setStickyNotes(prevStickyNotes => [...prevStickyNotes, newNode]);
      }

      saveToHistory();
    },
    [setNodes, saveToHistory]
  );

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (node.data.isEmptyState && !servicesLoading) {
        setIsDialogOpen(true);
        return;
      }

      // Don't open detail panel for sticky notes
      if (node.type === 'stickyNote') {
        return;
      }

      if (!node.data.isSkeleton || node.data.isEmptyState) {
        setSelectedService({
          id: node.id,
          title: node.data.title,
          description: node.data.description,
          source: node.data.source,
          timeAgo: node.data.timeAgo,
          icon: node.data.icon,
        });

        if (rfInstance) {
          const nodePosition = node.position;
          const remainingWidth = window.innerWidth / 3;
          const centerX = remainingWidth / 2 - 40;

          rfInstance.setViewport(
            {
              x: centerX - nodePosition.x,
              y: window.innerHeight / 2 - nodePosition.y,
              zoom: 0.9,
            },
            { duration: 800 }
          );
        }
      }
    },
    [servicesLoading, rfInstance]
  );

  const handleCloseServicePanel = useCallback(() => {
    setSelectedService(null);

    if (rfInstance) {
      setTimeout(() => {
        rfInstance.fitView({
          duration: 800,
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1,
        });
      }, 100);
    }
  }, [rfInstance]);

  const handleServiceDeleted = useCallback(() => {
    // Close the service panel
    handleCloseServicePanel();

    // Refetch all services to update the list
    refetchServices();
  }, [handleCloseServicePanel, refetchServices]);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();

    const bounds = flowRef.current?.getBoundingClientRect();
    if (!bounds) return;

    setContextMenuPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const handlePaneClick = useCallback(() => {
    // Close context menu when clicking on empty space
    if (contextMenuPosition) {
      setContextMenuPosition(null);
    }
  }, [contextMenuPosition]);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenuPosition(null);
  }, []);

  const handleAddGithubService = useCallback(() => {
    setDialogInitialScreen('github');
    setIsDialogOpen(true);
  }, []);

  const handleAddDatabaseService = useCallback(() => {
    setDialogInitialScreen('database');
    setIsDialogOpen(true);
  }, []);

  const reloadStickyNotes = useCallback(async () => {
    if (!projectSlug) return;

    try {
      const stickyNotesQuery = query(
        collection(db, 'sticky-notes'),
        where('projectSlug', '==', projectSlug)
      );
      const stickyNotesSnapshot = await getDocs(stickyNotesQuery);

      const loadedStickyNotes: Node[] = [];
      stickyNotesSnapshot.forEach(doc => {
        const data = doc.data();
        loadedStickyNotes.push({
          id: data.nodeId,
          type: 'stickyNote',
          position: data.position || { x: 100, y: 100 },
          data: {
            text: data.text || '',
            color: data.color || 'yellow',
          },
        });
      });

      setStickyNotes(loadedStickyNotes);
    } catch (error) {
      console.error('Error reloading sticky notes:', error);
    }
  }, [projectSlug]);

  const handleAddStickyNote = useCallback(async () => {
    if (!rfInstance) return;

    const bounds = flowRef.current?.getBoundingClientRect();
    if (!bounds || !contextMenuPosition) return;

    const position = rfInstance.screenToFlowPosition({
      x: contextMenuPosition.x - bounds.left,
      y: contextMenuPosition.y - bounds.top,
    });

    const stickyNoteId = `sticky-${Date.now()}`;
    const newStickyNote: Node = {
      id: stickyNoteId,
      type: 'stickyNote',
      position,
      data: {
        text: '',
        color: 'yellow',
      },
    };

    // Save to Firebase
    try {
      const stickyNoteRef = doc(db, 'sticky-notes', `${projectSlug}-${stickyNoteId}`);
      const stickyNoteData = {
        text: '',
        color: 'yellow',
        position,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        projectSlug,
        nodeId: stickyNoteId,
      };

      await setDoc(stickyNoteRef, stickyNoteData);
    } catch (error) {
      console.error('Error creating sticky note:', error);
    }

    handleAddNode(newStickyNote);
    handleCloseContextMenu();
  }, [rfInstance, contextMenuPosition, handleAddNode, handleCloseContextMenu, projectSlug]);

  const [{ cursor }, updateMyPresence] = useMyPresence();

  return (
    <ArchitectureProvider onAddNode={handleAddNode}>
      <div
        className="h-full w-full relative overflow-hidden"
        onPointerLeave={() =>
          updateMyPresence({
            cursor: null,
          })
        }
        onPointerMove={event => {
          if (!rfInstance) return;

          const bounds = flowRef.current?.getBoundingClientRect();
          if (!bounds) return;

          const x = event.clientX - bounds.left;
          const y = event.clientY - bounds.top;

          const position = rfInstance.screenToFlowPosition({
            x,
            y,
          });

          updateMyPresence({
            cursor: {
              x: Math.round(position.x),
              y: Math.round(position.y),
            },
          });
        }}
        ref={flowRef}
      >
        <CursorManager />
        <ServiceDetailPanel
          service={selectedService}
          onClose={handleCloseServicePanel}
          onServiceDeleted={handleServiceDeleted}
        />
        <ContextMenu
          position={contextMenuPosition}
          onClose={handleCloseContextMenu}
          onAddGithubService={handleAddGithubService}
          onAddDatabaseService={handleAddDatabaseService}
          onAddStickyNote={handleAddStickyNote}
        />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={changes => {
            onEdgesChange(changes);
            saveToHistory();
          }}
          onNodeDragStart={() => {
            setIsDragging(true);
            setDraggedNodes(new Map()); // Clear previous drag data
          }}
          onNodeDragStop={async () => {
            setIsDragging(false);

            // Save all dragged node positions to Firebase
            const promises: Promise<void>[] = [];
            draggedNodes.forEach((position, nodeId) => {
              promises.push(saveNodePositionToFirebase(nodeId, position));
            });

            if (promises.length > 0) {
              try {
                await Promise.all(promises);
                console.log(`Saved ${promises.length} node positions to Firebase`);
              } catch (error) {
                console.error('Error saving node positions:', error);
              }
            }

            // Clear dragged nodes
            setDraggedNodes(new Map());
            saveToHistory();
          }}
          onNodeClick={handleNodeClick}
          onConnect={onConnect}
          onContextMenu={handleContextMenu}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          onInit={onInit}
          onMove={onMove}
          minZoom={0.5}
          maxZoom={1.5}
          className="bg-gray-50 dark:bg-gray-900"
          fitView
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={2}
            color="var(--flow-background-dots)"
          />

          <Panel position="top-right">
            <Button
              variant="outline"
              size="sm"
              className="h-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
            <ServiceDialog
              isOpen={isDialogOpen}
              onOpenChange={open => {
                setIsDialogOpen(open);
                if (!open) {
                  setDialogInitialScreen('main');
                }
              }}
              initialScreen={dialogInitialScreen}
            />
          </Panel>

          <Panel position="top-left" className="flex flex-col gap-2">
            <Card className="p-1 flex flex-col gap-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={handleZoomIn}
                title="Zoom In"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={handleZoomOut}
                title="Zoom Out"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={handleFitView}
                title="Fit View"
              >
                <ExpandIcon size={16} />
              </Button>
            </Card>
            <Card className="p-1 flex flex-col gap-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={handleUndo}
                title="Redo"
              >
                <UndoIcon size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={handleRedo}
                title="Undo"
              >
                <RedoIcon size={16} />
              </Button>
            </Card>
          </Panel>

          <Panel position="bottom-left" style={{ marginBottom: 0 }}>
            <div className="h-10 w-70 rounded-t-md border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex cursor-pointer items-center justify-between border-b px-4 py-1">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={16} />
                  <h3 className="font-medium">Set up your project locally</h3>
                </div>
              </div>
            </div>
          </Panel>

          <Panel position="bottom-right" style={{ marginBottom: 0 }}>
            <MessagePanel />
          </Panel>
        </ReactFlow>
      </div>
    </ArchitectureProvider>
  );
}

type ArchitectureViewProps = {
  projectSlug: string;
};

export default function ArchitectureView({ projectSlug }: ArchitectureViewProps) {
  return (
    <LiveblocksProvider
      authEndpoint={async room => {
        const response = await axiosClient.post(ENDPOINT.LIVEBLOCKS_AUTHENTICATE, {
          projectSlug,
        });

        return response.data;
      }}
    >
      <RoomProvider
        id={`project:${projectSlug}`}
        initialPresence={{ cursor: null }}
        initialStorage={{ nodes: new LiveList([]) }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <ReactFlowProvider>
            <Flow />
          </ReactFlowProvider>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
