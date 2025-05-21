'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { useBalance } from '@/shared/api/queries/useUserInfo';

export default function PlanHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: balanceData, loading: balanceLoading } = useBalance();

  const balanceInfo = balanceData?.balance;
  const balance = balanceInfo && 'balance' in balanceInfo ? balanceInfo.balance : null;
  const currency = balanceInfo && 'currency' in balanceInfo ? balanceInfo.currency : 'USD';

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleUpgrade = () => {
    setIsOpen(false);
    router.push('/upgrade');
  };

  return (
    <div className="text-white">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Badge
            variant="outline"
            className="bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 border-green-200 dark:border-green-800 px-3 py-1.5 flex justify-center items-center gap-3 cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="font-medium">TRIAL</span>
            <span className="text-green-300 dark:text-green-700">|</span>
            <span className="text-green-500 dark:text-green-400">
              {balanceLoading ? 'Loading' : `${balance || '0.00'} ${currency}`}
            </span>
          </Badge>
          {isOpen && (
            <Card className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[300px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-50">
              <div className="p-4">
                <h3 className="text-gray-900 dark:text-white text-center text-lg font-medium mb-4">
                  Trial Plan
                </h3>

                <div className="bg-green-50 dark:bg-green-950/50 rounded-md p-4 mb-4">
                  <p className="text-green-600 dark:text-green-400 text-center text-2xl font-medium">
                    {balanceLoading ? 'Loading' : `${balance || '0.00'} ${currency}`}
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-center text-sm">
                    Free Credits Remaining
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  The <span className="font-medium">Trial plan</span> includes $5 FREE to deploy
                  code and databases on the platform. All deployments will be paused when free usage
                  is maxed out.
                </p>

                <Button
                  className="w-full bg-transparent border border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50 mb-2"
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
