'use client';

import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Avatar({ className = '' }) {
  return (
    <UIAvatar className={`w-8 h-8 ${className}`}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </UIAvatar>
  );
}
