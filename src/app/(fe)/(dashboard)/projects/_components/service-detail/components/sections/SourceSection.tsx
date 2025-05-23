import React, { useState, useEffect } from 'react';
import { ExternalLink, GitBranch, SaveIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { useEnvironment } from '../../../EnvironmentContext';
import { useGetGithubServiceInfo } from '@/shared/api/queries/useDetailService';
import { useGetRepositoryBranches } from '@/shared/api/queries/useRepositories';
import { useConnectGithubBranch } from '@/shared/api/mutations/useDetailServiceMutation';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Status } from '@/gql/graphql';

interface SourceSectionProps {
  serviceId: number;
}

const SourceSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="h-7 w-36 mb-2" />
        <div className="bg-accent/50 dark:bg-gray-800/50 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
        <div className="mt-2">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div>
        <Skeleton className="h-7 w-56 mb-2" />
        <Skeleton className="h-4 w-full max-w-md mb-2" />
        <div className="bg-accent/50 dark:bg-gray-800/50 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
};

export const SourceSection: React.FC<SourceSectionProps> = ({ serviceId }) => {
  const { selectedEnvironmentId, selectedEnvironmentName } = useEnvironment();
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [connectGithubBranch] = useConnectGithubBranch();

  const {
    data: githubServiceInfoData,
    loading: githubServiceInfoLoading,
    refetch: refetchGithubServiceInfo,
  } = useGetGithubServiceInfo(
    serviceId,
    selectedEnvironmentId ? parseInt(selectedEnvironmentId, 10) : 0
  );

  const githubServiceInfo =
    githubServiceInfoData?.get_github_service_info.__typename === 'GetGithubServiceInfoSuccess'
      ? githubServiceInfoData.get_github_service_info.githubServiceInfo
      : null;

  const repositoryInfo =
    githubServiceInfo?.owner && githubServiceInfo?.name
      ? {
          owner: githubServiceInfo.owner,
          repo: githubServiceInfo.name,
        }
      : undefined;

  const { data: branchesData, loading: branchesLoading } = useGetRepositoryBranches(
    repositoryInfo || { owner: '', repo: '' },
    {
      skip: !repositoryInfo?.owner || !repositoryInfo?.repo,
    }
  );

  const branches =
    branchesData?.get_branches.__typename === 'GetBranchesSuccessResult' && repositoryInfo
      ? branchesData.get_branches.data
      : [];

  useEffect(() => {
    if (githubServiceInfo?.connectedBranch) {
      setSelectedBranch(githubServiceInfo.connectedBranch);
    }
  }, [githubServiceInfo]);

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
    setHasChanges(value !== githubServiceInfo?.connectedBranch);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const result = await connectGithubBranch({
        variables: {
          serviceId: serviceId,
          environmentId: parseInt(selectedEnvironmentId || '0', 10),
          branch: selectedBranch,
        },
      });

      const response = result.data?.connect_github_branch;

      if (
        response?.__typename === 'ConnectGithubBranchSuccess' &&
        response.status === Status.Success
      ) {
        toast.success('Branch changes saved successfully');
        setHasChanges(false);
        // Cập nhật lại dữ liệu
        refetchGithubServiceInfo();
      } else {
        toast.error(
          response?.__typename === 'ConnectGithubBranchError'
            ? response.message || 'Failed to save branch changes'
            : 'Failed to save branch changes'
        );
      }
    } catch (error) {
      toast.error('Failed to save branch changes');
      console.error('Error saving branch changes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (githubServiceInfoLoading) {
    return <SourceSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground dark:text-white mb-2">Source Repo</h2>
        <div className="bg-accent/50 dark:bg-gray-800/50 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              <IoLogoGithub className="text-foreground dark:text-gray-300 w-full h-full" />
            </div>
            <span className="text-md text-foreground dark:text-gray-300">
              {githubServiceInfo
                ? `${githubServiceInfo.owner}/${githubServiceInfo.name}`
                : 'Not connected'}
            </span>
          </div>
          {githubServiceInfo && (
            <a
              href={`https://github.com/${githubServiceInfo.owner}/${githubServiceInfo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4" />
              View Repo
            </a>
          )}
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
          Branch connected to {selectedEnvironmentName}
        </h2>
        <p className="text-xs text-muted-foreground dark:text-gray-400 mb-2">
          Changes made to this GitHub branch will be automatically pushed to this environment.
        </p>
        <div className="bg-accent/50 dark:bg-gray-800/50 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch size={20} className="text-foreground dark:text-gray-300" />
            {branchesLoading ? (
              <div className="h-9 flex items-center">
                <div className="h-4 w-4 border-2 border-t-transparent border-primary rounded-full animate-spin mr-2"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Loading branches...
                </span>
              </div>
            ) : branches.length > 0 ? (
              <Select value={selectedBranch} onValueChange={handleBranchChange}>
                <SelectTrigger className="w-[180px] h-9 dark:border-gray-600 dark:focus:border-blue-500">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <span className="text-md text-foreground dark:text-gray-300">
                No branches available
              </span>
            )}
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
            <Button onClick={handleSaveChanges} disabled={!hasChanges} size="sm">
              <SaveIcon className="h-3.5 w-3.5 mr-1.5" /> Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
