'use client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { Avatar } from '../avatar-component';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/stores/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { UserDropdown } from '../user-nav';
import useUserInfo from '@/shared/api/queries/useUserInfo';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function LoginButton() {
  const router = useRouter();
  const { loading: isLoading, data } = useUserInfo();
  const setUser = useAuthStore(state => state.setUser);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useEffect(() => {
    if (!isLoading && data) {
      setUser(data?.user_info);
    }
  }, [isLoading, data]);

  const onLogin = React.useCallback(() => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/github`);
  }, [router]);

  const handleNavigateToDashboard = () => {
    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-[100px]" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }

  if (!isLoading && data && data.user_info) {
    return (
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={handleNavigateToDashboard}>
          Dashboard
        </Button>
        <UserDropdown />
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden w-[400px] border border-border">
        <DialogTitle className="hidden"></DialogTitle>

        <div className="relative">
          <svg
            width="400"
            height="300"
            viewBox="0 0 400 300"
            className={`${isDark ? 'bg-[#111827]' : 'bg-white'} border-t border-border`}
          >
            {[100, 150, 250, 310, 370, 430, 480, 520, 550].map((x, i) => (
              <line
                key={i}
                x1={x + 100}
                y1="-100"
                x2={x}
                y2="0"
                stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(100,100,100,0.3)'}
                strokeWidth="2"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.5s"
                  begin={`${i * 0.4}s`}
                  fill="freeze"
                />
                <animate
                  attributeName="x1"
                  values={`${x + 100};${x - 400}`}
                  dur={`${1.5 + i * 0.3}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="x2"
                  values={`${x};${x - 500}`}
                  dur={`${1.5 + i * 0.3}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y1"
                  values="-100;400"
                  dur={`${1.5 + i * 0.3}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y2"
                  values="0;500"
                  dur={`${1.5 + i * 0.3}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </line>
            ))}
            <foreignObject x="150" y="50" width="100" height="100">
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src={!isDark ? '/roket-dark.gif' : '/rocket-white.gif'}
                  alt="Logo"
                  className="w-[80px] h-[80px] object-contain"
                />
              </div>
            </foreignObject>

            <foreignObject x="75" y="140" width="250" height="60">
              <div className="text-center">
                <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Welcome to XFlowUp
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Instant deployments, effortless scale
                </p>
              </div>
            </foreignObject>
            <foreignObject x="100" y="210" width="200" height="60">
              <div className="flex justify-center">
                <Button
                  onClick={onLogin}
                  className={`${
                    isDark
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-black text-white hover:bg-gray-800'
                  } px-3 py-2 rounded-md w-[140px]`}
                  style={{ fontSize: '0.6rem' }}
                >
                  <FaGithub className="mr-1 text-[0.6rem]" /> Continue with GitHub
                </Button>
              </div>
            </foreignObject>
          </svg>
        </div>
      </DialogContent>
    </Dialog>
  );
}
