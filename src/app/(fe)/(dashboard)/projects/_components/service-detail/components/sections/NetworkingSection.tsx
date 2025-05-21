import React, { useState, useEffect } from 'react';
import { ZapIcon, PlusIcon, GlobeIcon, CheckIcon, SaveIcon, AlertCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

import { useGetServiceSettings } from '@/shared/api/queries/useDetailService';
import { useUpdateServiceSettings } from '@/shared/api/mutations/useDetailServiceMutation';

interface NetworkingSectionProps {
  serviceId: number;
}

const NetworkingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-4 w-full max-w-md mb-2" />
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      <div className="border-t border-border dark:border-gray-700 pt-5">
        <Skeleton className="h-7 w-36 mb-2" />
        <Skeleton className="h-4 w-full max-w-md mb-4" />

        <div className="bg-muted/50 dark:bg-gray-800/50 p-4 rounded-md">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Skeleton className="h-4 w-24" />
              <div className="flex items-center gap-3">
                <div className="flex-1 max-w-xs">
                  <Skeleton className="h-9 w-full" />
                </div>
                <Skeleton className="h-9 w-20" />
              </div>
              <Skeleton className="h-4 w-48 mt-1" />
            </div>

            <Skeleton className="h-16 w-full mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const NetworkingSection: React.FC<NetworkingSectionProps> = ({ serviceId }) => {
  const [port, setPort] = useState('3000');
  const [originalPort, setOriginalPort] = useState('3000');
  const [domain, setDomain] = useState('');
  const [useAiReview, setUseAiReview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isValidPort, setIsValidPort] = useState(true);

  const {
    data: settingsData,
    loading: settingsLoading,
    refetch,
  } = useGetServiceSettings(serviceId);
  const [updateServiceSettings] = useUpdateServiceSettings();

  useEffect(() => {
    if (settingsData?.getServiceSettings.__typename === 'GetServiceSettingsSuccessResult') {
      const loadedPort = settingsData.getServiceSettings.data.port || '3000';
      setPort(loadedPort);
      setOriginalPort(loadedPort);
      setDomain(settingsData.getServiceSettings.data.domain || '');
      setUseAiReview(settingsData.getServiceSettings.data.use_ai_review || false);
      validatePort(loadedPort);
    }
  }, [settingsData, serviceId]);

  const validatePort = (value: string) => {
    const portNumber = parseInt(value, 10);
    const isValid =
      !isNaN(portNumber) && Number.isInteger(portNumber) && portNumber >= 1 && portNumber <= 65535;
    setIsValidPort(isValid);
    return isValid;
  };

  const handlePortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPort = e.target.value;
    setPort(newPort);
    validatePort(newPort);
  };

  const handleSavePort = async () => {
    if (!isValidPort) return;

    setIsSaving(true);
    try {
      const { data } = await updateServiceSettings({
        variables: {
          serviceId: Number(serviceId),
          port,
          useAiReview,
          domain: domain || '',
        },
      });

      if (data?.updateServiceSettings.__typename === 'UpdateServiceSettingsSuccessResult') {
        toast.success('Port updated successfully');
        setOriginalPort(port);
        refetch();
      } else if (data?.updateServiceSettings.__typename === 'UpdateServiceSettingsErrorResult') {
        toast.error(data.updateServiceSettings.message || 'Failed to update port');
      }
    } catch (error) {
      console.error('Error updating port:', error);
      toast.error('An error occurred while updating port');
    } finally {
      setIsSaving(false);
    }
  };

  const hasPortChanged = port !== originalPort;

  // Hiển thị skeleton khi đang loading
  if (settingsLoading) {
    return <NetworkingSkeleton />;
  }

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
                    onChange={handlePortChange}
                    className={`h-9 ${!isValidPort ? 'border-red-500' : ''}`}
                    placeholder="3000"
                  />
                </div>
                {isSaving ? (
                  <Button disabled size="sm" className="relative">
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </span>
                    <span className="opacity-0">Saving...</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleSavePort}
                    disabled={!hasPortChanged || !isValidPort}
                    size="sm"
                  >
                    <SaveIcon className="h-3.5 w-3.5 mr-1.5" /> Save
                  </Button>
                )}
              </div>
              {!isValidPort && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <AlertCircleIcon className="h-3 w-3 mr-1" /> Port must be an integer between 1 and
                  65535
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {isValidPort && (
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <CheckIcon className="h-3 w-3 mr-1 inline" /> Currently using port{' '}
                    {originalPort}
                  </span>
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
