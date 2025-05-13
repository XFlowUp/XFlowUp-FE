'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Minus, ChevronDown, CheckCircle } from 'lucide-react';
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
import { RoomProvider, useMyPresence, useOthers } from '@liveblocks/react';
import { ClientSideSuspense } from '@liveblocks/react';
import { LiveblocksProvider } from '@liveblocks/react';
import Cursor from './architecture/Cursor';

const nodeTypes: NodeTypes = {
  service: ServiceNode,
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
  const others = useOthers();

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
      {others.map(({ connectionId, presence }) => {
        if (presence.cursor === null) {
          return null;
        }
        return (
          <Cursor
            key={`cursor-${connectionId}`}
            color={COLORS[connectionId % COLORS.length]}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        );
      })}
    </>
  );
}

function Flow() {
  const params = useParams();
  const projectSlug = typeof params.slug === 'string' ? params.slug : '';

  const { data, loading } = useAllServices(projectSlug);

  const [nodes, setNodes, onNodesChange] = useNodesState(emptyNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const activityPanelRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Node['data'] | null>(null);

  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (loading) {
      setNodes(loadingSkeletonNodes);
      return;
    }

    if (
      data?.get_all_services?.__typename === 'GetAllServicesSuccessResult' &&
      data.get_all_services.services
    ) {
      const services = data.get_all_services.services;

      if (services.length === 0) {
        setNodes(emptyStateNodes);
        return;
      }

      const sortedServices = [...services].sort((a, b) => a.name.localeCompare(b.name));

      const centerX = 250;
      const centerY = 150;
      const radius = 200;
      const servicesNodes: Node[] = sortedServices.map((service, index) => {
        const angle = (index / sortedServices.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        return {
          id: service.id,
          type: 'service',
          position: { x, y },
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

      setNodes(servicesNodes);
    }
  }, [data, loading, setNodes]);

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

  const handleAddNode = useCallback(
    (newNode: Node) => {
      setNodes(prevNodes => {
        if (prevNodes.length === 1 && prevNodes[0].id === 'empty-state-node') {
          return [newNode];
        }
        return [...prevNodes, newNode];
      });
      saveToHistory();
    },
    [setNodes, saveToHistory]
  );

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (node.data.isEmptyState && !loading) {
        setIsDialogOpen(true);
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
    [loading, rfInstance]
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

  useEffect(() => {
    const updateMaxHeight = () => {
      if (activityPanelRef.current) {
        const headerHeight = 64;
        const topGap = 80;
        const maxHeight = window.innerHeight - headerHeight - topGap;
        activityPanelRef.current.style.maxHeight = `${maxHeight}px`;
      }
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);
    return () => window.removeEventListener('resize', updateMaxHeight);
  }, []);

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
          updateMyPresence({
            cursor: {
              x: Math.round(event.clientX),
              y: Math.round(event.clientY),
            },
          });
        }}
        ref={flowRef}
      >
        <CursorManager />
        <ServiceDetailPanel service={selectedService} onClose={handleCloseServicePanel} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={changes => {
            onNodesChange(changes);
            if (!isDragging) {
              saveToHistory();
            }
          }}
          onEdgesChange={changes => {
            onEdgesChange(changes);
            saveToHistory();
          }}
          onNodeDragStart={() => setIsDragging(true)}
          onNodeDragStop={() => {
            setIsDragging(false);
            saveToHistory();
          }}
          onNodeClick={handleNodeClick}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={onInit}
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
            <ServiceDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
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
            <div
              ref={activityPanelRef}
              className={`bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-80 border rounded-t-md shadow-lg transition-all duration-300 ease-in-out ${
                showActivity ? 'h-[calc(100vh-144px)]' : 'h-10'
              }`}
              style={{
                zIndex: 10,
                transform: showActivity ? 'translateY(0)' : 'translateY(calc(100% - 40px))',
              }}
            >
              <div
                className="px-4 py-1 border-b flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setShowActivity(!showActivity)}
              >
                <div className="flex items-center gap-2">
                  <ActivityIcon size={16} />
                  <h3 className="font-medium">Activity</h3>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showActivity ? 'rotate-0' : 'rotate-180'}`}
                />
              </div>

              <div className="h-[1px] bg-gray-200 dark:bg-gray-700 w-full"></div>

              <div className="overflow-y-auto h-[calc(100%-41px)]">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 flex items-start gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold line-clamp-2 text-ellipsis text-gray-800 dark:text-gray-200">
                        call-server
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-500">
                        Deployment successful
                      </div>
                      <div className="text-xs text-gray-500">
                        {i < 2 ? `${i + 4} hours ago` : `${i + 1} days ago`}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    Fetch More
                  </Button>
                </div>
              </div>
            </div>
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
        const headers = {
          'Content-Type': 'application/json',
        };

        const body = JSON.stringify({
          projectSlug,
        });

        const response = await fetch('/api/liveblocks-auth', {
          method: 'POST',
          headers,
          body,
        });

        return await response.json();
      }}
    >
      <RoomProvider id={`project:${projectSlug}`} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <ReactFlowProvider>
            <Flow />
          </ReactFlowProvider>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
