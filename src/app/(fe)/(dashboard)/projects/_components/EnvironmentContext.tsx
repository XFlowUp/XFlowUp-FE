'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useEnvironments from '@/shared/api/queries/useEnvironments';

interface EnvironmentContextType {
  selectedEnvironmentId: string;
  selectedEnvironmentName: string;
  setSelectedEnvironmentId: (id: string) => void;
  environments: Array<{ id: string; name: string }>;
  loading: boolean;
  error?: any;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export function EnvironmentProvider({
  children,
  projectSlug,
}: {
  children: ReactNode;
  projectSlug: string;
}) {
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState<string>('');
  const [selectedEnvironmentName, setSelectedEnvironmentName] = useState<string>('');
  const { data, loading, error: networkError } = useEnvironments(projectSlug);

  const applicationError =
    data?.environments.__typename === 'GetEnvironmentsError'
      ? { message: data.environments.message }
      : undefined;

  const error = networkError || applicationError;

  const environments =
    data?.environments?.__typename === 'GetEnvironmentsSuccess'
      ? data.environments.environments
      : [];

  useEffect(() => {
    if (environments.length > 0 && !selectedEnvironmentId) {
      setSelectedEnvironmentId(environments[0].id);
      setSelectedEnvironmentName(environments[0].name);
    }
  }, [environments, selectedEnvironmentId]);

  useEffect(() => {
    if (selectedEnvironmentId) {
      const env = environments.find(e => e.id === selectedEnvironmentId);
      if (env) {
        setSelectedEnvironmentName(env.name);
      }
    }
  }, [selectedEnvironmentId, environments]);

  const value = {
    selectedEnvironmentId,
    selectedEnvironmentName,
    setSelectedEnvironmentId,
    environments,
    loading,
    error,
  };

  return <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>;
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
}
