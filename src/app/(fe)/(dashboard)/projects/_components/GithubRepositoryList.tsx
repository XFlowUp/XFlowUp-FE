import { useEffect, useRef, useState, useCallback } from 'react';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon } from '@/components/ui/chevron-right';
import useRepositories from '@/shared/api/queries/useRepositories';

interface GithubRepositoryListProps {
  onSelectRepository?: (repo: any) => void;
}

export default function GithubRepositoryList({ onSelectRepository }: GithubRepositoryListProps) {
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState<any[]>([]);
  const [hasMoreRepos, setHasMoreRepos] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: repositoriesData,
    loading,
    fetchMore,
  } = useRepositories({
    page: 1,
    perPage: 20,
  });

  const loadMoreRepos = useCallback(async () => {
    if (isLoadingMore || !hasMoreRepos || loading) return;

    try {
      setIsLoadingMore(true);
      const nextPage = page + 1;

      const result = await fetchMore({
        variables: {
          page: nextPage,
          perPage: 20,
        },
      });

      const newData = result.data?.get_repositories;
      if (newData && newData.__typename === 'GetRepositorySuccessResult') {
        if (newData.data.length === 0 || newData.data.length < 20) {
          setHasMoreRepos(false);
        }

        setRepos(prevRepos => [...prevRepos, ...newData.data]);
        setPage(nextPage);
      } else {
        setHasMoreRepos(false);
      }
    } catch (error) {
      console.error('Error loading more repositories:', error);
      setHasMoreRepos(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchMore, page, hasMoreRepos, isLoadingMore, loading, repos.length]);

  useEffect(() => {
    if (loading) return;

    const repoData = repositoriesData?.get_repositories;
    if (repoData && repoData.__typename === 'GetRepositorySuccessResult') {
      if (page === 1) {
        setRepos(repoData.data);
        if (repoData.data.length === 0 || repoData.data.length < 20) {
          setHasMoreRepos(false);
        } else {
          setHasMoreRepos(true);
        }
      }
    }
  }, [repositoriesData, loading, page]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (loading || isLoadingMore || !hasMoreRepos) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadMoreRepos();
      }
    };

    const options = {
      root: scrollContainerRef.current,
      rootMargin: '0px 0px 200px 0px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (loadingMoreRef.current) {
      observerRef.current.observe(loadingMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [loading, isLoadingMore, hasMoreRepos, loadMoreRepos]);

  useEffect(() => {
    return () => {
      setPage(1);
      setRepos([]);
      setHasMoreRepos(true);
      setIsLoadingMore(false);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Input
        placeholder="Search for GitHub repositories..."
        className="text-base px-6 py-4 h-auto min-h-[50px] border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center border-b border-gray-200 dark:border-gray-700 flex-shrink-0"
        style={{ fontSize: '16px', backgroundColor: 'transparent' }}
      />
      <div ref={scrollContainerRef} className="p-3 overflow-y-auto flex-grow">
        {repos.length > 0 ? (
          <>
            {repos.map(repo => (
              <div
                key={repo.id}
                className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-150"
                onClick={() => onSelectRepository?.(repo)}
              >
                <div className="flex items-center gap-2">
                  <IoLogoGithub size={20} className="text-gray-900 dark:text-white flex-shrink-0" />
                  <span className="text-gray-700 dark:text-white" style={{ fontSize: '16px' }}>
                    {repo.name}
                  </span>
                </div>
                <ChevronRightIcon size={20} className="text-gray-500" />
              </div>
            ))}

            {hasMoreRepos && (
              <div
                ref={loadingMoreRef}
                className="h-10 w-full flex items-center justify-center mt-2"
              >
                {isLoadingMore && (
                  <div className="w-6 h-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
                )}
              </div>
            )}
          </>
        ) : !loading ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <IoLogoGithub size={36} className="mb-2" />
            <p>No repositories found</p>
          </div>
        ) : null}

        {loading && !isLoadingMore && (
          <div className="flex justify-center p-2">
            <div className="w-6 h-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
