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
  type Viewport,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Minus, ChevronDown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ServiceNode from './ServiceNode';
import { ExpandIcon } from '@/components/ui/expand';
import { UndoIcon } from '@/components/ui/undo';
import { RedoIcon } from '@/components/ui/redo';
import { TerminalIcon } from '@/components/ui/terminal';
import { ActivityIcon } from '@/components/ui/activity';
import CreateServiceButton from '@/app/(fe)/(dashboard)/projects/_components/CreateServiceButton';
import { ArchitectureProvider } from './ArchitectureContext';

const nodeTypes: NodeTypes = {
  service: ServiceNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'service',
    position: { x: 0, y: 0 },
    data: {
      name: 'call-server',
      fullName: 'call-server-production-0e54',
      source: 'GitHub',
      timeAgo: '3 days ago',
    },
  },
  {
    id: '2',
    type: 'service',
    position: { x: 300, y: 0 },
    data: {
      name: 'XFlowUpFE',
      fullName: 'xflowup-production-0e54',
      source: 'GitHub',
      timeAgo: '3 days ago',
    },
  },
];

const initialEdges: Edge[] = [];

const defaultViewport: Viewport = {
  x: 0,
  y: 0,
  zoom: 1,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const activityPanelRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const checkNodeOverlap = useCallback((nodes: Node[]) => {
    const nodeSize = { width: 180, height: 100 };
    const offset = { x: 30, y: 30 };
    const overlapThreshold = 0.85;
    const singleAxisThreshold = 0.95;
    const combinedThreshold = 1.5;

    const updatedNodes = [...nodes];
    let hasChanges = false;

    for (let i = 0; i < updatedNodes.length; i++) {
      for (let j = i + 1; j < updatedNodes.length; j++) {
        const nodeA = updatedNodes[i];
        const nodeB = updatedNodes[j];

        const distanceX = Math.abs(nodeA.position.x - nodeB.position.x);
        const distanceY = Math.abs(nodeA.position.y - nodeB.position.y);

        const overlapX = Math.max(0, nodeSize.width - distanceX) / nodeSize.width;
        const overlapY = Math.max(0, nodeSize.height - distanceY) / nodeSize.height;

        const isSignificantlyOverlapping =
          (overlapX > overlapThreshold && overlapY > overlapThreshold) ||
          overlapX > singleAxisThreshold ||
          overlapY > singleAxisThreshold ||
          overlapX + overlapY > combinedThreshold;

        if (isSignificantlyOverlapping) {
          const nodeToMove = parseInt(nodeA.id) > parseInt(nodeB.id) ? nodeA : nodeB;
          const referenceNode = nodeToMove === nodeA ? nodeB : nodeA;

          nodeToMove.position = {
            x: referenceNode.position.x + offset.x,
            y: referenceNode.position.y + offset.y,
          };

          hasChanges = true;
        }
      }
    }

    if (hasChanges) {
      return updatedNodes;
    }

    return nodes;
  }, []);

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
    await instance.fitView({ duration: 300, padding: 0.2, minZoom: 1, maxZoom: 1 });
  }, []);

  const handleAddNode = useCallback(
    (newNode: Node) => {
      setNodes(prevNodes => [...prevNodes, newNode]);
      saveToHistory();
    },
    [setNodes, saveToHistory]
  );

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

  return (
    <ArchitectureProvider onAddNode={handleAddNode}>
      <div className="h-full w-full relative overflow-hidden" ref={flowRef}>
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

            if (rfInstance) {
              const allNodes = rfInstance.getNodes();
              const adjustedNodes = checkNodeOverlap(allNodes);

              if (adjustedNodes !== allNodes) {
                setNodes(adjustedNodes);
              }
            }

            saveToHistory();
          }}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultViewport={defaultViewport}
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
            <CreateServiceButton />
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

export default function ArchitectureView() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
