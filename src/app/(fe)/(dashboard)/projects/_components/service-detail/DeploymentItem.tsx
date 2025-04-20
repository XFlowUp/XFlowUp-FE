import React from 'react';
import { X, CheckCircle, MoreVertical, RefreshCw, PlayCircle, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/avatar-component';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Deploy_Status, Service_Type_Enum } from '@/gql/graphql';

// Status badge variants
export type DeploymentStatus = 'active' | 'deploying' | 'failed';

// Map API status to UI status
export const mapApiStatusToUiStatus = (status: Deploy_Status): DeploymentStatus => {
  switch (status) {
    case Deploy_Status.Success:
      return 'active';
    case Deploy_Status.Pending:
      return 'deploying';
    case Deploy_Status.Failed:
      return 'failed';
    default:
      return 'failed';
  }
};

export interface DeploymentItemProps {
  source: Service_Type_Enum;
  status: DeploymentStatus;
  environment: string;
  timeInfo: string;
  commitHash?: string | null;
  branch?: string | null;
  avatar?: string | null;
}

export const DeploymentItem = ({
  source,
  status,
  environment,
  timeInfo,
  commitHash,
  branch,
  avatar,
}: DeploymentItemProps) => {
  // Configuration based on status
  const statusConfig = {
    active: {
      icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />,
      label: 'ACTIVE',
      badgeClasses: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      backgroundClasses:
        'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/30',
      buttonClasses:
        'border-green-200 text-green-700 bg-green-100 hover:bg-green-200 hover:text-green-800 dark:border-green-800/50 dark:text-green-400 dark:bg-green-950/50 dark:hover:bg-green-900/50 dark:hover:text-green-300',
    },
    deploying: {
      icon: (
        <div className="h-5 w-5 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
      ),
      label: 'DEPLOYING',
      badgeClasses: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      backgroundClasses: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/30',
      buttonClasses:
        'border-blue-200 text-blue-700 bg-blue-100 hover:bg-blue-200 hover:text-blue-800 dark:border-blue-800/50 dark:text-blue-400 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 dark:hover:text-blue-300',
    },
    failed: {
      icon: (
        <div className="h-5 w-5 text-red-600 dark:text-red-500 flex items-center justify-center">
          <X className="h-4 w-4" />
        </div>
      ),
      label: 'FAILED',
      badgeClasses: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      backgroundClasses: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/30',
      buttonClasses:
        'border-red-200 text-red-700 bg-red-100 hover:bg-red-200 hover:text-red-800 dark:border-red-800/50 dark:text-red-400 dark:bg-red-950/50 dark:hover:bg-red-900/50 dark:hover:text-red-300',
    },
  };

  const config = statusConfig[status];

  const getNameService = (source: Service_Type_Enum) => {
    switch (source) {
      case Service_Type_Enum.GithubRepo:
        return 'GitHub';
      case Service_Type_Enum.Database:
        return 'Database';
      case Service_Type_Enum.DockerImage:
        return 'Docker';
      case Service_Type_Enum.Functions:
        return 'Functions';
      default:
        return 'Unknown';
    }
  };

  return (
    <div
      className={`flex items-center justify-between rounded-md h-full px-3 py-4 w-full select-none border ${config.backgroundClasses}`}
    >
      <div className="grid grid-cols-[100px_1fr] items-center">
        <div className="mr-4">
          <Badge
            className={`px-2 py-1 text-xs font-medium inline-block min-w-[70px] text-center ${config.badgeClasses}`}
          >
            {config.label}
          </Badge>
        </div>
        <div className="flex items-center">
          <div className="mr-4">{avatar ? <Avatar src={avatar} /> : config.icon}</div>
          <div>
            <h4 className="font-medium">{environment}</h4>
            <p className="text-sm text-gray-500">
              {timeInfo} via {getNameService(source)}
            </p>
            {commitHash && (
              <p className="text-xs text-gray-500 mt-1">
                Commit: {commitHash}
                {branch && ` (${branch})`}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className={`text-xs h-8 ${config.buttonClasses}`}>
          View logs
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <PlayCircle className="h-4 w-4 mr-2" />
              View logs
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <RefreshCw className="h-4 w-4 mr-2" />
              Restart
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <RefreshCw className="h-4 w-4 mr-2" />
              Redeploy
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
              <Trash className="h-4 w-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DeploymentItem;
