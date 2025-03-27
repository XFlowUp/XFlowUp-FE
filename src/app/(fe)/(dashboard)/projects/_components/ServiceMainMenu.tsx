import { Database } from 'lucide-react';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon } from '@/components/ui/chevron-right';

interface ServiceMainMenuProps {
  onSelectGithub: () => void;
  onSelectDatabase: () => void;
}

export default function ServiceMainMenu({
  onSelectGithub,
  onSelectDatabase,
}: ServiceMainMenuProps) {
  return (
    <>
      <Input
        placeholder="What can we help with?"
        className="text-base px-6 py-4 h-auto min-h-[50px] border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center flex-shrink-0"
        style={{ fontSize: '16px', backgroundColor: 'transparent' }}
      />
      <div className="border-t border-gray-200 dark:border-gray-700 flex-shrink-0" />
      <div className="p-3 overflow-y-auto">
        <div
          className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-150"
          onClick={onSelectGithub}
        >
          <div className="flex items-center gap-2">
            <IoLogoGithub size={20} className="text-gray-900 dark:text-white flex-shrink-0" />
            <span className="text-gray-700 dark:text-white" style={{ fontSize: '16px' }}>
              Deploy from Github repo
            </span>
          </div>
          <ChevronRightIcon size={20} className="text-gray-500" />
        </div>

        <div
          className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-150"
          onClick={onSelectDatabase}
        >
          <div className="flex items-center gap-2">
            <Database size={20} className="text-gray-900 dark:text-white flex-shrink-0" />
            <span className="text-gray-700 dark:text-white" style={{ fontSize: '16px' }}>
              Deploy Database
            </span>
          </div>
          <ChevronRightIcon size={20} className="text-gray-500" />
        </div>
      </div>
    </>
  );
}
