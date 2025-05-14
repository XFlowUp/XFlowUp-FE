import React, { useState } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Deploy_Status, Service_Type_Enum } from '@/gql/graphql';
import { formatDistanceToNow, format } from 'date-fns';

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
  timeInfo: Date;
  commitHash?: string | null;
  branch?: string | null;
  avatar?: string | null;
  renderSourceIcon: () => React.ReactNode;
  serviceName: string;
}

// DeploymentItemDetail component
interface DeploymentItemDetailProps {
  deployment: DeploymentItemProps;
  onClose: () => void;
  defaultTab?: string;
}

const formatDeploymentTime = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};

const formatDateTimeStandard = (date: Date) => {
  return format(date, 'MMM d, yyyy h:mm a');
};

export const DeploymentItemDetail = ({
  deployment,
  onClose,
  defaultTab = 'details',
}: DeploymentItemDetailProps) => {
  const {
    source,
    status,
    environment,
    timeInfo,
    commitHash,
    branch,
    renderSourceIcon,
    serviceName,
  } = deployment;
  const statusConfig = {
    active: {
      backgroundClasses:
        'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/30',
      badgeClasses: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      label: 'ACTIVE',
      icon: <CheckCircle className="h-4 w-4 mr-1.5 text-green-600 dark:text-green-500" />,
    },
    deploying: {
      backgroundClasses: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/30',
      badgeClasses: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      label: 'DEPLOYING',
      icon: (
        <div className="h-4 w-4 mr-1.5 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
      ),
    },
    failed: {
      backgroundClasses: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/30',
      badgeClasses: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      label: 'FAILED',
      icon: (
        <div className="h-4 w-4 mr-1.5 text-red-600 dark:text-red-500 flex items-center justify-center">
          <X className="h-3 w-3" />
        </div>
      ),
    },
  };

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

  const commitDisplay = commitHash ? commitHash.substring(0, 6) : '';
  const config = statusConfig[status];

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
        style={{
          zIndex: 60,
        }}
      >
        <Tabs defaultValue={defaultTab} className="w-full h-full flex flex-col">
          <div className="px-6 md:px-12 pt-8 md:pt-12 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between w-full mb-3">
              <div className="flex items-center space-x-4">
                {renderSourceIcon()}
                <h1 className="text-[28px] font-semibold">
                  {serviceName}
                  {commitDisplay && (
                    <span className="text-lg font-normal text-gray-500 ml-2">
                      / {commitDisplay}
                    </span>
                  )}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-gray-500 text-sm">{formatDateTimeStandard(timeInfo)}</div>
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

            <div className="flex items-center space-x-4 mb-6">
              <Badge
                className={`px-2.5 py-1 text-xs font-medium inline-flex items-center ${config.badgeClasses}`}
              >
                {config.icon}
                {config.label}
              </Badge>
            </div>

            <TabsList className="mb-4 dark:bg-gray-900/50">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="buildLogs">Build Logs</TabsTrigger>
              <TabsTrigger value="deployLogs">Deploy Logs</TabsTrigger>
            </TabsList>
          </div>

          <div className="px-6 md:px-12 py-6 flex-grow overflow-auto">
            <TabsContent value="details" className="h-full space-y-4">
              <div className={`rounded-md p-4 ${statusConfig[status].backgroundClasses}`}>
                <h3 className="text-lg font-medium mb-4">Deployment Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-500">Environment:</span>
                    <span>{environment}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-500">Status:</span>
                    <span>
                      {status === 'active'
                        ? 'Active'
                        : status === 'deploying'
                          ? 'Deploying'
                          : 'Failed'}
                    </span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-500">Deployment Time:</span>
                    <span>{formatDateTimeStandard(timeInfo)}</span>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-500">Relative Time:</span>
                    <span>{formatDeploymentTime(timeInfo)}</span>
                  </div>
                  {commitHash && (
                    <div className="grid grid-cols-[140px_1fr] items-center">
                      <span className="text-gray-500">Commit:</span>
                      <span>{commitHash}</span>
                    </div>
                  )}
                  {branch && (
                    <div className="grid grid-cols-[140px_1fr] items-center">
                      <span className="text-gray-500">Branch:</span>
                      <span>{branch}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-[140px_1fr] items-center">
                    <span className="text-gray-500">Source:</span>
                    <span>{getNameService(source)}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="buildLogs" className="h-full">
              <div className="bg-gray-950 text-gray-300 p-4 rounded-md font-mono text-sm h-full overflow-auto dark:border dark:border-gray-800">
                <p className="opacity-60">$ Starting build process...</p>
                <p>Cloning repository...</p>
                <p>Installing dependencies...</p>
                <p>Running build script...</p>
                <p className="text-green-400">Build completed successfully.</p>
              </div>
            </TabsContent>

            <TabsContent value="deployLogs" className="h-full">
              <div className="bg-gray-950 text-gray-300 p-4 rounded-md font-mono text-sm h-full overflow-auto dark:border dark:border-gray-800">
                <p className="opacity-60">$ Starting deployment process...</p>
                <p>Preparing deployment packages...</p>
                <p>Uploading artifacts...</p>
                <p>Configuring environment...</p>
                <p>Starting service...</p>
                <p className="text-green-400">Deployment completed successfully.</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export const DeploymentItem = ({
  source,
  status,
  environment,
  timeInfo,
  commitHash,
  branch,
  avatar,
  renderSourceIcon,
  serviceName,
}: DeploymentItemProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('details');

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

  return (
    <>
      <div
        className={`flex items-center justify-between rounded-md h-full px-3 py-4 w-full select-none border ${config.backgroundClasses} cursor-pointer`}
        onClick={handleItemClick}
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
                {formatDeploymentTime(timeInfo)} via {getNameService(source)}
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
          <Button
            variant="outline"
            size="sm"
            className={`text-xs h-8 ${config.buttonClasses}`}
            onClick={handleViewLogs}
          >
            View logs
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={e => e.stopPropagation()}
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
              deployment={{
                source,
                status,
                environment,
                timeInfo,
                commitHash,
                branch,
                renderSourceIcon,
                serviceName,
              }}
              onClose={handleCloseDetail}
              defaultTab={activeTab}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeploymentItem;
