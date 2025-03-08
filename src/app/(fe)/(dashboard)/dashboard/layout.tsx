import AuthGuard from '@/shared/providers.tsx/AuthGuard';
import ProtectedRoute from '@/shared/providers.tsx/ProtectedRoute';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
