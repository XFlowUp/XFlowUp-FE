import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  MoreVertical,
  RefreshCw,
  PlayCircle,
  Trash,
  ExternalLink,
  Calendar,
  GitBranch,
  User,
  Clock,
  Globe,
  Server,
  Activity,
  Code2,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Deploy_Status, Service_Type_Enum } from '@/gql/graphql';
import { formatDistanceToNow, format } from 'date-fns';
import { useDeploymentById } from '@/shared/api/queries/useDeploymentsHistory';

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

// Basic deployment info from history list
export interface BasicDeploymentInfo {
  id: string;
  status: Deploy_Status;
  createdAt: string | Date;
  commitHash?: string | null;
  branch?: string | null;
  commiterAvatar?: string | null;
}

export interface DeploymentItemProps {
  deploymentId: string;
  basicInfo: BasicDeploymentInfo;
  renderSourceIcon: () => React.ReactNode;
}

// DeploymentItemDetail component
interface DeploymentItemDetailProps {
  deploymentId: string;
  onClose: () => void;
  defaultTab?: string;
  renderSourceIcon: () => React.ReactNode;
}

const formatDeploymentTime = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

const formatDateTimeStandard = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy h:mm a');
};

const getNameService = (source: string) => {
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

// Skeleton component for consistent loading
const DeploymentDetailSkeleton = ({
  onClose,
  renderSourceIcon,
}: {
  onClose: () => void;
  renderSourceIcon: () => React.ReactNode;
}) => {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-l-lg">
      {/* Header without tabs during loading */}
      <div className="px-6 md:px-12 pt-8 md:pt-12 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center space-x-4">
            {renderSourceIcon()}
            <div>
              <div className="h-8 w-80 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2" />
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onClose}
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-6 md:px-12 py-6 flex-grow overflow-auto">
        <div className="space-y-6">
          {/* Overview Section Skeleton */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-0.5" />
                    <div>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                      <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-0.5" />
                    <div>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                      <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Log Information Skeleton */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Additional sections skeleton */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading message at bottom */}
        <div className="flex items-center justify-center py-8 mt-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" />
            <p className="text-gray-500 font-medium">Loading deployment details...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DeploymentItemDetail = ({
  deploymentId,
  onClose,
  defaultTab = 'details',
  renderSourceIcon,
}: DeploymentItemDetailProps) => {
  // Only call API when detail panel is opened
  const { data: deploymentDetailData, loading, error } = useDeploymentById(deploymentId, true);

  const deploymentDetail =
    deploymentDetailData?.deployment?.__typename === 'DeploymentInfoResultSuccess'
      ? deploymentDetailData.deployment.deployment
      : null;

  const statusConfig = {
    active: {
      backgroundClasses:
        'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800/30',
      badgeClasses:
        'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300 border border-green-200 dark:border-green-800',
      label: 'ACTIVE',
      icon: <CheckCircle className="h-4 w-4 mr-1.5 text-green-600 dark:text-green-500" />,
      dotColor: 'bg-green-500',
    },
    deploying: {
      backgroundClasses:
        'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800/30',
      badgeClasses:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
      label: 'DEPLOYING',
      icon: (
        <div className="h-4 w-4 mr-1.5 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
      ),
      dotColor: 'bg-blue-500',
    },
    failed: {
      backgroundClasses:
        'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-200 dark:border-red-800/30',
      badgeClasses:
        'bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-300 border border-red-200 dark:border-red-800',
      label: 'FAILED',
      icon: (
        <div className="h-4 w-4 mr-1.5 text-red-600 dark:text-red-500 flex items-center justify-center">
          <X className="h-3 w-3" />
        </div>
      ),
      dotColor: 'bg-red-500',
    },
  };

  const panelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  // Show skeleton loading if no data yet
  if (loading || !deploymentDetail) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={panelVariants}
        className="fixed right-0 top-0 bottom-0 w-2/3 z-50 pointer-events-auto"
        style={{ marginTop: '80px' }}
      >
        {loading ? (
          <DeploymentDetailSkeleton onClose={onClose} renderSourceIcon={renderSourceIcon} />
        ) : error ? (
          <div className="w-full h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-l-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                {renderSourceIcon()}
                <h1 className="text-[28px] font-semibold">Error</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
                title="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <X className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-red-500 font-semibold mb-2">Failed to load deployment details</p>
              <p className="text-sm text-gray-500 text-center max-w-md">{error.message}</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-l-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                {renderSourceIcon()}
                <h1 className="text-[28px] font-semibold">Not Found</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
                title="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No deployment information found</p>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  const status = mapApiStatusToUiStatus(deploymentDetail.status);
  const config = statusConfig[status];

  // Extract commit hash if present in deployment data
  const commitDisplay = deploymentDetail.id ? deploymentDetail.id.substring(0, 8) : '';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={panelVariants}
      className="fixed right-0 top-0 bottom-0 w-2/3 z-50 pointer-events-auto"
      style={{ marginTop: '80px' }}
    >
      <motion.div
        className="absolute w-full h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-l-lg"
        style={{ zIndex: 60 }}
      >
        <Tabs defaultValue={defaultTab} className="w-full h-full flex flex-col">
          {/* Header matching ServiceDetailPanel */}
          <div className="px-6 md:px-12 pt-8 md:pt-12 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between w-full mb-6">
              <div className="flex items-center space-x-4">
                {renderSourceIcon()}
                <h1 className="text-[28px] font-semibold">
                  {deploymentDetail.environmentName}
                  {commitDisplay && (
                    <span className="text-lg font-normal text-gray-500 ml-2">
                      / {commitDisplay}
                    </span>
                  )}
                </h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
                title="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <Badge
                className={`px-3 py-1.5 text-sm font-semibold inline-flex items-center shadow-sm ${config.badgeClasses}`}
              >
                <div className={`w-2 h-2 rounded-full ${config.dotColor} mr-2 animate-pulse`} />
                {config.label}
              </Badge>
              {deploymentDetail.url && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-4 text-sm font-medium border-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950 transition-all duration-200"
                  onClick={() => window.open(deploymentDetail.url!, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Live Site
                </Button>
              )}
              <div className="text-sm text-gray-500">
                Deployment via {getNameService(deploymentDetail.serviceType)} •{' '}
                {formatDateTimeStandard(deploymentDetail.createdAt)}
              </div>
            </div>

            <TabsList className="mb-4 dark:bg-gray-900/50">
              <TabsTrigger value="details" className="font-medium">
                <FileText className="h-4 w-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger value="buildLogs" className="font-medium">
                <Code2 className="h-4 w-4 mr-2" />
                Build Logs
              </TabsTrigger>
              <TabsTrigger value="deployLogs" className="font-medium">
                <Activity className="h-4 w-4 mr-2" />
                Deploy Logs
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content matching ServiceDetailPanel */}
          <div className="flex-grow overflow-hidden">
            <TabsContent value="details" className="h-full flex flex-col px-6 md:px-12 py-6">
              <div className="flex-grow overflow-auto h-full pr-4">
                <div className="space-y-6">
                  {/* Deployment Overview */}
                  <div className={`border rounded-lg p-6 shadow-sm ${config.backgroundClasses}`}>
                    <h3 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-gray-100">
                      <Server className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                      Deployment Overview
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                            <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Environment
                            </span>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {deploymentDetail.environmentName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Status
                            </span>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {deploymentDetail.status === Deploy_Status.Success
                                ? 'Active'
                                : deploymentDetail.status === Deploy_Status.Pending
                                  ? 'Deploying'
                                  : 'Failed'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                            <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Deployed
                            </span>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {formatDeploymentTime(deploymentDetail.createdAt)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDateTimeStandard(deploymentDetail.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                            <User className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Service Type
                            </span>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {getNameService(deploymentDetail.serviceType)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                            <GitBranch className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Deployment ID
                            </span>
                            <p className="text-base font-mono font-semibold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md">
                              {deploymentDetail.id}
                            </p>
                          </div>
                        </div>

                        {deploymentDetail.url && (
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                              <ExternalLink className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Live URL
                              </span>
                              <div className="mt-1">
                                <a
                                  href={deploymentDetail.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                                >
                                  {deploymentDetail.url.replace(/^https?:\/\//, '')}
                                  <ExternalLink className="h-4 w-4 ml-2" />
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Log Information */}
                  {(deploymentDetail.buildLogId || deploymentDetail.deployLogId) && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-bold mb-4 flex items-center text-gray-900 dark:text-gray-100">
                        <Calendar className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                        Log Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {deploymentDetail.buildLogId && (
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center mb-2">
                              <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                              <span className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                                Build Log ID
                              </span>
                            </div>
                            <p className="font-mono text-sm text-gray-700 dark:text-gray-300 break-all bg-white dark:bg-gray-800 px-3 py-2 rounded border">
                              {deploymentDetail.buildLogId}
                            </p>
                          </div>
                        )}
                        {deploymentDetail.deployLogId && (
                          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg p-4 border border-green-200 dark:border-green-800">
                            <div className="flex items-center mb-2">
                              <Activity className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                              <span className="text-sm font-semibold text-green-900 dark:text-green-300">
                                Deploy Log ID
                              </span>
                            </div>
                            <p className="font-mono text-sm text-gray-700 dark:text-gray-300 break-all bg-white dark:bg-gray-800 px-3 py-2 rounded border">
                              {deploymentDetail.deployLogId}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="buildLogs" className="h-full flex flex-col px-6 md:px-12 py-6">
              <div className="flex-grow overflow-auto h-full pr-4">
                <div className="bg-gray-950 text-gray-300 p-6 rounded-lg font-mono text-sm h-full overflow-auto border border-gray-800 shadow-inner">
                  <div className="flex items-center mb-4 text-gray-400">
                    <Code2 className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Build Logs</span>
                    {deploymentDetail.buildLogId && (
                      <span className="ml-2 text-xs bg-gray-800 px-2 py-1 rounded">
                        ID: {deploymentDetail.buildLogId}
                      </span>
                    )}
                  </div>
                  {deploymentDetail.buildLogId ? (
                    <>
                      <p className="opacity-60">
                        $ Loading build logs for ID: {deploymentDetail.buildLogId}
                      </p>
                      <p className="text-yellow-400">Build logs will be implemented here...</p>
                    </>
                  ) : (
                    <>
                      <p className="opacity-60">$ Starting build process...</p>
                      <p>Cloning repository...</p>
                      <p>Installing dependencies...</p>
                      <p>Running build script...</p>
                      <p className="text-green-400">Build completed successfully.</p>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deployLogs" className="h-full flex flex-col px-6 md:px-12 py-6">
              <div className="flex-grow overflow-auto h-full pr-4">
                <div className="bg-gray-950 text-gray-300 p-6 rounded-lg font-mono text-sm h-full overflow-auto border border-gray-800 shadow-inner">
                  <div className="flex items-center mb-4 text-gray-400">
                    <Activity className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Deploy Logs</span>
                    {deploymentDetail.deployLogId && (
                      <span className="ml-2 text-xs bg-gray-800 px-2 py-1 rounded">
                        ID: {deploymentDetail.deployLogId}
                      </span>
                    )}
                  </div>
                  {deploymentDetail.deployLogId ? (
                    <>
                      <p className="opacity-60">
                        $ Loading deploy logs for ID: {deploymentDetail.deployLogId}
                      </p>
                      <p className="text-yellow-400">Deploy logs will be implemented here...</p>
                    </>
                  ) : (
                    <>
                      <p className="opacity-60">$ Starting deployment process...</p>
                      <p>Preparing deployment packages...</p>
                      <p>Uploading artifacts...</p>
                      <p>Configuring environment...</p>
                      <p>Starting service...</p>
                      <p className="text-green-400">Deployment completed successfully.</p>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export const DeploymentItem = ({
  deploymentId,
  basicInfo,
  renderSourceIcon,
}: DeploymentItemProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('details');

  // Use basic info from deployment history instead of calling API
  const status = mapApiStatusToUiStatus(basicInfo.status);

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

  const handleViewLogs = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setActiveTab('deployLogs');
    setShowDetail(true);
  };

  const handleItemClick = () => {
    setActiveTab('details');
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const serviceDetailVariants = {
    initial: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 50,
    },
    behind: {
      opacity: 0.8,
      x: -32,
      y: 8,
      scale: 0.98,
      zIndex: 45,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 45,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  };

  // Create display info from basic deployment info
  const commitDisplay = basicInfo.commitHash ? basicInfo.commitHash.substring(0, 6) : '';
  const environmentName = basicInfo.branch || 'Production';

  return (
    <>
      <div
        className={`flex items-center justify-between rounded-lg h-full px-4 py-4 w-full select-none border ${config.backgroundClasses} cursor-pointer hover:shadow-sm transition-shadow duration-200`}
        onClick={handleItemClick}
      >
        <div className="grid grid-cols-[100px_1fr] items-center">
          <div className="mr-4">
            <Badge
              className={`px-2.5 py-1 text-xs font-medium inline-block min-w-[70px] text-center ${config.badgeClasses}`}
            >
              {config.label}
            </Badge>
          </div>
          <div className="flex items-center">
            <div className="mr-4">{config.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{environmentName}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatDeploymentTime(basicInfo.createdAt)}
                {commitDisplay && ` • ${commitDisplay}`}
              </p>
              <p className="text-xs text-gray-500 mt-1">{basicInfo.id}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className={`text-xs h-8 px-3 ${config.buttonClasses}`}
            onClick={handleViewLogs}
          >
            View logs
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={handleViewLogs}>
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
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AnimatePresence mode="sync">
        {showDetail && (
          <>
            {/* Background overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: showDetail ? 0 : 0.1 }}
              className="fixed inset-0 z-40 bg-black/10"
              onClick={handleCloseDetail}
            />

            {/* Service Detail Clone (appearing behind) */}
            <motion.div
              key="servicedetail-clone"
              initial="initial"
              animate="behind"
              exit="exit"
              variants={serviceDetailVariants}
              className="fixed right-0 top-0 bottom-0 w-2/3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-l-lg pointer-events-none"
              style={{ marginTop: '80px' }}
            />

            {/* Actual Deployment Detail */}
            <DeploymentItemDetail
              key="deployment-detail"
              deploymentId={deploymentId}
              onClose={handleCloseDetail}
              defaultTab={activeTab}
              renderSourceIcon={renderSourceIcon}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeploymentItem;
