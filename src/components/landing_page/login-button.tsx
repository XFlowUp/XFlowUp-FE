'use client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { Avatar } from '../avatar-component';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const onLogin = React.useCallback(() => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/github`);
  }, [router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-h-[428px] w-[380px]">
        <div className="flex flex-col space-y-4 items-center justify-center flex-1">
          <Avatar className="w-16 h-16" />
          <div className="flex flex-col space-y-1 items-center justify-center">
            <DialogTitle>Welcome to XFlowUp</DialogTitle>
            <p className="text-base text-gray-500">Instant deployments, effortless scale</p>
          </div>
        </div>

        <Button onClick={onLogin} className="mb-8 px-8">
          <FaGithub className="scale-125 mr-2" /> Continue with GitHub
        </Button>
      </DialogContent>
    </Dialog>
  );
}
