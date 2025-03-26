'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function CallBackContent() {
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

export default function CallBack() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallBackContent />
    </Suspense>
  );
}
