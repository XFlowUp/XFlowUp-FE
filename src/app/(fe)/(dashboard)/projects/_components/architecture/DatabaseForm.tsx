import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Service_Type_Enum, CreateNewServiceInput } from '@/gql/graphql';
import { useCreateService } from '@/shared/api/mutations/useServiceMutations';
import { toast } from 'sonner';
import { ServiceNodeData } from './ServiceNode';
import { useEnvironment } from '../EnvironmentContext';

interface DatabaseFormProps {
  onSubmit: (serviceData: ServiceNodeData) => void;
  database?: any;
}

export default function DatabaseForm({ onSubmit, database }: DatabaseFormProps) {
  const params = useParams();
  const projectSlug = typeof params.slug === 'string' ? params.slug : '';

  const { selectedEnvironmentId, loading: envLoading } = useEnvironment();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createService] = useCreateService({} as CreateNewServiceInput);

  useEffect(() => {
    if (database) {
      setFormData(prev => ({
        ...prev,
        name: database.name || '',
      }));
    }
  }, [database]);

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

    if (!selectedEnvironmentId) {
      toast.error('Please select an environment first');
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceInput: CreateNewServiceInput = {
        name: formData.name,
        description: formData.description,
        projectSlug: projectSlug,
        serviceType: Service_Type_Enum.Database,
        environmentId: parseInt(selectedEnvironmentId, 10),
        ...(database?.id && { database_service_id: parseInt(database.id, 10) }),
      };

      const response = await createService({
        variables: {
          input: serviceInput,
        },
      });

      const result = response.data?.create_service;
      if (result?.__typename === 'CreateNewServiceSuccessResult') {
        const serviceData: ServiceNodeData = {
          id: result.data.id,
          title: formData.name,
          description: formData.description,
          source: Service_Type_Enum.Database,
          timeAgo: 'just now',
        };

        onSubmit(serviceData);

        toast.success('Database service created successfully!');
      } else if (result?.__typename === 'CreateNewServiceErrorResult') {
        throw new Error(result.message || 'Failed to create database service');
      } else {
        throw new Error('Unknown error occurred');
      }
    } catch (error: any) {
      console.error('Error creating service:', error);
      toast.error(error.message || 'An error occurred while creating the database service');
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
          <Database size={24} className="text-blue-600 dark:text-blue-400" />
          <div className="text-base font-medium">{database ? database.name : 'New Database'}</div>
          {database && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {database.type || 'Database'}
            </span>
          )}
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Database Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter database name"
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
                placeholder="Describe this database"
                className="min-h-[60px] resize-none dark:border-gray-600 dark:focus:border-blue-500"
                required
              />
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
                  'Create Database'
                )}
              </Button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
