import ProtectedRoute from '@/shared/providers/ProtectedRoute';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
