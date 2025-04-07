import React, { createContext, useContext, useCallback } from 'react';
import { type Node } from '@xyflow/react';

interface ArchitectureContextType {
  addServiceNode: (serviceData: ServiceData) => void;
}

export interface ServiceData {
  name: string;
  fullName: string;
  source: string;
  timeAgo?: string;
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
    (serviceData: ServiceData) => {
      // Tạo ID ngẫu nhiên cho node mới
      const nodeId = `service-${Date.now()}`;

      // Tạo một node mới với vị trí ngẫu nhiên trong khoảng hợp lý
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
