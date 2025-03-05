"use client";

import React from 'react';
import useAuth from '@/shared/hooks/useAuth';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {isAuthenticated && <p>Email: {user?.email}</p>}
    </div>
  );
}