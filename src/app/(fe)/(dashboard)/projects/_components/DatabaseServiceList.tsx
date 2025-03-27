import { Database } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon } from '@/components/ui/chevron-right';
import useDatabaseServices from '@/shared/api/queries/useDatabaseServices';

interface DatabaseServiceListProps {
  onSelectService?: (service: any) => void;
}

export default function DatabaseServiceList({ onSelectService }: DatabaseServiceListProps) {
  const { data: databaseServicesData, loading } = useDatabaseServices();

  const databaseServices =
    databaseServicesData?.get_database_services.__typename === 'GetDatabaseServiceSuccess'
      ? databaseServicesData.get_database_services.data
      : [];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Input
        placeholder="Search for database services..."
        className="text-base px-6 py-4 h-auto min-h-[50px] border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center border-b border-gray-200 dark:border-gray-700 flex-shrink-0"
        style={{ fontSize: '16px', backgroundColor: 'transparent' }}
      />
      <div className="p-3 overflow-y-auto flex-grow">
        {databaseServices.length > 0 ? (
          databaseServices.map(service => (
            <div
              key={service.id}
              className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-150"
              onClick={() => onSelectService?.(service)}
            >
              <div className="flex items-center gap-2">
                <Database size={20} className="text-gray-900 dark:text-white flex-shrink-0" />
                <span className="text-gray-700 dark:text-white" style={{ fontSize: '16px' }}>
                  {service.name}
                </span>
              </div>
              <ChevronRightIcon size={20} className="text-gray-500" />
            </div>
          ))
        ) : !loading ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <Database size={36} className="mb-2" />
            <p>No database services found</p>
          </div>
        ) : null}
        {loading && (
          <div className="flex justify-center p-2">
            <div className="w-6 h-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
