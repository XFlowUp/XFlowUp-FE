import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { useParams } from 'next/navigation';
import { Service_Type_Enum, CreateNewServiceInput } from '@/gql/graphql';
import { useCreateService } from '@/shared/api/mutations/useServiceMutations';
import { toast } from 'sonner';
import { useEnvironment } from './EnvironmentContext';
import { ServiceNodeData } from './ServiceNode';

interface GithubRepositoryFormProps {
  repository: any;
  onSubmit: (serviceData: ServiceNodeData) => void;
}

export default function GithubRepositoryForm({ repository, onSubmit }: GithubRepositoryFormProps) {
  const params = useParams();
  const projectSlug = typeof params.slug === 'string' ? params.slug : '';

  const { selectedEnvironmentId, loading: envLoading } = useEnvironment();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    branch: 'main',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createService] = useCreateService({} as CreateNewServiceInput);

  useEffect(() => {
    if (repository && repository.name) {
      setFormData(prev => ({
        ...prev,
        name: repository.name,
      }));
    }
  }, [repository]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast.error('Please fill in both name and description');
      return;
    }

    if (!formData.branch) {
      toast.error('Branch name is required for GitHub repositories');
      return;
    }

    if (!selectedEnvironmentId) {
      toast.error('Please select an environment first');
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceInput: CreateNewServiceInput = {
        name: formData.name,
        description: formData.description,
        branch: formData.branch,
        repository: repository.git_url || repository.url,
        projectSlug: projectSlug,
        serviceType: Service_Type_Enum.GithubRepo,
        environmentId: parseInt(selectedEnvironmentId, 10),
      };

      const response = await createService({
        variables: {
          input: serviceInput,
        },
      });

      const result = response.data?.create_service;
      if (result?.__typename === 'CreateNewServiceSuccessResult') {
        const serviceData: ServiceNodeData = {
          title: formData.name,
          description: repository.name || formData.name,
          source: 'GitHub',
          timeAgo: 'just now',
        };

        onSubmit(serviceData);

        toast.success('Service created successfully!');
      } else if (result?.__typename === 'CreateNewServiceErrorResult') {
        throw new Error(result.message || 'Failed to create service');
      } else {
        throw new Error('Unknown error occurred');
      }
    } catch (error: any) {
      console.error('Error creating service:', error);
      toast.error(error.message || 'An error occurred while creating the service');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 overflow-y-auto flex-grow">
        <motion.div
          className="mb-4 flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <IoLogoGithub size={24} className="text-gray-900 dark:text-white" />
          <div className="text-base font-medium">{repository.name}</div>
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              repository.is_private
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            }`}
          >
            {repository.is_private ? 'Private' : 'Public'}
          </span>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter service name"
                className="h-10 dark:border-gray-600 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe this service"
                className="min-h-[60px] resize-none dark:border-gray-600 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="main"
                className="h-10 dark:border-gray-600 dark:focus:border-blue-500"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Branch to be used for service deployment
              </p>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                disabled={isSubmitting || envLoading}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  'Create Service'
                )}
              </Button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
