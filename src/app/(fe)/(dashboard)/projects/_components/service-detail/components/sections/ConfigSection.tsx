import React, { useState, useEffect } from 'react';
import { AlertCircle, SaveIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useGetServiceSettings } from '@/shared/api/queries/useDetailService';
import { useUpdateServiceSettings } from '@/shared/api/mutations/useDetailServiceMutation';
import { useUpdateServicePrompt } from '@/shared/api/mutations/useUpdateServicePrompt';
import { cn } from '@/shared/lib/utils';
import '@/stylesheet/animations.css';

interface ConfigSectionProps {
  serviceId: number;
}

const LoadingSwitch = ({ isChecked = false }: { isChecked?: boolean }) => {
  return (
    <div
      className={cn(
        'inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs relative overflow-hidden',
        isChecked ? 'bg-blue-600' : 'bg-input dark:bg-input/80'
      )}
    >
      <span
        className={cn(
          'pointer-events-none block size-4 rounded-full absolute transition-transform',
          isChecked
            ? 'translate-x-[calc(100%-2px)] bg-white animate-pulse'
            : 'translate-x-0 bg-foreground dark:bg-foreground animate-pulse'
        )}
      />
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
        style={{ backgroundSize: '200% 100%' }}
      />
    </div>
  );
};

const ConfigSkeleton = () => {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-4 w-full max-w-md mb-4" />

        <div className="flex items-center justify-between p-3 bg-secondary/20 dark:bg-secondary/10 rounded-md">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-48" />
          </div>
          <LoadingSwitch />
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConfigSection: React.FC<ConfigSectionProps> = ({ serviceId }) => {
  const [aiEnabled, setAiEnabled] = useState(false);
  const [domain, setDomain] = useState('');
  const [port, setPort] = useState('3000');
  const [isUpdating, setIsUpdating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);

  const {
    data: settingsData,
    loading: settingsLoading,
    refetch,
  } = useGetServiceSettings(serviceId);
  const [updateServiceSettings] = useUpdateServiceSettings();
  const [updateServicePrompt] = useUpdateServicePrompt();

  useEffect(() => {
    if (settingsData?.getServiceSettings.__typename === 'GetServiceSettingsSuccessResult') {
      const settings = settingsData.getServiceSettings.data;
      setAiEnabled(settings.use_ai_review || false);
      setDomain(settings.domain || '');
      setPort(settings.port || '3000');
      setCustomPrompt(settings.prompt || '');
      setOriginalPrompt(settings.prompt || '');
    }
  }, [settingsData, serviceId]);

  const handleToggleAI = async (checked: boolean) => {
    setIsUpdating(true);
    try {
      const { data } = await updateServiceSettings({
        variables: {
          serviceId: Number(serviceId),
          useAiReview: checked,
          port,
          domain: domain || '',
        },
      });

      if (data?.updateServiceSettings.__typename === 'UpdateServiceSettingsSuccessResult') {
        setAiEnabled(checked);
        toast.success(`AI Commit Review ${checked ? 'enabled' : 'disabled'} successfully`);
        refetch();
      } else if (data?.updateServiceSettings.__typename === 'UpdateServiceSettingsErrorResult') {
        toast.error(
          data.updateServiceSettings.message ||
            `Failed to ${checked ? 'enable' : 'disable'} AI Commit Review`
        );
        setAiEnabled(!checked);
      }
    } catch (error) {
      console.error('Error toggling AI Review:', error);
      toast.error(`An error occurred while ${checked ? 'enabling' : 'disabling'} AI Commit Review`);
      setAiEnabled(!checked);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSavePrompt = async () => {
    setIsSavingPrompt(true);
    try {
      const { data } = await updateServicePrompt({
        variables: {
          serviceId: Number(serviceId),
          prompt: customPrompt,
        },
      });

      if (data?.updateServicePrompt.__typename === 'UpdateServiceSettingsSuccessResult') {
        toast.success('Custom prompt updated successfully');
        setOriginalPrompt(customPrompt);
        refetch();
      } else if (data?.updateServicePrompt.__typename === 'UpdateServiceSettingsErrorResult') {
        toast.error(data.updateServicePrompt.message || 'Failed to update custom prompt');
      }
    } catch (error) {
      console.error('Error updating custom prompt:', error);
      toast.error('An error occurred while updating custom prompt');
    } finally {
      setIsSavingPrompt(false);
    }
  };

  const hasPromptChanged = customPrompt !== originalPrompt;

  if (settingsLoading) {
    return <ConfigSkeleton />;
  }

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

        <div className="flex items-center justify-between p-3 bg-accent/50 dark:bg-gray-800/50 rounded-md p-3 rounded-md">
          <div className="flex items-center gap-2">
            <span className="font-medium">Enable AI Commit Review</span>
            {aiEnabled && !isUpdating && (
              <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 rounded">
                Active
              </span>
            )}
            {isUpdating && (
              <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded flex items-center">
                <svg className="animate-spin h-2 w-2 mr-1" viewBox="0 0 24 24">
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
                Processing
              </span>
            )}
          </div>
          {isUpdating ? (
            <LoadingSwitch isChecked={aiEnabled} />
          ) : (
            <Switch
              checked={aiEnabled}
              onCheckedChange={handleToggleAI}
              className="data-[state=checked]:bg-blue-600"
            />
          )}
        </div>

        {aiEnabled && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-xs text-muted-foreground">
                AI will automatically review each pull request created in your repository
              </p>
            </div>

            <div className="bg-muted/50 dark:bg-gray-800/50 p-4 rounded-md">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-medium">Custom AI Prompt</label>
                  <div className="flex flex-col gap-3">
                    <Textarea
                      value={customPrompt}
                      onChange={e => setCustomPrompt(e.target.value)}
                      placeholder="Enter your custom prompt for AI review..."
                      className="min-h-[100px] resize-none"
                    />
                    {isSavingPrompt ? (
                      <Button disabled size="sm" className="relative self-end">
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
                        onClick={handleSavePrompt}
                        disabled={!hasPromptChanged}
                        size="sm"
                        className="self-end"
                      >
                        <SaveIcon className="h-3.5 w-3.5 mr-1.5" /> Save Prompt
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Customize how AI reviews your code. Leave empty to use default prompt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
