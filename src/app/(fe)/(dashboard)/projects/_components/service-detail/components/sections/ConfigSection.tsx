import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export const ConfigSection: React.FC = () => {
  const [aiEnabled, setAiEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground dark:text-white mb-2">
          AI Commit Review
        </h2>
        <p className="text-xs text-muted-foreground dark:text-gray-400 mb-4">
          Automatically analyze and evaluate team code commits using intelligent AI.{' '}
          <a href="#" className="underline hover:text-foreground dark:hover:text-gray-300">
            Learn more ↗
          </a>
        </p>

        <div className="flex items-center justify-between p-3 bg-secondary/20 dark:bg-secondary/10 rounded-md">
          <div className="flex items-center gap-2">
            <span className="font-medium">Enable AI Commit Review</span>
            {aiEnabled && (
              <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 rounded">
                Active
              </span>
            )}
          </div>
          <Switch
            checked={aiEnabled}
            onCheckedChange={setAiEnabled}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>

        {aiEnabled && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-xs text-muted-foreground">
                AI will automatically review each commit pushed to your repository
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
