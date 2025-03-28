'use client';

import { Flame } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, Suspense } from 'react';
import { LoadingPageWithDots } from '@/components/ui/loading-spinner';
import Link from 'next/link';

function CallBackContent() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.get('access_token')) {
      if (window) {
        window.localStorage.setItem('access_token', params.get('access_token') as string);
      }
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }
  }, [params]);

  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full text-center space-y-4 mt-6">
        <div className="flex justify-center">
          <Flame className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-orange-500 animate-pulse" />
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium">
          You are being redirected to the authorized application.
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base md:whitespace-nowrap">
          If your browser does not redirect you back, please visit{' '}
          <Link
            href="/dashboard"
            className="text-primary underline underline-offset-4 hover:text-primary/90"
          >
            this setup page
          </Link>{' '}
          to continue.
        </p>
      </div>
    </div>
  );
}

export default function CallBack() {
  return (
    <Suspense fallback={<LoadingPageWithDots />}>
      <CallBackContent />
    </Suspense>
  );
}
