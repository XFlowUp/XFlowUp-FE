import type React from 'react';

// VerticalTimeline Component
interface VerticalTimelineProps {
  children: React.ReactNode;
}

export function VerticalTimeline({ children }: VerticalTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-[20px] top-0 bottom-0 w-px bg-border dark:bg-gray-700"></div>
      <div className="relative">{children}</div>
    </div>
  );
}
