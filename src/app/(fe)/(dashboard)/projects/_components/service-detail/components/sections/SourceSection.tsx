import React from 'react';
import { GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SourceSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground dark:text-white mb-2">Source Repo</h2>
        <div className="bg-accent/50 dark:bg-gray-800/50 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-foreground dark:text-gray-300" />
            <span className="text-sm text-foreground dark:text-gray-300">
              quanganh208/hotel-management-front-end
            </span>
          </div>
          <Button variant="outline" size="sm">
            Disconnect
          </Button>
        </div>
        <div className="mt-2">
          <a
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-300 underline flex items-center gap-1"
          >
            Add Root Directory{' '}
            <span className="text-xs">(used for build and deploy steps. Docs ↗)</span>
          </a>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground dark:text-white mb-2">
          Branch connected to production
        </h2>
        <p className="text-xs text-muted-foreground dark:text-gray-400 mb-2">
          Changes made to this GitHub branch will be automatically pushed to this environment.
        </p>
        <div className="bg-accent/50 dark:bg-gray-800/50 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-foreground dark:text-gray-300" />
            <span className="text-sm text-foreground dark:text-gray-300">main</span>
          </div>
          <Button variant="outline" size="sm">
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
};
