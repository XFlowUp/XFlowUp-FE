import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';

function ServiceNode({ data }: { data: any }) {
  return (
    <div className="relative w-72">
      <Card className="w-full h-36 bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-950/80 shadow-lg">
        <CardContent className="flex flex-col h-full">
          <div className="flex flex-1 items-start gap-3 overflow-hidden">
            <IoLogoGithub className="w-6 h-6 mt-0.5 text-gray-900 dark:text-white flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-white truncate">{data.name}</h3>
              <p className="text-xs text-gray-700 dark:text-white truncate mt-1">{data.fullName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
            <span className="truncate">
              {data.timeAgo} via {data.source}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(ServiceNode);
