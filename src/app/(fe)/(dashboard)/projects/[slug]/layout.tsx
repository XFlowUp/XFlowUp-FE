import ProtectedRoute from '@/shared/providers/ProtectedRoute';
import React from 'react';
import { Toaster } from 'sonner';
import { EnvironmentProvider } from '../_components/EnvironmentContext';

type PageParams = Promise<{ slug: string }>;
export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: PageParams;
}) {
  const { slug } = await params;
  return (
    <ProtectedRoute>
      <EnvironmentProvider projectSlug={slug}>
        {children}
        <Toaster />
      </EnvironmentProvider>
    </ProtectedRoute>
  );
}
