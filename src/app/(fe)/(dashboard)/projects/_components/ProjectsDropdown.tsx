import { Button } from '@/components/ui/button';
import { CheckIcon } from '@/components/ui/check';
import { ChevronDownIcon } from '@/components/ui/chevron-down';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import useProjects from '@/shared/api/queries/useProjects';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProjectsDropdown = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { data: projectsData, loading: projectsLoading, error: projectsError } = useProjects();

  const projects =
    projectsData?.all_projects?.__typename === 'ProjectSuccess'
      ? projectsData.all_projects.data
      : [];

  const currentProject = projects.find(p => p.slug === slug);

  // Set page title based on project name
  useEffect(() => {
    if (currentProject) {
      document.title = `${currentProject.name} | XflowUp`;
    }
  }, [currentProject]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 gap-1 text-base">
          {projectsLoading ? (
            <Skeleton className="h-8 w-30" />
          ) : (
            <>
              {currentProject?.name || slug} <ChevronDownIcon className="h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        {projectsLoading ? (
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
        ) : projectsError ? (
          <DropdownMenuItem className="px-3 py-2" disabled>
            Error loading projects
          </DropdownMenuItem>
        ) : projects.length > 0 ? (
          projects.map(project => (
            <DropdownMenuItem
              className="px-3 py-2 flex items-center"
              key={project.id}
              onClick={() => router.push(`/projects/${project.slug}`)}
            >
              {project.slug === slug ? (
                <CheckIcon size={16} className="mr-2 p-0" />
              ) : (
                <div className="w-[16px] h-[16px] mr-2"></div>
              )}
              <span>{project.name}</span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="px-3 py-2" disabled>
            No project found
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectsDropdown;
