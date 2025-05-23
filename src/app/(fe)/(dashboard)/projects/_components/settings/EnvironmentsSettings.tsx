'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Loader2, Trash2, Eye, EyeOff, Save, Copy, Edit2, FileUp } from 'lucide-react';
import { toast } from 'sonner';
import { useEnvironment } from '../EnvironmentContext';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import CreateEnvironmentDialog from '../CreateEnvironmentDialog';
import useEnvironmentValues from '@/shared/api/queries/useEnvironmentValues';
import useEditEnvironmentValues from '@/shared/api/mutations/useEnvironmentValuesMutation';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';

interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
  isSecret: boolean;
}

interface EnvironmentsSettingsProps {
  projectSlug: string;
}

export default function EnvironmentsSettings({ projectSlug }: EnvironmentsSettingsProps) {
  const [environmentVariables, setEnvironmentVariables] = useState<EnvironmentVariable[]>([]);
  const [originalVariables, setOriginalVariables] = useState<EnvironmentVariable[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newVariable, setNewVariable] = useState({ key: '', value: '', isSecret: true });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCreateEnvDialogOpen, setIsCreateEnvDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [bulkEnvText, setBulkEnvText] = useState('');
  const [editingVariable, setEditingVariable] = useState<{
    index: number;
    id: string;
    key: string;
    value: string;
    isSecret: boolean;
  } | null>(null);
  const [pendingActionUrl, setPendingActionUrl] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const {
    selectedEnvironmentId,
    selectedEnvironmentName,
    environments,
    loading: envLoading,
  } = useEnvironment();

  const router = useRouter();

  const {
    data: envValuesData,
    loading: envValuesLoading,
    refetch,
  } = useEnvironmentValues({
    environmentId: selectedEnvironmentId || '',
    projectSlug: projectSlug,
  });

  const [editEnvironmentValues] = useEditEnvironmentValues({
    environmentId: selectedEnvironmentId || '',
    projectSlug: projectSlug,
    environmentValues: [],
  });

  useEffect(() => {
    if (!originalVariables.length && environmentVariables.length) {
      setIsDirty(true);
      return;
    }

    if (originalVariables.length !== environmentVariables.length) {
      setIsDirty(true);
      return;
    }

    const isDifferent = environmentVariables.some(variable => {
      const original = originalVariables.find(v => v.id === variable.id);
      return !original || original.key !== variable.key || original.value !== variable.value;
    });

    setIsDirty(isDifferent);
  }, [environmentVariables, originalVariables]);

  useEffect(() => {
    if (selectedEnvironmentId) {
      setIsLoading(true);
      refetch()
        .then(() => setIsLoading(false))
        .catch(() => {
          toast.error('Failed to load environment variables');
          setIsLoading(false);
        });
    }
  }, [selectedEnvironmentId, refetch]);

  useEffect(() => {
    if (envValuesData?.environment_values.__typename === 'GetEnvironmentValuesSuccessResult') {
      const values = envValuesData.environment_values.environmentValues.map(v => ({
        id: v.id,
        key: v.key,
        value: v.value,
        isSecret: true,
      }));
      setEnvironmentVariables(values);
      setOriginalVariables(JSON.parse(JSON.stringify(values)));
      setIsDirty(false);
    }
  }, [envValuesData]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const navigateSafely = useCallback(
    (url: string) => {
      if (isDirty) {
        setPendingActionUrl(url);
        return;
      }
      router.push(url);
    },
    [isDirty, router]
  );

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        !anchor.href.includes('#') &&
        isDirty
      ) {
        e.preventDefault();
        navigateSafely(anchor.href);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [isDirty, navigateSafely]);

  const saveEnvironmentVariables = async () => {
    if (!selectedEnvironmentId) return;

    setIsSaving(true);
    try {
      const valuesToSave = environmentVariables.map(v => ({
        key: v.key,
        value: v.value,
      }));

      const { data } = await editEnvironmentValues({
        variables: {
          input: {
            environmentId: selectedEnvironmentId,
            projectSlug: projectSlug,
            environmentValues: valuesToSave,
          },
        },
      });

      if (data?.edit_environment_value.__typename === 'EditEnvironmentValueSuccess') {
        toast.success('Environment variables saved successfully');
        setOriginalVariables(JSON.parse(JSON.stringify(environmentVariables)));
        setIsDirty(false);
      } else if (data?.edit_environment_value.__typename === 'EditEnvironmentValueError') {
        toast.error(`Failed to save: ${data.edit_environment_value.message || 'Unknown error'}`);
      } else {
        toast.error('Failed to save environment variables');
      }
    } catch (error) {
      console.error('Error saving environment variables:', error);
      toast.error('Failed to save environment variables');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddVariable = () => {
    if (!newVariable.key.trim()) {
      toast.error('Variable key cannot be empty');
      return;
    }

    if (environmentVariables.some(variable => variable.key === newVariable.key.trim())) {
      toast.error('Variable key already exists');
      return;
    }

    const tempId = `temp-${Date.now()}`;

    setEnvironmentVariables([
      ...environmentVariables,
      {
        id: tempId,
        key: newVariable.key.trim(),
        value: newVariable.value,
        isSecret: newVariable.isSecret,
      },
    ]);

    setNewVariable({ key: '', value: '', isSecret: true });
    setIsAddDialogOpen(false);
    toast.success('Variable added successfully');
    setIsDirty(true);
  };

  const handleRemoveVariable = (index: number) => {
    const updatedVariables = [...environmentVariables];
    updatedVariables.splice(index, 1);
    setEnvironmentVariables(updatedVariables);
    toast.success('Variable removed successfully');
    setIsDirty(true);
  };

  const handleEditVariable = (index: number) => {
    const variable = environmentVariables[index];
    setEditingVariable({
      index,
      id: variable.id,
      key: variable.key,
      value: variable.value,
      isSecret: variable.isSecret,
    });
    setIsEditDialogOpen(true);
  };

  const saveEditedVariable = () => {
    if (!editingVariable) return;

    const updatedVariables = [...environmentVariables];
    updatedVariables[editingVariable.index] = {
      ...updatedVariables[editingVariable.index],
      value: editingVariable.value,
    };

    setEnvironmentVariables(updatedVariables);
    setIsEditDialogOpen(false);
    setEditingVariable(null);
    toast.success('Variable updated successfully');
    setIsDirty(true);
  };

  const toggleVariableVisibility = (index: number) => {
    const updatedVariables = [...environmentVariables];
    updatedVariables[index].isSecret = !updatedVariables[index].isSecret;
    setEnvironmentVariables(updatedVariables);
  };

  const copyValueToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success('Value copied to clipboard');
  };

  const parseEnvVariables = (envText: string): { key: string; value: string }[] => {
    const lines = envText.split('\n');
    const variables: { key: string; value: string }[] = [];

    lines.forEach(line => {
      // Skip empty lines and comments
      if (!line.trim() || line.trim().startsWith('#')) {
        return;
      }

      // Find the first equals sign
      const equalIndex = line.indexOf('=');
      if (equalIndex > 0) {
        let key = line.slice(0, equalIndex).trim();
        let value = line.slice(equalIndex + 1).trim();

        // Handle quoted values
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        variables.push({ key, value });
      }
    });

    return variables;
  };

  const handleBulkImport = () => {
    if (!bulkEnvText.trim()) {
      toast.error('Please paste environment variables in .env format');
      return;
    }

    const parsedVariables = parseEnvVariables(bulkEnvText);

    if (parsedVariables.length === 0) {
      toast.error('No valid environment variables found');
      return;
    }

    // Prepare new variables
    const newVariables: EnvironmentVariable[] = [...environmentVariables];
    let addedCount = 0;
    let updatedCount = 0;

    parsedVariables.forEach(({ key, value }) => {
      const existingIndex = newVariables.findIndex(v => v.key === key);

      if (existingIndex >= 0) {
        // Update existing variable
        newVariables[existingIndex] = {
          ...newVariables[existingIndex],
          value: value,
        };
        updatedCount++;
      } else {
        // Add new variable
        newVariables.push({
          id: `temp-${Date.now()}-${key}`,
          key,
          value,
          isSecret: true,
        });
        addedCount++;
      }
    });

    setEnvironmentVariables(newVariables);
    setIsBulkImportOpen(false);
    setBulkEnvText('');
    setIsDirty(true);

    toast.success(
      `Successfully imported ${addedCount} new and updated ${updatedCount} existing environment variables`
    );
  };

  return (
    <div className="p-8">
      <div className="mb-6 max-w-[60%]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Environment Variables</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsBulkImportOpen(true)}
              disabled={!selectedEnvironmentId || isLoading || isSaving || envValuesLoading}
            >
              <FileUp className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              disabled={!selectedEnvironmentId || isLoading || isSaving || envValuesLoading}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Variable
            </Button>
          </div>
        </div>
      </div>

      {envLoading ? (
        <div className="flex justify-center py-8 max-w-[60%]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : environments.length === 0 ? (
        <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-900/40 max-w-[60%]">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No environments found</p>
          <Button onClick={() => setIsCreateEnvDialogOpen(true)}>Create Environment</Button>
        </div>
      ) : !selectedEnvironmentId ? (
        <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-900/40 max-w-[60%]">
          <p className="text-gray-500 dark:text-gray-400">Please select an environment</p>
        </div>
      ) : (
        <>
          <div className="mb-6 max-w-[60%]">
            <Badge variant="outline" className="px-3 py-1 text-base font-medium">
              {selectedEnvironmentName}
            </Badge>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage environment variables for this environment. These variables will be available
              as process.env variables in your application.
            </p>
          </div>

          {isLoading || envValuesLoading ? (
            <div className="flex justify-center py-8 max-w-[60%]">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : environmentVariables.length > 0 ? (
            <div className="border rounded-md overflow-visible mb-6 max-w-[60%]">
              <div className="bg-gray-50 dark:bg-gray-900/60 px-4 py-3 border-b grid grid-cols-12 gap-4">
                <div className="col-span-5 font-medium text-sm text-gray-500">KEY</div>
                <div className="col-span-5 font-medium text-sm text-gray-500">VALUE</div>
                <div className="col-span-2 text-right font-medium text-sm text-gray-500">
                  ACTIONS
                </div>
              </div>
              <div className="divide-y max-h-96 overflow-y-auto">
                {environmentVariables.map((variable, index) => (
                  <div
                    key={variable.id || index}
                    className="px-4 py-3 grid grid-cols-12 gap-4 items-center"
                  >
                    <div className="col-span-5 font-mono text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {variable.key}
                    </div>
                    <div className="col-span-5 font-mono text-sm overflow-hidden overflow-ellipsis whitespace-nowrap pr-4">
                      {variable.isSecret ? '••••••••••••••••' : variable.value}
                    </div>
                    <div className="col-span-2 flex justify-end gap-1 min-w-[110px]">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                        title={variable.isSecret ? 'Show value' : 'Hide value'}
                        onClick={() => toggleVariableVisibility(index)}
                      >
                        {variable.isSecret ? (
                          <Eye className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Edit value"
                        onClick={() => handleEditVariable(index)}
                      >
                        <Edit2 className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Copy value"
                        onClick={() => copyValueToClipboard(variable.value)}
                      >
                        <Copy className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        title="Remove variable"
                        onClick={() => handleRemoveVariable(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-900/40 mb-6 max-w-[60%]">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No environment variables found for this environment
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>Add Variable</Button>
            </div>
          )}

          <div className="max-w-[60%] mt-6">
            <Button
              onClick={saveEnvironmentVariables}
              disabled={isSaving || !isDirty || isLoading || envValuesLoading}
              className="flex items-center"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle>Add Environment Variable</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="key">Key</Label>
              <Input
                id="key"
                placeholder="KEY_NAME"
                value={newVariable.key}
                onChange={e =>
                  setNewVariable({ ...newVariable, key: e.target.value.toUpperCase() })
                }
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                placeholder="value"
                value={newVariable.value}
                onChange={e => setNewVariable({ ...newVariable, value: e.target.value })}
                className="font-mono"
                type={newVariable.isSecret ? 'password' : 'text'}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isSecret"
                checked={newVariable.isSecret}
                onChange={e => setNewVariable({ ...newVariable, isSecret: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isSecret" className="text-sm font-normal">
                Mark as secret
              </Label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddVariable}>Add Variable</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle>Edit Environment Variable</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-key">Key</Label>
              <Input
                id="edit-key"
                value={editingVariable?.key || ''}
                className="font-mono"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-value">Value</Label>
              <Input
                id="edit-value"
                placeholder="value"
                value={editingVariable?.value || ''}
                onChange={e =>
                  editingVariable &&
                  setEditingVariable({
                    ...editingVariable,
                    value: e.target.value,
                  })
                }
                className="font-mono"
                type={editingVariable?.isSecret ? 'password' : 'text'}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-isSecret"
                checked={editingVariable?.isSecret || false}
                onChange={e =>
                  editingVariable &&
                  setEditingVariable({
                    ...editingVariable,
                    isSecret: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="edit-isSecret" className="text-sm font-normal">
                Mark as secret
              </Label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={saveEditedVariable}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isBulkImportOpen} onOpenChange={setIsBulkImportOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle>Bulk Import Environment Variables</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Paste your environment variables in .env format, one variable per line (KEY=VALUE).
              Variables with existing keys will be updated.
            </p>
            <div className="space-y-2">
              <Label htmlFor="env-import">Environment Variables (.env format)</Label>
              <textarea
                id="env-import"
                placeholder="KEY=value"
                value={bulkEnvText}
                onChange={e => setBulkEnvText(e.target.value)}
                className="font-mono w-full h-64 min-h-[200px] max-h-[500px] resize-y text-sm leading-5 border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800/30"
                style={{
                  whiteSpace: 'pre',
                  overflowX: 'scroll',
                  overflowY: 'scroll',
                  wordBreak: 'normal',
                  overflowWrap: 'normal',
                  minWidth: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsBulkImportOpen(false);
                setBulkEnvText('');
              }}
              className="dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleBulkImport}>Import Variables</Button>
          </div>
        </DialogContent>
      </Dialog>

      <CreateEnvironmentDialog
        open={isCreateEnvDialogOpen}
        onOpenChange={setIsCreateEnvDialogOpen}
        slug={projectSlug}
        onSuccess={() => {
          setIsCreateEnvDialogOpen(false);
        }}
      />
    </div>
  );
}
