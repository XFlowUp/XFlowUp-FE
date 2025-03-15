'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/auth';
import useUserInfo from '../api/queries/useUserInfo';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: React.PropsWithChildren<{}>) {
  const { isLoading, data, isSuccess, isError } = useUserInfo();
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setUser(data?.data);
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (!isLoading && isError) {
      console.log('redirecting');
      router.push('/auth/login');
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
