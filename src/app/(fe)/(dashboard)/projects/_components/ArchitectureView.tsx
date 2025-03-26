'use client';

import { useState, useCallback, useRef } from 'react';
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
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ServiceNode from './ServiceNode';
import { ExpandIcon } from '@/components/ui/expand';
import { UndoIcon } from '@/components/ui/undo';
import { RedoIcon } from '@/components/ui/redo';

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
  const [isDragging, setIsDragging] = useState(false);

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
      await rfInstance.fitView({ duration: 300, padding: 0.2, minZoom: 1, maxZoom: 1 });
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

  return (
    <div className="h-full w-full relative" ref={flowRef}>
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
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        onInit={onInit}
        minZoom={0.5}
        maxZoom={1.5}
        className="bg-gray-50 dark:bg-gray-900"
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
          >
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
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
      </ReactFlow>
    </div>
  );
}

export default function ArchitectureView() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
