import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DialogLogin() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-h-[428px] w-[380px]">
        <div className="flex flex-col space-y-4 items-center justify-center flex-1">
          <Avatar className={`w-16 h-16`}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 items-center justify-center">
            <DialogTitle>Welcome to XFlowUp</DialogTitle>
            <p className="text-base text-gray-500">Instant deployments, effortless scale</p>
          </div>
        </div>
        <Button className="mb-8 px-8">
          <FaGithub className="scale-125 mr-2" /> Continue with GitHub
        </Button>
      </DialogContent>
    </Dialog>
  );
}
