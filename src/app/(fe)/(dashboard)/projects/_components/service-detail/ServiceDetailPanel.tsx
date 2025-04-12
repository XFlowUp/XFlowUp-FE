'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Database, Package, Code, Globe, Loader2 } from 'lucide-react';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Service_Type_Enum } from '@/gql/graphql';
import { formatDistanceToNow } from 'date-fns';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import useDeploymentsHistory from '@/shared/api/queries/useDeploymentsHistory';
import { useRequestDeployment } from '@/shared/api/mutations/useRequestDeploymentMutations';
import { useEnvironment } from '../EnvironmentContext';

import DeploymentItem, { mapApiStatusToUiStatus } from './DeploymentItem';
import VariablesSection from './VariablesSection';
import MetricsSection from './MetricsSection';
import SettingsSection from './SettingsSection';

interface ServiceDetailPanelProps {
  service: Record<string, any> | null;
  onClose: () => void;
}

const ServiceDetailPanel = ({ service, onClose }: ServiceDetailPanelProps) => {
  const params = useParams();
  const projectSlug = typeof params.slug === 'string' ? params.slug : '';
  const serviceId = service?.id ? parseFloat(service.id as string) : 0;
  const [page, setPage] = useState(1);
  const [allDeployments, setAllDeployments] = useState<any[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const perPage = 10;

  const {
    data: deploymentsData,
    loading: deploymentsLoading,
    error: deploymentsError,
    fetchMore,
    refetch: refetchDeployments,
  } = useDeploymentsHistory(projectSlug, serviceId, 1, perPage, !!service);

  const { selectedEnvironmentId } = useEnvironment();

  const [requestDeployment] = useRequestDeployment(
    projectSlug,
    serviceId,
    parseInt(selectedEnvironmentId || '0')
  );

  useEffect(() => {
    if (deploymentsData?.deployments_history.__typename === 'DeploymentHistorySuccessResult') {
      const newDeployments = deploymentsData.deployments_history.data;
      setAllDeployments(newDeployments);

      if (newDeployments.length < perPage) {
        setHasMoreData(false);
      } else {
        setHasMoreData(true);
      }
    }
  }, [deploymentsData]);

  const handleDeployment = async () => {
    if (!service || isDeploying) return;

    try {
      setIsDeploying(true);
      const { data } = await requestDeployment();

      if (data?.request_deployment.__typename === 'DeploymentRequestSuccessResult') {
        toast.success('Deployment requested successfully');
        await refetchDeployments();
      } else if (data?.request_deployment.__typename === 'DeploymentRequestErrorResult') {
        toast.error(data.request_deployment.message || 'Failed to request deployment');
      }
    } catch (error) {
      console.error('Deployment request error:', error);
      toast.error('An error occurred while requesting deployment');
    } finally {
      setIsDeploying(false);
    }
  };

  const loadMoreDeployments = async () => {
    if (!hasMoreData || isFetchingNextPage || deploymentsLoading) return;

    try {
      setIsFetchingNextPage(true);
      const nextPage = page + 1;

      const { data: newData } = await fetchMore({
        variables: {
          page: nextPage,
          perPage: perPage,
          projectSlug,
          serviceId,
        },
      });

      if (newData?.deployments_history.__typename === 'DeploymentHistorySuccessResult') {
        const newDeployments = newData.deployments_history.data;

        if (newDeployments.length < perPage) {
          setHasMoreData(false);
        }

        setAllDeployments(prev => [...prev, ...newDeployments]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more deployments:', error);
    } finally {
      setIsFetchingNextPage(false);
    }
  };

  useEffect(() => {
    if (!scrollContainerRef.current || !hasMoreData) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isFetchingNextPage && !deploymentsLoading) {
        loadMoreDeployments();
      }
    }, options);

    const sentinel = document.getElementById('deployments-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMoreData, isFetchingNextPage, deploymentsLoading]);

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

  const formatDeploymentTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

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

  const renderDeploymentsContent = () => {
    if (deploymentsLoading) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mt-4">
          {[1, 2, 3, 4, 5].map(item => (
            <motion.div
              key={item}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: item * 0.1,
                ease: 'easeOut',
              }}
            >
              <div className="flex items-center justify-between rounded-md h-full px-3 py-4 w-full select-none border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-[100px_1fr] items-center">
                  <div className="mr-4">
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      );
    }

    if (deploymentsError) {
      return (
        <div className="flex items-center justify-center py-10">
          <div className="flex flex-col items-center text-center">
            <p className="text-red-500 mb-2">Failed to load deployment history</p>
            <p className="text-sm text-gray-500">Please try again later</p>
          </div>
        </div>
      );
    }

    if (!allDeployments || allDeployments.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="flex flex-col items-center text-center mb-6">
            <p className="text-gray-500 mb-2">No deployment history found</p>
            <p className="text-sm text-gray-500">Deploy this service to see history</p>
          </div>
          <Button
            onClick={handleDeployment}
            disabled={isDeploying}
            className="flex items-center gap-2"
          >
            {isDeploying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Requesting Deployment...
              </>
            ) : (
              <>
                <Code className="h-4 w-4" />
                Deploy
              </>
            )}
          </Button>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 mt-4"
        ref={scrollContainerRef}
      >
        {allDeployments.map((deployment, index) => (
          <motion.div
            key={deployment.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: Math.min(index * 0.05, 0.5),
              ease: 'easeOut',
            }}
          >
            <DeploymentItem
              status={mapApiStatusToUiStatus(deployment.status)}
              environment={deployment.branch || 'Unknown'}
              timeInfo={formatDeploymentTime(new Date(deployment.createdAt))}
              commitHash={deployment.commitHash}
              branch={deployment.branch}
            />
          </motion.div>
        ))}

        {/* Sentinel element for infinite scroll detection */}
        <div id="deployments-sentinel" className="h-4 w-full"></div>

        {/* Loading indicator for next page */}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </motion.div>
    );
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
                  {renderDeploymentsContent()}
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
