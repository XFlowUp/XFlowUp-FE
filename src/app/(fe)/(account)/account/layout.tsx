import ProtectedRoute from '@/shared/providers/ProtectedRoute';
import React from 'react';
import { Toaster } from 'sonner';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      {children}
      <Toaster />
    </ProtectedRoute>
  );
}
