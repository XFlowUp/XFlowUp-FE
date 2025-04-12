import { Database } from 'lucide-react';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon } from '@/components/ui/chevron-right';
import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ServiceMainMenuProps {
  onSelectGithub: () => void;
  onSelectDatabase: () => void;
}

type AnimationItemId = 'search' | 'divider' | 'github' | 'database';

export default function ServiceMainMenu({
  onSelectGithub,
  onSelectDatabase,
}: ServiceMainMenuProps) {
  const [visibleItems, setVisibleItems] = useState({
    search: false,
    divider: false,
    github: false,
    database: false,
  });

  const handleItemObserver = useCallback((id: AnimationItemId, inView: boolean) => {
    if (inView) {
      setVisibleItems(prev => ({ ...prev, [id]: true }));
    }
  }, []);

  return (
    <>
      <SearchInput onObserve={handleItemObserver} isVisible={visibleItems.search} />

      <Divider onObserve={handleItemObserver} isVisible={visibleItems.divider} />

      <div className="p-3 overflow-y-auto">
        <MenuItem
          id="github"
          icon={<IoLogoGithub size={20} className="text-gray-900 dark:text-white flex-shrink-0" />}
          label="Deploy from Github repo"
          onClick={onSelectGithub}
          onObserve={handleItemObserver}
          isVisible={visibleItems.github}
        />

        <MenuItem
          id="database"
          icon={<Database size={20} className="text-gray-900 dark:text-white flex-shrink-0" />}
          label="Deploy Database"
          onClick={onSelectDatabase}
          onObserve={handleItemObserver}
          isVisible={visibleItems.database}
        />
      </div>
    </>
  );
}

function SearchInput({
  onObserve,
  isVisible,
}: {
  onObserve: (id: AnimationItemId, inView: boolean) => void;
  isVisible: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onObserve('search', entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onObserve]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Input
          placeholder="What can we help with?"
          className="text-base px-6 py-4 h-auto min-h-[50px] border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center flex-shrink-0"
          style={{ fontSize: '16px', backgroundColor: 'transparent' }}
        />
      </motion.div>
    </div>
  );
}

function Divider({
  onObserve,
  isVisible,
}: {
  onObserve: (id: AnimationItemId, inView: boolean) => void;
  isVisible: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onObserve('divider', entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onObserve]);

  return (
    <div ref={ref}>
      <motion.div
        className="border-t border-gray-200 dark:border-neutral-700 flex-shrink-0"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

function MenuItem({
  id,
  icon,
  label,
  onClick,
  onObserve,
  isVisible,
}: {
  id: AnimationItemId;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  onObserve: (id: AnimationItemId, inView: boolean) => void;
  isVisible: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onObserve(id, entry.isIntersecting);
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
  }, [id, onObserve]);

  return (
    <div ref={ref}>
      <motion.div
        className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-150"
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-gray-700 dark:text-white" style={{ fontSize: '16px' }}>
            {label}
          </span>
        </div>
        <ChevronRightIcon size={20} className="text-gray-500" />
      </motion.div>
    </div>
  );
}
