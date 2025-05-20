import type React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';

// TimelineItem Component
interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  danger?: boolean;
}

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ icon, title, children, danger = false }, ref) => {
    return (
      <div ref={ref} className="relative pb-10">
        <div className="flex">
          <div className="flex-shrink-0 relative">
            <div
              className={cn(
                'w-[40px] h-[40px] rounded-full flex items-center justify-center relative z-10',
                danger
                  ? 'text-red-500 border border-red-500 bg-white dark:bg-gray-900'
                  : 'text-foreground border dark:text-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'
              )}
            >
              {icon}
            </div>
          </div>
          <div className="ml-5 flex-1">
            <h3
              className={cn(
                'text-xl font-semibold mb-3',
                danger ? 'text-red-500' : 'text-foreground dark:text-white'
              )}
            >
              {title}
            </h3>
            <div className="pb-4">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';
