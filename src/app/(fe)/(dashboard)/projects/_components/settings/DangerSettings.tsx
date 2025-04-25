import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import useAllServices from '@/shared/api/queries/useAllServices';
import { useDeleteProject } from '@/shared/api/mutations/useProjectMutations';
import { useDeleteService } from '@/shared/api/mutations/useServiceMutations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Service_Type_Enum } from '@/gql/graphql';

interface DangerSettingsProps {
  projectSlug?: string;
  projectName?: string;
}

export default function DangerSettings({ projectSlug, projectName }: DangerSettingsProps) {
  const params = useParams();
  const router = useRouter();
  const slug = projectSlug || (typeof params.slug === 'string' ? params.slug : '');

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingService, setIsDeletingService] = useState<Record<string, boolean>>({});

  const [isDeleteProjectDialogOpen, setIsDeleteProjectDialogOpen] = useState(false);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<{
    id: string | number;
    name: string;
  } | null>(null);

  const {
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
    refetch: refetchServices,
  } = useAllServices(slug);

  const [deleteProject] = useDeleteProject();
  const [deleteService] = useDeleteService();

  const services =
    servicesData?.get_all_services.__typename === 'GetAllServicesSuccessResult'
      ? servicesData.get_all_services.services
      : [];

  const openDeleteServiceDialog = (serviceId: number | string, serviceName: string) => {
    setServiceToDelete({ id: serviceId, name: serviceName });
  };

  const handleDeleteService = async (serviceId: number | string) => {
    const serviceIdKey = String(serviceId);
    const numericServiceId = typeof serviceId === 'string' ? parseFloat(serviceId) : serviceId;

    setIsDeletingService(prev => ({ ...prev, [serviceIdKey]: true }));

    try {
      const { data } = await deleteService({
        variables: {
          projectSlug: slug,
          serviceId: numericServiceId,
        },
      });

      if (data?.delete_service.__typename === 'DeleteServiceResultSuccess') {
        toast.success('Service deleted successfully');
        await refetchServices();
      } else {
        const errorMessage =
          data?.delete_service.__typename === 'DeleteServiceResultError'
            ? data.delete_service.message || 'Failed to delete service'
            : 'Failed to delete service';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service. Please try again.');
    } finally {
      setIsDeletingService(prev => ({ ...prev, [serviceIdKey]: false }));
      setServiceToDelete(null);
    }
  };

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    setIsDeletingProject(true);

    try {
      const { data } = await deleteProject({
        variables: { slug },
      });

      if (data?.delete_project.__typename === 'DeleteProjectSuccess') {
        toast.success('Project deleted successfully');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        const errorMessage =
          data?.delete_project.__typename === 'DeleteProjectError'
            ? data.delete_project.message
            : 'Failed to delete project';
        toast.error(errorMessage);
        setIsDeleting(false);
        setIsDeletingProject(false);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project. Please try again.');
      setIsDeleting(false);
      setIsDeletingProject(false);
    } finally {
      setIsDeleteProjectDialogOpen(false);
    }
  };

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return 'Never';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCurrentTitle = (type: string) => {
    switch (type) {
      case Service_Type_Enum.Database:
        return 'Database';
      case Service_Type_Enum.DockerImage:
        return 'Docker Image';
      case Service_Type_Enum.Functions:
        return 'Functions';
      case Service_Type_Enum.GithubRepo:
        return 'GitHub';
      default:
        return '';
    }
  };

  return (
    <div className="p-8 h-full overflow-auto">
      <div className="max-w-[60%]">
        <h2 className="text-2xl font-semibold mb-6">Manage Services</h2>

        <div className="mb-6 border border-red-300 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30 rounded-md p-4 flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">
            Deleting services from a project will permanently delete all data and deployments for
            that service in all environments.
          </p>
        </div>

        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">
                  Service Name
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">
                  Type
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">
                  Last Deployed
                </th>
                <th className="py-3 px-4 text-right font-medium text-gray-600 dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {servicesLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={`skeleton-${i}`} className="border-t">
                      <td className="py-4 px-4">
                        <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700/50" />
                      </td>
                      <td className="py-4 px-4">
                        <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700/50" />
                      </td>
                      <td className="py-4 px-4">
                        <Skeleton className="h-5 w-28 bg-gray-200 dark:bg-gray-700/50" />
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Skeleton className="h-9 w-20 ml-auto bg-gray-200 dark:bg-gray-700/50" />
                      </td>
                    </tr>
                  ))
              ) : servicesError ? (
                <tr className="border-t">
                  <td colSpan={4} className="py-4 px-4 text-center text-red-500">
                    Failed to load services. Please try again.
                  </td>
                </tr>
              ) : services && services.length > 0 ? (
                services.map(service => (
                  <tr key={service.id} className="border-t">
                    <td className="py-4 px-4 font-medium">{service.name}</td>
                    <td className="py-4 px-4">{getCurrentTitle(service.type)}</td>
                    <td className="py-4 px-4">{formatDate(service.lastDeploymentDate)}</td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!!isDeletingService[String(service.id)]}
                        onClick={() => openDeleteServiceDialog(service.id, service.name)}
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 
                                  dark:border-red-900/30 dark:text-red-400 dark:bg-transparent 
                                  dark:hover:bg-red-950/40 dark:hover:text-red-300"
                      >
                        {isDeletingService[String(service.id)] ? (
                          <>
                            <Loader className="h-3 w-3 mr-2 animate-spin" />
                            <span>Deleting...</span>
                          </>
                        ) : (
                          'Delete'
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-t">
                  <td colSpan={4} className="py-6 px-4 text-center text-gray-500">
                    No services found for this project.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Delete Project</h2>

        <div className="mb-6 border border-red-300 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30 rounded-md p-4 flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">
            Deleting the project will permanently delete all data stored in the project plugins for
            all environments. This can't be undone.
          </p>
        </div>

        <Button
          variant="destructive"
          size="default"
          disabled={isDeleting}
          onClick={() => setIsDeleteProjectDialogOpen(true)}
          className="mt-2 mb-12"
        >
          {isDeletingProject ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              <span>Deleting...</span>
            </>
          ) : (
            'Delete Project'
          )}
        </Button>
      </div>

      <AlertDialog open={isDeleteProjectDialogOpen} onOpenChange={setIsDeleteProjectDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This will permanently delete the project{' '}
              <span className="font-semibold">{projectName}</span> and all associated data. All
              services, environments, and deployments will be removed and this action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              className="dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            >
              {isDeleting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                'Delete Project'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={serviceToDelete !== null}
        onOpenChange={open => !open && setServiceToDelete(null)}
      >
        <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete service?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This will permanently delete the service{' '}
              <span className="font-semibold">{serviceToDelete?.name}</span> and all of its data.
              All deployments in all environments will be removed and this action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={!!serviceToDelete && !!isDeletingService[String(serviceToDelete.id)]}
              className="dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => serviceToDelete && handleDeleteService(serviceToDelete.id)}
              disabled={!!serviceToDelete && !!isDeletingService[String(serviceToDelete.id)]}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            >
              {serviceToDelete && isDeletingService[String(serviceToDelete.id)] ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                'Delete Service'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
