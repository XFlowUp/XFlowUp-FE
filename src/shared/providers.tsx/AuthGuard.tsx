'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'next/navigation';
import useUserInfo from '../api/queries/useUserInfo';

type Props = {
  redirect?: boolean;
  children: React.ReactNode;
};
export default function AuthProvider({ children, redirect = false }: Props) {
  const { isLoading: loadingUser } = useUserInfo();
  const router = useRouter();

  return <>{children}</>;
}
