import { useEffect, useRef, useState, useCallback } from 'react';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon } from '@/components/ui/chevron-right';
import useRepositories from '@/shared/api/queries/useRepositories';
import { motion } from 'motion/react';
import { Settings } from 'lucide-react';
import CONFIG from '@/shared/config';

interface GithubRepositoryListProps {
  onSelectRepository?: (repo: any) => void;
  onBackToMainMenu?: () => void;
}

export default function GithubRepositoryList({
  onSelectRepository,
  onBackToMainMenu,
}: GithubRepositoryListProps) {
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState<any[]>([]);
  const [hasMoreRepos, setHasMoreRepos] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

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

  const handleItemObserver = useCallback((id: string, inView: boolean) => {
    if (inView) {
      setVisibleItems(prev => ({ ...prev, [id]: true }));
    }
  }, []);

  useEffect(() => {
    return () => {
      setPage(1);
      setRepos([]);
      setHasMoreRepos(true);
      setIsLoadingMore(false);
      setVisibleItems({});
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  const handleConfigureGithubApp = () => {
    const width = 800;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(
      `${CONFIG.API_URL}/auth/github/app/install`,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (onBackToMainMenu) {
      onBackToMainMenu();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Input
          placeholder="Search for GitHub repositories..."
          className="text-base px-6 py-4 h-auto min-h-[50px] border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center border-b border-gray-200 dark:border-neutral-700 flex-shrink-0 rounded-none"
          style={{ fontSize: '16px', backgroundColor: 'transparent' }}
        />
      </motion.div>
      <div ref={scrollContainerRef} className="p-3 overflow-y-auto flex-grow">
        {repos.length > 0 ? (
          <>
            {repos.map(repo => (
              <RepoItem
                key={repo.id}
                repo={repo}
                onObserve={handleItemObserver}
                isVisible={visibleItems[repo.id] || false}
                isPrivate={repo.is_private}
                onSelect={onSelectRepository}
              />
            ))}

            {hasMoreRepos && (
              <div
                ref={loadingMoreRef}
                className="h-10 w-full flex items-center justify-center mt-2"
              >
                {isLoadingMore && (
                  <motion.div
                    className="w-6 h-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  ></motion.div>
                )}
              </div>
            )}
          </>
        ) : !loading ? (
          <motion.div
            className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-150"
            onClick={handleConfigureGithubApp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2">
              <Settings size={20} className="text-gray-900 dark:text-white flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-gray-700 dark:text-white" style={{ fontSize: '16px' }}>
                  Configure GitHub App
                </span>
              </div>
            </div>
            <ChevronRightIcon size={20} className="text-gray-500" />
          </motion.div>
        ) : null}

        {loading && !isLoadingMore && (
          <motion.div
            className="flex justify-center p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-6 h-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function RepoItem({
  repo,
  onObserve,
  isVisible,
  isPrivate,
  onSelect,
}: {
  repo: any;
  onObserve: (id: string, inView: boolean) => void;
  isVisible: boolean;
  isPrivate: boolean;
  onSelect?: (repo: any) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onObserve(repo.id, entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [repo.id, onObserve]);

  return (
    <div ref={ref}>
      <motion.div
        className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-150"
        onClick={() => onSelect?.(repo)}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          <IoLogoGithub size={20} className="text-gray-900 dark:text-white flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-gray-700 dark:text-white" style={{ fontSize: '16px' }}>
              {repo.name}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isPrivate
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}
              >
                {isPrivate ? 'Private' : 'Public'}
              </span>
            </div>
          </div>
        </div>
        <ChevronRightIcon size={20} className="text-gray-500" />
      </motion.div>
    </div>
  );
}
