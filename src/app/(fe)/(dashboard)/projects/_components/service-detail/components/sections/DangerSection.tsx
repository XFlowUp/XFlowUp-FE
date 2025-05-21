import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
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

interface DangerSectionProps {
  serviceId: number | string;
  serviceName: string;
  projectSlug: string;
  onServiceDeleted?: () => void;
}

export const DangerSection: React.FC<DangerSectionProps> = ({
  serviceId,
  serviceName,
  projectSlug,
  onServiceDeleted,
}) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteService] = useDeleteService();

  const handleDeleteService = async () => {
    setIsDeleting(true);

    try {
      const numericServiceId = typeof serviceId === 'string' ? parseFloat(serviceId) : serviceId;

      const { data } = await deleteService({
        variables: {
          projectSlug,
          serviceId: numericServiceId,
        },
      });

      if (data?.delete_service.__typename === 'DeleteServiceResultSuccess') {
        toast.success('Service deleted successfully');
        if (onServiceDeleted) {
          onServiceDeleted();
        }
        setTimeout(() => {
          router.push(`/projects/${projectSlug}`);
        }, 1000);
      } else {
        const errorMessage =
          data?.delete_service.__typename === 'DeleteServiceResultError'
            ? data.delete_service.message || 'Failed to delete service'
            : 'Failed to delete service';
        toast.error(errorMessage);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service. Please try again.');
      setIsDeleting(false);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-red-500/80 dark:text-red-400">
        Deleting this service will <span className="font-bold">permanently delete</span> all its
        deployments and remove it from <span className="font-bold">this environment</span>. This
        cannot be undone.
      </p>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setIsDeleteDialogOpen(true)}
        disabled={isDeleting}
        className="transition-colors hover:bg-red-700 dark:hover:bg-red-800"
      >
        {isDeleting ? (
          <>
            <Loader className="h-3 w-3 mr-2 animate-spin" />
            <span>Deleting...</span>
          </>
        ) : (
          'Delete service'
        )}
      </Button>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete service?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This action will permanently delete the service{' '}
              <span className="font-semibold">{serviceName}</span> and all its data. All deployments
              across all environments will be deleted and cannot be recovered.
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
              onClick={handleDeleteService}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
            >
              {isDeleting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                'Delete service'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
