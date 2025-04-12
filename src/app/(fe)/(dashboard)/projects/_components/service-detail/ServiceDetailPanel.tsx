'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Database, Package, Code, Globe } from 'lucide-react';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Service_Type_Enum } from '@/gql/graphql';

// Import smaller components
import DeploymentItem from './DeploymentItem';
import VariablesSection from './VariablesSection';
import MetricsSection from './MetricsSection';
import SettingsSection from './SettingsSection';

interface ServiceDetailPanelProps {
  service: Record<string, any> | null;
  onClose: () => void;
}

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
                <div className="flex flex-col pb-8">
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
