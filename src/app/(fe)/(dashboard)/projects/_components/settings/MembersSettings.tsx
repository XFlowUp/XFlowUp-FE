'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Check, User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/shared/lib/utils';
import useTeamMembers from '@/shared/api/queries/useTeamMembers';
import { useAddTeamMember } from '@/shared/api/mutations/useTeamMembersMutation';
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoadingSpinner, LoadingDots } from '@/components/ui/loading-spinner';

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

  const {
    data: teamMembersData,
    loading: teamMembersLoading,
    error: teamMembersError,
  } = useTeamMembers(projectSlug || '');

  const [addTeamMember, { error: addMemberError }] = useAddTeamMember();

  const [inviteError, setInviteError] = useState<string | null>(null);

  useEffect(() => {
    if (addMemberError) {
      setInviteError(addMemberError.message || 'Unknown error occurred');
      setIsSubmitting(false);
    }
  }, [addMemberError]);

  useEffect(() => {
    if (
      teamMembersData?.team_members.__typename === 'GetTeamSuccess' &&
      teamMembersData.team_members.team?.members?.length > 0
    ) {
      try {
        const memberData = teamMembersData.team_members.team.members.map(member => ({
          ...member,
          permissions: getRandomPermissions(),
        }));
        setMembers(memberData);
      } catch (error) {
        console.error('Error processing team members data:', error);
      }
    }
  }, [teamMembersData]);

  const getRandomPermissions = (): ProjectPermission[] => {
    const allPermissions = Object.values(ProjectPermission).filter(
      v => !isNaN(Number(v))
    ) as ProjectPermission[];
    const numPermissions = Math.floor(Math.random() * 4) + 1;
    const permissions: ProjectPermission[] = [];

    for (let i = 0; i < numPermissions; i++) {
      const randomIndex = Math.floor(Math.random() * allPermissions.length);
      const permission = allPermissions[randomIndex];
      if (!permissions.includes(permission)) {
        permissions.push(permission);
      }
    }

    return permissions;
  };

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

    try {
      setIsSubmitting(true);
      setInviteError(null);

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
        toast.success(`Invitation sent to ${form.email} successfully!`);

        setMembers(prevMembers => [
          ...prevMembers,
          {
            name: 'Pending Member',
            email: form.email,
            permissions: form.permissions,
          },
        ]);

        setForm({
          email: '',
          permissions: [ProjectPermission.READ],
        });
      } else if (result?.__typename === 'AddTeamMemberErrorResult') {
        const errorMessage = result.message || 'Unknown error';
        setInviteError(errorMessage);
        toast.error(`Failed to invite member: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Error inviting user:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      setInviteError(errorMessage);
      toast.error(`Failed to send invitation: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
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
                  <LoadingSpinner size="sm" color="white" />
                  <span>Inviting...</span>
                </span>
              ) : (
                'Invite'
              )}
            </Button>
          </div>
        </div>

        {inviteError && (
          <div className="mt-4 p-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md text-sm">
            Error inviting member: {inviteError}
          </div>
        )}

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

        {teamMembersError && (
          <div className="p-4 mb-6 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md">
            Error loading team members: {teamMembersError.message || 'Unknown error'}
          </div>
        )}

        {teamMembersLoading ? (
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
