import { Database } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon } from '@/components/ui/chevron-right';
import useDatabaseServices from '@/shared/api/queries/useDatabaseServices';
import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface DatabaseServiceListProps {
  onSelectService?: (service: any) => void;
}

export default function DatabaseServiceList({ onSelectService }: DatabaseServiceListProps) {
  const { data: databaseServicesData, loading } = useDatabaseServices();
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

  const databaseServices =
    databaseServicesData?.get_database_services.__typename === 'GetDatabaseServiceSuccess'
      ? databaseServicesData.get_database_services.data
      : [];

  const handleItemObserver = useCallback((id: string, inView: boolean) => {
    if (inView) {
      setVisibleItems(prev => ({ ...prev, [id]: true }));
    }
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Input
          placeholder="Search for database services..."
          className="text-base px-6 py-4 h-auto min-h-[50px] border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center border-b border-gray-200 dark:border-neutral-700 flex-shrink-0 rounded-none"
          style={{ fontSize: '16px', backgroundColor: 'transparent' }}
        />
      </motion.div>
      <div className="p-3 overflow-y-auto flex-grow">
        {databaseServices.length > 0 ? (
          databaseServices.map(service => (
            <ServiceItem
              key={service.id}
              service={service}
              onObserve={handleItemObserver}
              isVisible={visibleItems[service.id] || false}
              onSelect={onSelectService}
            />
          ))
        ) : !loading ? (
          <motion.div
            className="flex flex-col items-center justify-center h-40 text-gray-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Database size={36} className="mb-2" />
            <p>No database services found</p>
          </motion.div>
        ) : null}
        {loading && (
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

function ServiceItem({
  service,
  onObserve,
  isVisible,
  onSelect,
}: {
  service: any;
  onObserve: (id: string, inView: boolean) => void;
  isVisible: boolean;
  onSelect?: (service: any) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onObserve(service.id, entry.isIntersecting);
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
  }, [service.id, onObserve]);

  return (
    <div ref={ref}>
      <motion.div
        className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-150"
        onClick={() => onSelect?.(service)}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          <Database size={20} className="text-gray-900 dark:text-white flex-shrink-0" />
          <span className="text-gray-700 dark:text-white" style={{ fontSize: '16px' }}>
            {service.name}
          </span>
        </div>
        <ChevronRightIcon size={20} className="text-gray-500" />
      </motion.div>
    </div>
  );
}
