import ProtectedRoute from '@/shared/providers/ProtectedRoute';
import React from 'react';
import { Toaster } from 'sonner';
import { EnvironmentProvider } from '../_components/EnvironmentContext';

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <ProtectedRoute>
      <EnvironmentProvider projectSlug={params.slug}>
        {children}
        <Toaster />
      </EnvironmentProvider>
    </ProtectedRoute>
  );
}
