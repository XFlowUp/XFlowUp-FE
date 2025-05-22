'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserDropdown } from '@/components/user-nav';
import { SettingsGearIcon } from '@/components/ui/settings-gear';
import { useAuthStore } from '@/shared/stores/auth';
import Projects from './_components/Projects';
import CreateProjectButton from '@/app/(fe)/(dashboard)/dashboard/_components/CreateProjectButton';
import { useState } from 'react';
import ThemeLogo from '@/components/theme-logo';
import { useBalance } from '@/shared/api/queries/useUserInfo';
import { TopUpDialog } from '@/components/ui/top-up-dialog';
import { useRouter } from 'next/navigation';
export default function Dashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [projectRefreshKey, setProjectRefreshKey] = useState(0);
  const { data: balanceData, loading: balanceLoading } = useBalance();

  const handleProjectCreated = () => {
    setProjectRefreshKey(prev => prev + 1);
  };

  const balanceInfo = balanceData?.balance;
  const balance = balanceInfo && 'balance' in balanceInfo ? balanceInfo.balance : null;

  const getPlanName = () => {
    if (user?.is_trial) {
      return 'Trial';
    }

    switch (user?.current_plan_id) {
      case '1':
        return 'Hobby';
      case '2':
        return 'Pro';
      default:
        return 'Free';
    }
  };

  const getPlanColorClasses = () => {
    const planName = getPlanName();

    switch (planName) {
      case 'Trial':
        return {
          badge:
            'bg-green-50 text-green-500 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
          banner: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
          topUpColors: {
            bgColor: 'bg-green-50 dark:bg-green-950/30',
            borderColor: 'border-green-200 dark:border-green-800',
            textColor: 'text-green-700 dark:text-green-300',
            textListColor: 'text-green-600 dark:text-green-400',
            buttonBg: 'bg-green-600',
            buttonHoverBg: 'hover:bg-green-700',
            buttonOutlineBg: 'hover:bg-green-50 dark:hover:bg-green-900/20',
            linkColor: 'text-green-600 dark:text-green-400',
          },
          topUpButton:
            'bg-green-100 text-green-600 hover:text-green-700 border-green-300 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/50',
        };
      case 'Free':
        return {
          badge:
            'bg-gray-50 text-gray-500 border-gray-300 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800',
          banner: 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
          topUpColors: {
            bgColor: 'bg-gray-50 dark:bg-gray-950/30',
            borderColor: 'border-gray-200 dark:border-gray-800',
            textColor: 'text-gray-700 dark:text-gray-300',
            textListColor: 'text-gray-600 dark:text-gray-400',
            buttonBg: 'bg-gray-600',
            buttonHoverBg: 'hover:bg-gray-700',
            buttonOutlineBg: 'hover:bg-gray-50 dark:hover:bg-gray-900/20',
            linkColor: 'text-gray-600 dark:text-gray-400',
          },
          topUpButton:
            'bg-gray-100 text-gray-600 hover:text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-900/50',
        };
      case 'Hobby':
        return {
          badge:
            'bg-blue-50 text-blue-500 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
          banner: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
          topUpColors: {
            bgColor: 'bg-blue-50 dark:bg-blue-950/30',
            borderColor: 'border-blue-200 dark:border-blue-800',
            textColor: 'text-blue-700 dark:text-blue-300',
            textListColor: 'text-blue-600 dark:text-blue-400',
            buttonBg: 'bg-blue-600',
            buttonHoverBg: 'hover:bg-blue-700',
            linkColor: 'text-blue-600 dark:text-blue-400',
            buttonOutlineBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
          },
          topUpButton:
            'bg-blue-100 text-blue-600 hover:text-blue-700 border-blue-300 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/50',
        };
      case 'Pro':
        return {
          badge:
            'bg-violet-50 text-violet-500 border-violet-300 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800',
          banner: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
          topUpColors: {
            bgColor: 'bg-violet-50 dark:bg-violet-950/30',
            borderColor: 'border-violet-200 dark:border-violet-800',
            textColor: 'text-violet-700 dark:text-violet-300',
            textListColor: 'text-violet-600 dark:text-violet-400',
            buttonBg: 'bg-violet-600',
            buttonHoverBg: 'hover:bg-violet-700',
            buttonOutlineBg: 'hover:bg-violet-50 dark:hover:bg-violet-900/20',
            linkColor: 'text-violet-600 dark:text-violet-400',
          },
          topUpButton:
            'bg-violet-100 text-violet-600 hover:text-violet-700 border-violet-300 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800 dark:hover:bg-violet-900/50',
        };
      default:
        return {
          badge:
            'bg-gray-50 text-gray-500 border-gray-300 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800',
          banner: 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
          topUpColors: {
            bgColor: 'bg-gray-50 dark:bg-gray-950/30',
            borderColor: 'border-gray-200 dark:border-gray-800',
            textColor: 'text-gray-700 dark:text-gray-300',
            buttonBg: 'bg-gray-600',
            buttonHoverBg: 'hover:bg-gray-700',
            linkColor: 'text-gray-600 dark:text-gray-400',
          },
          topUpButton:
            'bg-gray-100 text-gray-600 hover:text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-900/50',
        };
    }
  };

  const planColors = getPlanColorClasses();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
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
            <UserDropdown />
          </div>
        </header>

        <div className="flex flex-col w-full pt-12">
          <main className="grid gap-12 max-w-container mx-auto w-full pb-24">
            <div className="grid gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md h-md px-3 space-x-2 focus:outline-none max-w-max border-none w-full py-2 h-auto overflow-hidden -ml-2 sm:-ml-3">
                    <div className="flex space-x-4 items-center w-full overflow-hidden">
                      <div className="flex items-center gap-3">
                        <p className="text-h2 font-medium truncate tracking-[-0.24px]">
                          {user?.name}
                        </p>
                        <p
                          className={`flex items-center rounded px-2 py-1 uppercase text-[11px] font-medium leading-none border ${planColors.badge}`}
                        >
                          <span className="inline-block mt-px">{getPlanName()}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mt-2 sm:mt-0">
                    <div className="flex gap-2 flex-grow justify-end">
                      <Button variant="outline" size="icon">
                        <SettingsGearIcon />
                      </Button>
                      <CreateProjectButton onProjectCreated={handleProjectCreated} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`relative flex p-3 rounded-md items-center ${planColors.banner}`}>
                <div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:items-center lg:justify-between">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-y-2 gap-x-6 justify-between sm:justify-start">
                    <div className="flex space-x-1">
                      <p className="text-sm font-semibold">{getPlanName()}</p>
                      <p className="text-sm opacity-50">|</p>
                      <p className="text-sm">
                        {balanceLoading ? 'Loading' : `$ ${balance || '0.00'}`}
                      </p>
                    </div>
                    <p className="text-sm">512 MB of RAM, 1 GB of Disk, and 2 vCPU</p>
                  </div>
                  <div className="flex gap-2">
                    <TopUpDialog colorScheme={planColors.topUpColors}>
                      <Button variant="outline" className={planColors.topUpButton}>
                        <svg
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6V18M18 12H6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Top Up
                      </Button>
                    </TopUpDialog>
                    <Button
                      className={`${planColors.topUpColors.buttonBg} ${planColors.topUpColors.buttonHoverBg} text-white`}
                      onClick={() => router.push('/account/plan')}
                    >
                      Choose a plan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Projects refetchTrigger={projectRefreshKey} />
          </main>
        </div>
      </div>
    </div>
  );
}
