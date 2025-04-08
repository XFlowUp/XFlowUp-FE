import { Card } from '@/components/ui/card';
import useProjects from '@/shared/api/queries/useProjects';
import { ProjectSuccess } from '@/gql/graphql';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

interface ProjectsProps {
  refetchTrigger: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

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
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <Card key={`skeleton-${index}`} className="border rounded-lg p-6 h-45">
                    <div className="flex flex-col gap-2 h-full">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-16 w-full flex-grow" />
                      <Skeleton className="h-4 w-1/2 mt-2" />
                    </div>
                  </Card>
                ))
            : !error && (data?.all_projects as ProjectSuccess).data.length > 0
              ? (data?.all_projects as ProjectSuccess).data.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
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
                  </motion.div>
                ))
              : null}
        </div>
      </div>
      {!loading &&
      (!data?.all_projects || (data?.all_projects as ProjectSuccess).data.length === 0) ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 dark:text-gray-400 mt-4"
        >
          <p>No projects found.</p>
        </motion.div>
      ) : null}
    </>
  );
}
