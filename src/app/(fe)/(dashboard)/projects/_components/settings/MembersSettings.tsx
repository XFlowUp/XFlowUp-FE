'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Check, User, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/shared/lib/utils';
import useTeamMembers from '@/shared/api/queries/useTeamMembers';
import {
  useAddTeamMember,
  useRemoveTeamMember,
} from '@/shared/api/mutations/useTeamMembersMutation';
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoadingDots } from '@/components/ui/loading-spinner';
import { User_In_Team_Status } from '@/gql/graphql';
import { AiOutlineLoading3Quarters } from '@react-icons/all-files/ai/AiOutlineLoading3Quarters';
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
import { useAuthStore } from '@/shared/stores/auth';

enum ProjectPermission {
  OWNER = 1,
  READ = 2,
  MANAGE_SERVICE = 3,
  MANAGE_ENVIRONMENT = 4,
  MANAGE_DEPLOYMENT = 5,
  MANAGE_USER = 6,
  MANAGE_PROJECT = 7,
}

const permissionLabels: Record<ProjectPermission, string> = {
  [ProjectPermission.OWNER]: 'Owner',
  [ProjectPermission.READ]: 'Read Only',
  [ProjectPermission.MANAGE_SERVICE]: 'Manage Services',
  [ProjectPermission.MANAGE_ENVIRONMENT]: 'Manage Environments',
  [ProjectPermission.MANAGE_DEPLOYMENT]: 'Manage Deployments',
  [ProjectPermission.MANAGE_USER]: 'Manage Users',
  [ProjectPermission.MANAGE_PROJECT]: 'Manage Project',
};

interface Member {
  name: string;
  email: string;
  profile_url?: string | null;
  permissions?: ProjectPermission[];
  status?: User_In_Team_Status;
}

interface InviteForm {
  email: string;
  permissions: ProjectPermission[];
}

interface MembersSettingsProps {
  projectSlug?: string;
}

