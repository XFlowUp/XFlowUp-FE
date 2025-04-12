'use client';

import { X, Settings, Database, Package, Code, CheckCircle, Globe } from 'lucide-react';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Service_Type_Enum } from '@/gql/graphql';
import { Badge } from '@/components/ui/badge';
import React from 'react';

interface ServiceDetailPanelProps {
  service: Record<string, any> | null;
  onClose: () => void;
}

// Status badge variants
type DeploymentStatus = 'active' | 'deploying' | 'failed';

// Deployment item component
interface DeploymentItemProps {
  status: DeploymentStatus;
  environment: string;
  timeInfo: string;
}

const DeploymentItem = ({ status, environment, timeInfo }: DeploymentItemProps) => {
  // Configuration based on status
  const statusConfig = {
    active: {
      icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />,
      label: 'ACTIVE',
      badgeClasses: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    },
    deploying: {
      icon: (
        <div className="h-5 w-5 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
      ),
      label: 'DEPLOYING',
      badgeClasses: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    },
    failed: {
      icon: (
        <div className="h-5 w-5 text-red-600 dark:text-red-500 flex items-center justify-center">
          <X className="h-4 w-4" />
        </div>
      ),
      label: 'FAILED',
      badgeClasses: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    },
  };

  const config = statusConfig[status];

  return (
    <div className="border rounded-md p-4 bg-white dark:bg-gray-900 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {config.icon}
        <div>
          <h4 className="font-medium">{environment}</h4>
          <p className="text-sm text-gray-500">{timeInfo}</p>
        </div>
      </div>
      <Badge className={`px-2 py-1 text-xs font-medium ${config.badgeClasses}`}>
        {config.label}
      </Badge>
    </div>
  );
};

// Variables section component
const VariablesSection = ({
  variables = [
    { key: 'PORT', value: '3000' },
    { key: 'NODE_ENV', value: 'production' },
  ],
}) => (
  <div className="space-y-4">
    <div className="border rounded-md p-4 bg-white dark:bg-gray-900">
      <h3 className="font-medium mb-2">Environment Variables</h3>
      <p className="text-sm text-gray-500 mb-4">
        Securely manage your service's environment variables.
      </p>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="font-medium text-gray-500">KEY</div>
        <div className="col-span-2 font-medium text-gray-500">VALUE</div>
        {variables.map((variable, index) => (
          <React.Fragment key={index}>
            <div>{variable.key}</div>
            <div className="col-span-2">{variable.value}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
    <Button className="w-full">Add Variable</Button>
  </div>
);

// Metrics section component
const MetricsSection = () => (
  <div className="space-y-4">
    <div className="border rounded-md p-4 bg-white dark:bg-gray-900">
      <h3 className="font-medium mb-2">Service Metrics</h3>
      <p className="text-sm text-gray-500">Monitor your service's performance metrics.</p>
      <div className="h-40 mt-4 flex items-center justify-center border border-dashed rounded-md">
        <p className="text-gray-500">Service metrics visualization</p>
      </div>
    </div>
  </div>
);

// Settings section component
interface SettingsSectionProps {
  serviceName: string;
}

const SettingsSection = ({ serviceName }: SettingsSectionProps) => (
  <div className="space-y-4">
    <div className="border rounded-md p-4 bg-white dark:bg-gray-900">
      <h3 className="font-medium mb-2">Service Settings</h3>
      <p className="text-sm text-gray-500 mb-4">Configure your service settings.</p>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Service Name</h4>
          <p className="text-sm">{serviceName}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Scaling</h4>
          <p className="text-sm">Auto-scale: Enabled</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Region</h4>
          <p className="text-sm">US East (Ohio)</p>
        </div>
      </div>
    </div>
    <Button className="w-full" variant="outline">
      Edit Settings
    </Button>
    <Button className="w-full" variant="destructive">
      Delete Service
    </Button>
  </div>
);

const sourceDisplayNames = {
  [Service_Type_Enum.Database]: 'Database',
  [Service_Type_Enum.DockerImage]: 'Docker Image',
  [Service_Type_Enum.GithubRepo]: 'GitHub',
  [Service_Type_Enum.Functions]: 'Cloud Functions',
};

const ServiceDetailPanel = ({ service, onClose }: ServiceDetailPanelProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (service) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [service]);

  const renderSourceIcon = () => {
    if (!service) return null;

    switch (service.source) {
      case Service_Type_Enum.Database:
        return <Database size={32} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />;
      case Service_Type_Enum.DockerImage:
        return <Package size={32} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />;
      case Service_Type_Enum.GithubRepo:
        return <IoLogoGithub size={32} className="text-gray-900 dark:text-white flex-shrink-0" />;
      case Service_Type_Enum.Functions:
        return <Code size={32} className="text-green-600 dark:text-green-400 flex-shrink-0" />;
      default:
        return <Settings size={32} className="text-gray-900 dark:text-white flex-shrink-0" />;
    }
  };

  const getSourceDisplayName = () => {
    if (!service) return '';
    return sourceDisplayNames[service.source as Service_Type_Enum] || service.source;
  };

  // Animation variants
  const panelVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={panelVariants}
          className="fixed right-0 top-0 bottom-0 w-2/3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-10 rounded-l-lg"
          style={{ marginTop: '80px' }}
        >
          <Tabs defaultValue="deployments" className="w-full">
            <div className="px-6 md:px-12 pt-8 md:pt-12 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between w-full mb-6">
                <div className="flex items-center space-x-4">
                  {renderSourceIcon()}
                  <h1 className="text-[28px] font-semibold">{service.title}</h1>
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

              <TabsList className="mb-4 dark:bg-gray-900/50">
                <TabsTrigger value="deployments">Deployments</TabsTrigger>
                <TabsTrigger value="variables">Variables</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>

            <div className="px-6 md:px-12 py-6">
              <TabsContent value="deployments" className="h-full">
                <div className="flex flex-col gap-y-4 pb-8">
                  <div className="flex gap-x-2 items-center text-sm">
                    <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />{' '}
                    <span>xflowup.quanganh.me</span>
                  </div>
                  <div className="space-y-4 mt-4">
                    <DeploymentItem
                      status="active"
                      environment="Production"
                      timeInfo="Deployed 2 hours ago"
                    />
                    <DeploymentItem
                      status="deploying"
                      environment="Staging"
                      timeInfo="Started 5 minutes ago"
                    />
                    <DeploymentItem
                      status="failed"
                      environment="Development"
                      timeInfo="Failed 1 day ago"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="variables" className="space-y-4">
                <VariablesSection />
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                <MetricsSection />
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <SettingsSection serviceName={service.title} />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailPanel;
