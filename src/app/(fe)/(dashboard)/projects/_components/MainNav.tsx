'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/avatar-component';

export function MainNav() {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Avatar />
      </div>
      <nav className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-1 text-base">
              Web call <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Web call</DropdownMenuItem>
            <DropdownMenuItem>API call</DropdownMenuItem>
            <DropdownMenuItem>Database</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-1 text-base">
              production <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>production</DropdownMenuItem>
            <DropdownMenuItem>staging</DropdownMenuItem>
            <DropdownMenuItem>development</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}
