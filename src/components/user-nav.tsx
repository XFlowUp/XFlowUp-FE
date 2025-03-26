'use client';

import { ReactNode } from 'react';
import { IoMdPower } from '@react-icons/all-files/io/IoMdPower';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from './avatar-component';
import { SettingsGearIcon } from '@/components/ui/settings-gear';
import { UserIcon } from '@/components/ui/user';
import { BookTextIcon } from '@/components/ui/book-text';
import { MessageSquareIcon } from '@/components/ui/message-square';
import { SunIcon } from '@/components/ui/sun';
import { MoonIcon } from '@/components/ui/moon';
import { useAuthStore } from '@/shared/stores/auth';
import useAuth from '@/shared/hooks/useAuth';
export function ItemComponent({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div>
      <DropdownMenuItem className="px-3 py-2 mt-1 group">
        {icon}
        <span className="ml-1 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 group-hover:dark:text-white">
          {title}
        </span>
      </DropdownMenuItem>
    </div>
  );
}

export function LogoutButton() {
  const { logout } = useAuth();
  return (
    <div>
      <DropdownMenuItem
        className="px-3 py-2 mt-1 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-100 disabled:bg-transparent disabled:border-transparent focus-visible:ring-red-600 focus-visible:bg-red-100 h-[34px] group"
        onClick={logout}
      >
        <span className="ml-1 group-hover:text-red-600 dark:group-hover:text-red-300">Logout</span>
        <IoMdPower className="ml-1 group-hover:text-red-600 dark:group-hover:text-red-300" />
      </DropdownMenuItem>
    </div>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <DropdownMenuItem
        className="px-3 py-2 mt-1 cursor-pointer group"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <SunIcon className="p-0" /> : <MoonIcon className="p-0" />}
        <span className="ml-1 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 group-hover:dark:text-white">
          {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
        </span>
      </DropdownMenuItem>
    </div>
  );
}

export function UserDropdown() {
  const { user } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Avatar />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-70" align="end" sideOffset={5}>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-3 items-center justify-center relative bg-gray-100 dark:bg-gray-800 pt-7 pb-5 mb-2 rounded-md">
            <div className="flex flex-col absolute py-1 px-3 rounded border top-0 left-0 mt-2 ml-2 bg-green-50 text-green-500 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              <p className="uppercase text-[10px] font-medium text-green-500 dark:text-green-400">
                Trial
              </p>
            </div>
            <Avatar className="w-12 h-12 mt-3" />
            <div className="flex flex-col items-center justify-center mt-3">
              <p className="text-sm font-medium">{user?.name}</p>
            </div>
          </div>
        </div>
        <DropdownMenuGroup>
          <ItemComponent icon={<UserIcon className="p-0" />} title="Account Settings" />
          <ItemComponent icon={<SettingsGearIcon className="p-0" />} title="Project Settings" />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ItemComponent icon={<BookTextIcon className="p-0" />} title="Documentation" />
          <ItemComponent icon={<MessageSquareIcon className="p-0" />} title="Support" />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex justify-between items-center mb-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
