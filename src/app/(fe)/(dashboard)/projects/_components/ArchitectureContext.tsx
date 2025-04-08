import React, { createContext, useContext, useCallback } from 'react';
import { type Node } from '@xyflow/react';
import { ServiceNodeData } from './ServiceNode';

interface ArchitectureContextType {
  addServiceNode: (serviceData: ServiceNodeData) => void;
}

const ArchitectureContext = createContext<ArchitectureContextType | undefined>(undefined);

export function ArchitectureProvider({
  children,
  onAddNode,
}: {
  children: React.ReactNode;
  onAddNode: (node: Node) => void;
}) {
  const addServiceNode = useCallback(
    (serviceData: ServiceNodeData) => {
      const nodeId = `service-${Date.now()}`;

      const newNode: Node = {
        id: nodeId,
        type: 'service',
        position: {
          x: 100 + Math.random() * 500,
          y: 100 + Math.random() * 300,
        },
        data: {
          ...serviceData,
          timeAgo: serviceData.timeAgo || 'just now',
        },
      };

      onAddNode(newNode);
    },
    [onAddNode]
  );

  const value = {
    addServiceNode,
  };

  return <ArchitectureContext.Provider value={value}>{children}</ArchitectureContext.Provider>;
}

export function useArchitecture() {
  const context = useContext(ArchitectureContext);
  if (context === undefined) {
    throw new Error('useArchitecture must be used within an ArchitectureProvider');
  }
  return context;
}
