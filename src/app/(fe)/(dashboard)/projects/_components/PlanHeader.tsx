'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { useBalance } from '@/shared/api/queries/useUserInfo';
import { TopUpDialog } from '@/components/ui/top-up-dialog';
import { useAuthStore } from '@/shared/stores/auth';

export default function PlanHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: balanceData, loading: balanceLoading } = useBalance();

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

  // Lấy màu sắc tương ứng cho từng loại plan
  const getPlanColorClasses = () => {
    const planName = getPlanName();

    switch (planName) {
      case 'Trial':
        return {
          badge:
            'bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 border-green-200 dark:border-green-800',
          card: 'bg-green-50 dark:bg-green-950/50',
          text: 'text-green-600 dark:text-green-400',
          button:
            'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50',
          topUpColors: {
            bgColor: 'bg-green-50 dark:bg-green-950/30',
            borderColor: 'border-green-200 dark:border-green-800',
            textColor: 'text-green-700 dark:text-green-300',
            buttonBg: 'bg-green-600',
            buttonHoverBg: 'hover:bg-green-700',
            linkColor: 'text-green-600 dark:text-green-400',
          },
          topUpButton: 'bg-green-500 hover:bg-green-600 text-white',
        };
      case 'Free':
        return {
          badge:
            'bg-gray-50 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800',
          card: 'bg-gray-50 dark:bg-gray-950/50',
          text: 'text-gray-600 dark:text-gray-400',
          button:
            'border-gray-500 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-950/50',
          topUpColors: {
            bgColor: 'bg-gray-50 dark:bg-gray-950/30',
            borderColor: 'border-gray-200 dark:border-gray-800',
            textColor: 'text-gray-700 dark:text-gray-300',
            buttonBg: 'bg-gray-600',
            buttonHoverBg: 'hover:bg-gray-700',
            linkColor: 'text-gray-600 dark:text-gray-400',
          },
          topUpButton: 'bg-gray-500 hover:bg-gray-600 text-white',
        };
      case 'Hobby':
        return {
          badge:
            'bg-violet-50 dark:bg-violet-900/30 text-violet-500 dark:text-violet-400 border-violet-200 dark:border-violet-800',
          card: 'bg-violet-50 dark:bg-violet-950/50',
          text: 'text-violet-600 dark:text-violet-400',
          button:
            'border-violet-500 dark:border-violet-400 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50',
          topUpColors: {
            bgColor: 'bg-violet-50 dark:bg-violet-950/30',
            borderColor: 'border-violet-200 dark:border-violet-800',
            textColor: 'text-violet-700 dark:text-violet-300',
            buttonBg: 'bg-violet-600',
            buttonHoverBg: 'hover:bg-violet-700',
            linkColor: 'text-violet-600 dark:text-violet-400',
          },
          topUpButton: 'bg-violet-500 hover:bg-violet-600 text-white',
        };
      case 'Pro':
        return {
          badge:
            'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 border-blue-200 dark:border-blue-800',
          card: 'bg-blue-50 dark:bg-blue-950/50',
          text: 'text-blue-600 dark:text-blue-400',
          button:
            'border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50',
          topUpColors: {
            bgColor: 'bg-blue-50 dark:bg-blue-950/30',
            borderColor: 'border-blue-200 dark:border-blue-800',
            textColor: 'text-blue-700 dark:text-blue-300',
            buttonBg: 'bg-blue-600',
            buttonHoverBg: 'hover:bg-blue-700',
            linkColor: 'text-blue-600 dark:text-blue-400',
          },
          topUpButton: 'bg-blue-500 hover:bg-blue-600 text-white',
        };
      default:
        return {
          badge:
            'bg-gray-50 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800',
          card: 'bg-gray-50 dark:bg-gray-950/50',
          text: 'text-gray-600 dark:text-gray-400',
          button:
            'border-gray-500 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-950/50',
          topUpColors: {
            bgColor: 'bg-gray-50 dark:bg-gray-950/30',
            borderColor: 'border-gray-200 dark:border-gray-800',
            textColor: 'text-gray-700 dark:text-gray-300',
            buttonBg: 'bg-gray-600',
            buttonHoverBg: 'hover:bg-gray-700',
            linkColor: 'text-gray-600 dark:text-gray-400',
          },
          topUpButton: 'bg-gray-500 hover:bg-gray-600 text-white',
        };
    }
  };

  const planColors = getPlanColorClasses();
  const planName = getPlanName();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleUpgrade = () => {
    setIsOpen(false);
    router.push('/upgrade');
  };

  const handleTopUp = (amount: number) => {
    console.log('Top up amount:', amount);
    // API integration will be added later
  };

  return (
    <div className="text-white">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Badge
            variant="outline"
            className={`${planColors.badge} px-3 py-1.5 flex justify-center items-center gap-3 cursor-pointer`}
            onClick={toggleDropdown}
          >
            <span className="font-medium">{planName.toUpperCase()}</span>
            <span className="opacity-50">|</span>
            <span>{balanceLoading ? 'Loading' : `$ ${balance || '0.00'}`}</span>
          </Badge>
          {isOpen && (
            <Card className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[300px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-50">
              <div className="p-4">
                <h3 className="text-gray-900 dark:text-white text-center text-lg font-medium mb-4">
                  {planName} Plan
                </h3>

                <div className={`${planColors.card} rounded-md p-4 mb-4`}>
                  <p className={`${planColors.text} text-center text-2xl font-medium`}>
                    {balanceLoading ? 'Loading' : `$ ${balance || '0.00'}`}
                  </p>
                  <p className={`${planColors.text} text-center text-sm`}>
                    {planName === 'Trial' ? 'Free Credits Remaining' : 'Balance Remaining'}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  The <span className="font-medium">{planName} plan</span> includes
                  {planName === 'Trial'
                    ? ' $5 FREE to deploy code and databases on the platform. All deployments will be paused when free usage is maxed out.'
                    : planName === 'Free'
                      ? ' basic functionality with limited resources.'
                      : planName === 'Hobby'
                        ? ' enhanced resources for personal projects.'
                        : ' premium resources and priority support for professional use.'}
                </p>

                <Button
                  className={`w-full bg-transparent border ${planColors.button} mb-2`}
                  onClick={handleUpgrade}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Upgrade Plan
                </Button>

                <TopUpDialog onTopUp={handleTopUp} colorScheme={planColors.topUpColors}>
                  <Button className={`w-full mb-2 ${planColors.topUpButton}`}>
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
                    Top Up Balance
                  </Button>
                </TopUpDialog>

                <Button className="w-full mb-2" onClick={() => router.push('/upgrade?plan=hobby')}>
                  View Upgrade Options
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
