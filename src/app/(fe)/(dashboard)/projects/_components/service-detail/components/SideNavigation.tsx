import type React from 'react';
import { cn } from '@/shared/lib/utils';

// SideNavigation Component
interface SideNavigationProps {
  sections: {
    id: string;
    label: string;
    ref: React.RefObject<HTMLDivElement | null>;
  }[];
  onSectionClick: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

export function SideNavigation({ sections, onSectionClick }: SideNavigationProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 bg-card/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 border border-border dark:border-gray-700 shadow-lg">
      <ul className="space-y-2">
        {sections.map(section => (
          <li key={section.id}>
            <button
              onClick={() => onSectionClick(section.ref)}
              className={cn(
                'text-sm px-3 py-1.5 rounded-md transition-colors w-full text-left',
                section.id === 'danger'
                  ? 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                  : 'text-foreground hover:bg-accent dark:text-gray-300 dark:hover:bg-gray-700/70 dark:hover:text-white'
              )}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
