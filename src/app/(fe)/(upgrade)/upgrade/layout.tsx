import type React from 'react';
import { Inter } from 'next/font/google';
import ProtectedRoute from '@/shared/providers/ProtectedRoute';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Subscription Platform',
  description: 'Upgrade your resources, remove usage limits, and ship with ease.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      {children}
      <Toaster />
    </ProtectedRoute>
  );
}
