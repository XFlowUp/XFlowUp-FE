import { Card } from '@/components/ui/card';
import useProjects from '@/shared/api/queries/useProjects';
import { ProjectSuccess } from '@/gql/graphql';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectsProps {
  refetchTrigger: number;
}

export default function Projects({ refetchTrigger }: ProjectsProps) {
  const router = useRouter();
  const { data, loading, error, refetch } = useProjects();
  useEffect(() => {
    if (refetchTrigger) {
      refetch();
    }
  }, [refetchTrigger, refetch]);
  return (
    <>
      <div className="grid gap-4">
        <hr className="w-full border-t border-gray-100 dark:border-gray-800 my-0" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!loading &&
            !error &&
            (data?.all_projects as ProjectSuccess).data.map(project => (
              <Card
                key={project.id}
                className="border rounded-lg p-6 h-45 transition-all duration-200 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                onClick={() => router.push(`/projects/${project.slug}`)}
              >
                <div className="flex flex-col gap-2 h-full relative z-10">
                  <div className="flex flex-col flex-grow">
                    <p className="font-medium mb-2">{project.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.slug}</p>
                </div>
              </Card>
            ))}
        </div>
      </div>
      {loading || error || (data?.all_projects as ProjectSuccess).data.length > 0 ? null : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No projects available.</p>
        </div>
      )}
    </>
  );
}
