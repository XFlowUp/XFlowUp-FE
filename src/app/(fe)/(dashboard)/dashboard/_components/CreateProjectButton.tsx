import { useState } from 'react';
import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import { AiOutlineLoading3Quarters } from '@react-icons/all-files/ai/AiOutlineLoading3Quarters';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProject } from '@/shared/api/mutations/useProjectMutations';
import { toast } from 'sonner';

interface CreateProjectButtonProps {
  onProjectCreated?: () => void;
}

export default function CreateProjectButton({ onProjectCreated }: CreateProjectButtonProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [createProject, { loading }] = useCreateProject();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createProject({
        variables: {
          name: formData.name,
          description: formData.description || undefined,
        },
      });

      const result = response.data?.create_project;

      if (result?.__typename === 'CreateProjectSuccess') {
        toast.success(`Project ${result.data.name} has been created`);
        setFormData({ name: '', description: '' });
        setOpen(false);

        if (onProjectCreated) {
          onProjectCreated();
        }
      } else if (result?.__typename === 'CreateProjectError') {
        toast.error(result.message || 'Failed to create project');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Create project error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <IoMdAdd /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-[380px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Fill in the form below to create a new project.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              className="col-span-3"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={!formData.name.trim() || loading}>
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
