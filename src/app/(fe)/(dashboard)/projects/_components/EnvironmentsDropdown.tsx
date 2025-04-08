import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDownIcon } from '@/components/ui/chevron-down';
import { Plus } from 'lucide-react';
import { CheckIcon } from '@/components/ui/check';
import { useEnvironment } from './EnvironmentContext';

export interface EnvironmentsDropdownProps {
  slug: string;
  onNewEnvironmentClick: () => void;
}

const EnvironmentsDropdown = ({ onNewEnvironmentClick }: EnvironmentsDropdownProps) => {
  const {
    selectedEnvironmentId,
    selectedEnvironmentName,
    setSelectedEnvironmentId,
    environments,
    loading: envLoading,
    error,
  } = useEnvironment();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 gap-1 text-base">
          {envLoading ? (
            <Skeleton className="h-8 w-30" />
          ) : (
            <>
              {selectedEnvironmentName} <ChevronDownIcon className="h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Environments</DropdownMenuLabel>
        {envLoading ? (
          <>
            <DropdownMenuItem className="px-3 py-2">
              <Skeleton className="h-4 w-32" />
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-2">
              <Skeleton className="h-4 w-28" />
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 py-2">
              <Skeleton className="h-4 w-30" />
            </DropdownMenuItem>
          </>
        ) : error ? (
          <DropdownMenuItem className="px-3 py-2" disabled>
            Error loading environments
          </DropdownMenuItem>
        ) : environments.length > 0 ? (
          environments.map(env => (
            <DropdownMenuItem
              className="px-3 py-2 flex items-center"
              key={env.id}
              onClick={() => setSelectedEnvironmentId(env.id)}
            >
              {env.id === selectedEnvironmentId ? (
                <CheckIcon size={16} className="mr-2 p-0" />
              ) : (
                <div className="w-[16px] h-[16px] mr-2"></div>
              )}
              <span>{env.name}</span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="px-3 py-2" disabled>
            No environment found
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-3 py-2" onClick={onNewEnvironmentClick}>
          <Plus className="h-4 w-4 mr-2" />
          <span>New Environment</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EnvironmentsDropdown;
