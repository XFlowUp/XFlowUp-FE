'use client';
import { memo } from 'react';
import ThemeLogo from '@/components/theme-logo';
import { UserDropdown } from '@/components/user-nav';
import { useRouter } from 'next/navigation';

export const PlanHeader = memo(() => {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center py-4">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => router.push('/dashboard')}
      >
        <ThemeLogo
          darkLogo="/white-rocket-logo.png"
          lightLogo="/black-rocket-logo.png"
          name="XFlowUp"
          className="h-8 w-8"
        />
        <span className="font-bold inline-block">XFlowUp</span>
      </div>
      <div className="flex flex-row justify-between items-center">
        <a
          href="#"
          className="font-semibold mr-8 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-sm focus:outline-none focus-visible:ring-2"
        >
          Help
        </a>
        <a
          href="/dashboard"
          className="font-semibold mr-8 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-sm focus:outline-none focus-visible:ring-2"
        >
          Dashboard
        </a>
        <UserDropdown />
      </div>
    </header>
  );
});

PlanHeader.displayName = 'PlanHeader';
