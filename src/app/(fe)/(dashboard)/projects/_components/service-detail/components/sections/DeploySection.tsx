import React from 'react';

export const DeploySection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground dark:text-white mb-2">
          Deployment Settings
        </h2>
        <p className="text-xs text-muted-foreground dark:text-gray-400 mb-2">
          Configure how your application is deployed
        </p>
        <div className="bg-accent/50 dark:bg-gray-800/50 rounded-md p-3">
          <div className="mb-3">
            <label className="block text-sm text-foreground dark:text-gray-300 mb-1">
              Start Command
            </label>
            <div className="border border-border dark:border-gray-700 bg-card/80 dark:bg-gray-900/50 rounded p-1.5 text-xs text-foreground dark:text-gray-300 font-mono">
              npm start
            </div>
          </div>
          <div className="mb-3">
            <h3 className="text-sm text-foreground dark:text-gray-300 mb-1">On Failure</h3>
            <p className="text-xs text-muted-foreground dark:text-gray-400 mb-1">
              Restart the container if it exits with a non-zero exit code.
            </p>
          </div>
          <div>
            <h3 className="text-sm text-foreground dark:text-gray-300 mb-1">Number of retries</h3>
            <div className="border border-border dark:border-gray-700 bg-card/80 dark:bg-gray-900/50 rounded p-1.5 text-xs text-foreground dark:text-gray-300 font-mono">
              10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
