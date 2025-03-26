import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateEnvironment } from '@/shared/api/mutations/useEnvironmentMutation';
import { AiOutlineLoading3Quarters } from '@react-icons/all-files/ai/AiOutlineLoading3Quarters';
import { toast } from 'sonner';

export interface CreateEnvironmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slug: string;
  onSuccess: () => void;
}

const CreateEnvironmentDialog = ({
  open,
  onOpenChange,
  slug,
  onSuccess,
}: CreateEnvironmentDialogProps) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [createEnvironment] = useCreateEnvironment();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      const result = await createEnvironment({
        variables: {
          projectSlug: slug,
          environment: {
            name: formData.name.trim(),
            description: formData.description.trim() || undefined,
          },
        },
      });

      if (result.data?.add_environment.__typename === 'AddEnvironmentsSuccess') {
        toast.success('New environment created successfully');
        setFormData({ name: '', description: '' });
        onOpenChange(false);
        onSuccess();
      } else if (result.data?.add_environment.__typename === 'AddEnvironmentsError') {
        toast.error(
          `Error: ${result.data.add_environment.message || 'Could not create environment'}`
        );
      }
    } catch (error) {
      toast.error('An error occurred while creating a new environment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col w-[380px]">
        <DialogHeader>
          <DialogTitle>Create New Environment</DialogTitle>
          <DialogDescription>Fill in the form below to create a new environment.</DialogDescription>
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
              placeholder="Enter environment name"
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
              placeholder="Enter environment description"
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
};

export default CreateEnvironmentDialog;
