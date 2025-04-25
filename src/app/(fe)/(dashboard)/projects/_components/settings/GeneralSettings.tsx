'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useUpdateProjectDetails } from '@/shared/api/mutations/useProjectMutations';
import { useParams } from 'next/navigation';

interface ProjectDetail {
  name: string;
  description: string;
  slug: string;
}

interface ProjectForm {
  name: string;
  description: string;
  projectId: string;
}

interface GeneralSettingsProps {
  projectDetails: ProjectDetail | null;
}

export default function GeneralSettings({ projectDetails }: GeneralSettingsProps) {
  const params = useParams();
  const projectSlug = typeof params.slug === 'string' ? params.slug : '';
  const [form, setForm] = useState<ProjectForm>({
    name: '',
    description: '',
    projectId: '',
  });
  const [initialForm, setInitialForm] = useState<ProjectForm>({
    name: '',
    description: '',
    projectId: '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updateProject] = useUpdateProjectDetails(projectSlug, {
    name: form.name,
    description: form.description,
  });

  useEffect(() => {
    if (projectDetails) {
      const newFormData = {
        name: projectDetails.name,
        description: projectDetails.description || '',
        projectId: projectDetails.slug,
      };
      setForm(newFormData);
      setInitialForm(newFormData);
    }
  }, [projectDetails]);

  useEffect(() => {
    setIsDirty(form.name !== initialForm.name || form.description !== initialForm.description);
  }, [form, initialForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectSlug) {
      toast.error('Project slug is missing');
      return;
    }

    try {
      setIsSubmitting(true);

      const { data } = await updateProject();

      if (data?.update_project_details.__typename === 'UpdateProjectDetailsResultSuccess') {
        setInitialForm({ ...form });
        setIsDirty(false);
        toast.success('Project settings updated successfully');
      } else {
        const errorMessage =
          data?.update_project_details.__typename === 'UpdateProjectDetailsResultError'
            ? data.update_project_details.message
            : 'Failed to update project settings';

        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('An error occurred while updating project settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(form.projectId);
    toast.success('Project ID copied to clipboard');
  };

  if (!projectDetails) {
    return (
      <div className="p-8">
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">Failed to load project details</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Project Info</h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-[60%]">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full dark:bg-gray-900/60"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full dark:bg-gray-900/60"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="projectId" className="block text-sm font-medium">
            Project ID
          </label>
          <div className="relative">
            <Input
              id="projectId"
              name="projectId"
              value={form.projectId}
              readOnly
              className="w-full bg-gray-100 dark:bg-gray-800"
              disabled={isSubmitting}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={copyToClipboard}
              title="Copy to clipboard"
              disabled={isSubmitting}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={!isDirty || isSubmitting} className="transition-opacity">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
