'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/auth';
import { useUserInfo } from '../api/queries/useUserInfo';
import { useRouter } from 'next/navigation';
import { LoadingPageWithDots } from '@/components/ui/loading-spinner';

export default function ProtectedRoute({ children }: React.PropsWithChildren<{}>) {
  const { loading: isLoading, data, error } = useUserInfo();
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data) {
      setUser(data?.user_info);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (!isLoading && error) {
      router.push('/auth/login');
    }
  }, [isLoading, error]);

  if (isLoading) {
    return <LoadingPageWithDots />;
  }

  return <>{children}</>;
}
