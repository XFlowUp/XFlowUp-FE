'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/stores/auth';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { LoadingPageWithDots } from '@/components/ui/loading-spinner';
import { useUserInfo } from '@/shared/api/queries/useUserInfo';
export default function LoginPage() {
  const router = useRouter();
  const { loading: isLoading, data } = useUserInfo();
  const setUser = useAuthStore(state => state.setUser);
  const { resolvedTheme } = useTheme();
  const [showModal, setShowModal] = React.useState(true);
  const isDark = resolvedTheme === 'dark';
  const [redirected, setRedirected] = React.useState(false);

  useEffect(() => {
    if (!showModal) setShowModal(true);
  }, [showModal]);

  useEffect(() => {
    if (!isLoading && data) {
      setUser(data?.user_info);

      if (data.user_info) {
        setRedirected(true);
        router.push('/dashboard');
      }
    }
  }, [isLoading, data, setUser, router]);

  if (isLoading || redirected) {
    return <LoadingPageWithDots />;
  }
  return (
    <div className={`min-h-screen w-full relative ${isDark ? 'bg-gray-900' : 'bg-background'}`}>
      {!isDark && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          style={{ height: '100vh', width: '100vw' }}
        >
          <div
            className="relative rounded-xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <svg
              width="400"
              height="300"
              viewBox="0 0 400 300"
              className={`${isDark ? 'bg-[#111827]' : 'bg-white'} rounded-xl border border-border`}
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
                    onClick={() => {
                      setRedirected(true);
                      router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/github`);
                    }}
                    className="mb-8 px-8"
                  >
                    <FaGithub className="scale-125 mr-2" /> Continue with GitHub
                  </Button>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
