import React from 'react';

export const BuildSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground dark:text-white mb-2">
          Build Settings
        </h2>
        <p className="text-xs text-muted-foreground dark:text-gray-400 mb-2">
          Configure how your application is built
        </p>
        <div className="bg-accent/50 dark:bg-gray-800/50 rounded-md p-3">
          <div className="mb-3">
            <label className="block text-sm text-foreground dark:text-gray-300 mb-1">
              Build Command
            </label>
            <div className="border border-border dark:border-gray-700 bg-card/80 dark:bg-gray-900/50 rounded p-1.5 text-xs text-foreground dark:text-gray-300 font-mono">
              npm run build
            </div>
          </div>
          <div>
            <label className="block text-sm text-foreground dark:text-gray-300 mb-1">
              Output Directory
            </label>
            <div className="border border-border dark:border-gray-700 bg-card/80 dark:bg-gray-900/50 rounded p-1.5 text-xs text-foreground dark:text-gray-300 font-mono">
              .next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