export default function MembersSettings({ projectSlug }: MembersSettingsProps) {
  const [form, setForm] = useState<InviteForm>({
    email: '',
    permissions: [ProjectPermission.READ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [refetchLoading, setRefetchLoading] = useState(false);

  const {
    data: teamMembersData,
    loading: teamMembersLoading,
    error: teamMembersError,
    refetch: refetchTeamMembers,
  } = useTeamMembers(projectSlug || '');

  const [addTeamMember, { error: addMemberError }] = useAddTeamMember();
  const [removeTeamMember, { loading: removeLoading }] = useRemoveTeamMember();

  const { user } = useAuthStore();

  useEffect(() => {
    if (addMemberError) {
      toast.error(`Error inviting member: ${addMemberError.message || 'Unknown error'}`);
      setIsSubmitting(false);
    }
  }, [addMemberError]);

  useEffect(() => {
    if (teamMembersError) {
      toast.error(`Error loading team members: ${teamMembersError.message || 'Unknown error'}`);
    }
  }, [teamMembersError]);

  useEffect(() => {
    if (
      teamMembersData?.team_members.__typename === 'GetTeamSuccess' &&
      teamMembersData.team_members.team?.members?.length > 0
    ) {
      try {
        const memberData = teamMembersData.team_members.team.members.map(member => ({
          ...member,
        }));
        setMembers(memberData);
      } catch (error) {
        console.error('Error processing team members data:', error);
      }
    }
  }, [teamMembersData]);

  const formatPermissions = (permissions?: ProjectPermission[]): string => {
    if (!permissions || permissions.length === 0) return 'None';
    return permissions.map(p => permissionLabels[p]).join(', ');
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = isValidEmail(form.email) && form.permissions.length > 0;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, email: e.target.value }));
  };

  const handlePermissionToggle = (permission: ProjectPermission) => {
    setForm(prev => {
      if (prev.permissions.includes(permission)) {
        return {
          ...prev,
          permissions: prev.permissions.filter(p => p !== permission),
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permission],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid || !projectSlug) {
      toast.error('Please enter a valid email and select at least one permission.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await addTeamMember({
        variables: {
          projectSlug,
          member: {
            email: form.email,
            permissions: form.permissions.map(p => Number(p)),
          },
        },
      });

      const result = response.data?.add_team_member;

      if (result?.__typename === 'AddTeamMemberSuccessResult') {
        toast.success(`Invited ${form.email} to the project`);

        try {
          setRefetchLoading(true);
          await refetchTeamMembers();
        } catch (refetchError) {
          console.error('Error refreshing team members:', refetchError);
        } finally {
          setRefetchLoading(false);
        }

        setForm({
          email: '',
          permissions: [ProjectPermission.READ],
        });
      } else if (result?.__typename === 'AddTeamMemberErrorResult') {
        const errorMessage = result.message || 'Unknown error';
        toast.error(`Error inviting member: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Error inviting user:', error);
      const errorMessage = error.message || 'Unknown error';
      toast.error(`Error inviting member: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmRemove = (member: Member) => {
    setMemberToDelete(member);
    setIsAlertOpen(true);
  };

  const handleRemoveMember = async () => {
    if (!projectSlug || !memberToDelete) return;

    setIsAlertOpen(false);
    setRemovingEmail(memberToDelete.email);

    try {
      const response = await removeTeamMember({
        variables: {
          projectSlug,
          email: memberToDelete.email,
        },
      });

      const result = response.data?.remove_team_member;

      if (result?.__typename === 'RemoveTeamMemberResultSuccess') {
        toast.success(`Removed ${memberToDelete.email} from the project`);
        try {
          setRefetchLoading(true);
          await refetchTeamMembers();
        } catch (error) {
          console.error('Error refreshing team members:', error);
        } finally {
          setRefetchLoading(false);
        }
      } else if (result?.__typename === 'RemoveTeamMemberResultError') {
        const errorMessage = result.message || 'Unknown error';
        toast.error(`Error removing member: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Error removing user:', error);
      const errorMessage = error.message || 'Unknown error';
      toast.error(`Error removing member: ${errorMessage}`);
    } finally {
      setRemovingEmail(null);
      setMemberToDelete(null);
    }
  };

  const canManageMembers = () => {
    const currentUserPermissions = members.find(m => m.email === user?.email)?.permissions || [];
    return (
      currentUserPermissions.includes(ProjectPermission.OWNER) ||
      currentUserPermissions.includes(ProjectPermission.MANAGE_USER)
    );
  };

  return (
    <div className="p-8">
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-background border border-border dark:bg-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to remove this member?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action will remove <span className="font-medium">{memberToDelete?.email}</span>{' '}
              from the project and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-800 dark:hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="default"
                className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
                onClick={handleRemoveMember}
              >
                {removingEmail ? (
                  <>
                    <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin mr-2" />
                    <span>Removing...</span>
                  </>
                ) : (
                  'Remove'
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h2 className="text-2xl font-semibold mb-6">Invite Member</h2>

      <form onSubmit={handleSubmit} className="max-w-[60%]">
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleEmailChange}
              placeholder="member@example.com"
              className="dark:bg-gray-900/60 h-9"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="flex-1 space-y-2">
            <label htmlFor="permissions" className="block text-sm font-medium">
              Permissions
            </label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="permissions"
                  variant="outline"
                  role="combobox"
                  aria-expanded={isOpen}
                  className="w-full justify-between h-9 dark:bg-gray-900/60"
                  disabled={isSubmitting}
                >
                  {form.permissions.length > 0
                    ? `${form.permissions.length} selected`
                    : 'Select permissions'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4 shrink-0 opacity-50"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <div className="max-h-[300px] overflow-auto py-1">
                  {Object.entries(permissionLabels).map(([value, label]) => {
                    const permission = Number(value) as ProjectPermission;
                    if (permission === ProjectPermission.OWNER) return null;

                    const isSelected = form.permissions.includes(permission);
                    return (
                      <div
                        key={value}
                        className={cn(
                          'flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800',
                          isSelected && 'bg-gray-50 dark:bg-gray-900'
                        )}
                        onClick={() => handlePermissionToggle(permission)}
                      >
                        <div className="w-5 h-5 border rounded flex items-center justify-center mr-2">
                          {isSelected && <Check className="h-3.5 w-3.5" />}
                        </div>
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col justify-end h-9">
            <Button type="submit" disabled={!isFormValid || isSubmitting} className="h-9">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                  <span>Inviting...</span>
                </span>
              ) : (
                'Invite'
              )}
            </Button>
          </div>
        </div>

        {form.permissions.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Selected permissions:
              <span className="ml-1">
                {form.permissions.map(p => permissionLabels[p]).join(', ')}
              </span>
            </p>
          </div>
        )}
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Project Members</h2>

        {teamMembersLoading || refetchLoading ? (
          <div className="border rounded-md p-8 max-w-[60%] flex items-center justify-center">
            <LoadingDots size="md" color="primary" text="Loading team members..." />
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden max-w-[60%]">
            {members.length === 0 ? (
              <div className="py-8 px-4 text-center text-gray-500">
                No members found for this project.
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">
                      Permissions
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <UIAvatar className="h-10 w-10">
                            <AvatarImage src={member.profile_url || undefined} alt={member.name} />
                            <AvatarFallback className="bg-primary/10">
                              {member.name?.charAt(0)?.toUpperCase() || (
                                <User className="h-5 w-5" />
                              )}
                            </AvatarFallback>
                          </UIAvatar>
                          <div className="ml-3">
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-700 dark:text-gray-300">
                          {formatPermissions(member.permissions)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.status === User_In_Team_Status.Accepted
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : member.status === User_In_Team_Status.Pending
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                          }`}
                        >
                          {member.status || 'unknown'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {canManageMembers() &&
                          !member.permissions?.includes(ProjectPermission.OWNER) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                              disabled={removingEmail === member.email}
                              onClick={() => confirmRemove(member)}
                            >
                              {removingEmail === member.email ? (
                                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin mr-1" />
                              ) : (
                                <Trash2 className="h-4 w-4 mr-1" />
                              )}
                              Remove
                            </Button>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
