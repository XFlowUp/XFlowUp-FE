'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function CallBack() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.get('access_token')) {
      if (window) {
        window.localStorage.setItem('access_token', params.get('access_token') as string);
      }
      router.push('/dashboard');
    }
  }, [params]);

  return (
    <div>
      <p>Redirecting</p>
    </div>
  );
}
