import React, { useState } from 'react';
import { ZapIcon, PlusIcon, GlobeIcon, CheckIcon, SaveIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export const NetworkingSection: React.FC = () => {
  const [port, setPort] = useState('3000');
  const [savedPort, setSavedPort] = useState('3000');
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePort = () => {
    setIsSaving(true);
    // Giả lập API call
    setTimeout(() => {
      setSavedPort(port);
      setIsSaving(false);
      // Sau này sẽ tích hợp API call ở đây
    }, 500);
  };

  const hasChanges = port !== savedPort;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground dark:text-white mb-2">
          Public Networking
        </h2>
        <p className="text-xs text-muted-foreground dark:text-gray-400 mb-2">
          Access to this service publicly through HTTP or TCP
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="ghost" className="border border-border dark:border-gray-700">
            <ZapIcon className="h-3 w-3 mr-1.5" /> Generate Domain
          </Button>
          <Button size="sm" variant="ghost" className="border border-border dark:border-gray-700">
            <PlusIcon className="h-3 w-3 mr-1.5" /> Custom Domain
          </Button>
          <Button size="sm" variant="ghost" className="border border-border dark:border-gray-700">
            <PlusIcon className="h-3 w-3 mr-1.5" /> TCP Proxy
          </Button>
        </div>
      </div>

      <div className="border-t border-border dark:border-gray-700 pt-5">
        <h2 className="text-lg font-semibold text-foreground dark:text-white mb-2">
          Port Settings
        </h2>
        <p className="text-xs text-muted-foreground dark:text-gray-400 mb-4">
          Configure the port for your service
        </p>

        <div className="bg-muted/50 dark:bg-gray-800/50 p-4 rounded-md">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="port" className="text-xs font-medium">
                Service Port
              </Label>
              <div className="flex items-center gap-3">
                <div className="flex-1 max-w-xs">
                  <Input
                    id="port"
                    type="text"
                    value={port}
                    onChange={e => setPort(e.target.value)}
                    className="h-9"
                    placeholder="3000"
                  />
                </div>
                <Button onClick={handleSavePort} disabled={!hasChanges || isSaving} size="sm">
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <SaveIcon className="h-3.5 w-3.5 mr-1.5" /> Save
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {savedPort === port ? (
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <CheckIcon className="h-3 w-3 mr-1 inline" /> Currently using port {savedPort}
                  </span>
                ) : (
                  <span>Changes will be applied after saving</span>
                )}
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-3 mt-2">
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                <GlobeIcon className="h-3 w-3 mr-1.5 flex-shrink-0" />
                Changing ports may affect your service's connectivity. Make sure to update any
                related configurations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
