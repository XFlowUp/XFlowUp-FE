'use client';

import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/shared/stores/auth';

export function Avatar({ className = '' }) {
  const { user } = useAuthStore();
  return (
    <UIAvatar className={`w-8 h-8 ${className}`}>
      <AvatarImage src={user?.profile_pic_url ?? ''} alt={user?.name ?? ''} />
      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
    </UIAvatar>
  );
}
