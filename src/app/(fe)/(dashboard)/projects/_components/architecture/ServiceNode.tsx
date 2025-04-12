import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Database, Package, Code, Plus, AlertCircle } from 'lucide-react';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { Skeleton } from '@/components/ui/skeleton';
import { Service_Type_Enum } from '@/gql/graphql';

const sourceDisplayNames = {
  [Service_Type_Enum.Database]: 'Database',
  [Service_Type_Enum.DockerImage]: 'Docker Image',
  [Service_Type_Enum.GithubRepo]: 'GitHub',
  [Service_Type_Enum.Functions]: 'Cloud Functions',
};

export interface ServiceNodeData {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  source: Service_Type_Enum | string;
  isSkeleton?: boolean;
  icon?: string;
  isEmptyState?: boolean;
}

function ServiceNode({ data }: { data: ServiceNodeData }) {
  const isSkeleton = data.isSkeleton;
  const isEmptyState = data.isEmptyState;

  const renderSourceIcon = () => {
    if (isEmptyState && data.icon === 'plus') {
      return <Plus size={30} className="mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0" />;
    }

    if (isSkeleton && !isEmptyState) return <Skeleton className="h-8 w-8 rounded-full" />;

    switch (data.source) {
      case Service_Type_Enum.Database:
        return (
          <Database size={30} className="mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        );
      case Service_Type_Enum.DockerImage:
        return (
          <Package
            size={30}
            className="mt-0.5 text-purple-600 dark:text-purple-400 flex-shrink-0"
          />
        );
      case Service_Type_Enum.GithubRepo:
        return (
          <IoLogoGithub size={30} className="mt-0.5 text-gray-900 dark:text-white flex-shrink-0" />
        );
      case Service_Type_Enum.Functions:
        return (
          <Code size={30} className="mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0" />
        );
      default:
        return (
          <IoLogoGithub size={30} className="mt-0.5 text-gray-900 dark:text-white flex-shrink-0" />
        );
    }
  };

  const getSourceDisplayName = () => {
    return sourceDisplayNames[data.source as Service_Type_Enum] || data.source;
  };

  return (
    <div className="relative w-72">
      <Card
        className={`w-full h-36 bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-950/80 shadow-lg ${isEmptyState ? 'border-dashed border-2 border-green-400 dark:border-green-600 cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/30' : ''}`}
      >
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-1 items-start gap-3 overflow-hidden">
            {renderSourceIcon()}
            <div className="flex-1 min-w-0">
              {isSkeleton && !isEmptyState ? (
                <>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </>
              ) : (
                <>
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {data.title}
                  </h3>
                  <p className="text-xs text-gray-700 dark:text-white truncate mt-1">
                    {data.description}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
            {isSkeleton && !isEmptyState ? (
              <Skeleton className="h-5 w-5 rounded-full" />
            ) : isEmptyState ? (
              <AlertCircle className="h-5 w-5 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
            )}
            {isSkeleton && !isEmptyState ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <span className="truncate">
                {data.timeAgo && `${data.timeAgo} via `}
                {getSourceDisplayName()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(ServiceNode);
