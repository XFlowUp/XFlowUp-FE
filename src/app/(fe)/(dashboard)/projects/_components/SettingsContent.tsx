'use client';

import { useState } from 'react';
import { Globe, AlertTriangle, Settings, Users } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import GeneralSettings from './settings/GeneralSettings';
import MembersSettings from './settings/MembersSettings';
import DangerSettings from './settings/DangerSettings';
import EnvironmentsSettings from './settings/EnvironmentsSettings';
import { useParams } from 'next/navigation';
import { useProjectDetails } from '@/shared/api/queries/useProjects';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState('general');
  const params = useParams();
  const projectSlug = typeof params.slug === 'string' ? params.slug : '';

  const { data: projectData, loading: projectLoading } = useProjectDetails(projectSlug);

  const projectDetails =
    projectData?.get_project_details.__typename === 'GetProjectDetailsResultSuccess'
      ? projectData.get_project_details.data
      : null;

  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: <Settings size={20} />,
      content: projectLoading ? (
        <div className="p-8">
          <Skeleton className="h-8 w-1/4 mb-6 bg-gray-200 dark:bg-gray-700/50" />
          <div className="space-y-6 max-w-[60%]">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-700/50" />
              <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700/50" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700/50" />
              <Skeleton className="h-32 w-full bg-gray-200 dark:bg-gray-700/50" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-700/50" />
              <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700/50" />
            </div>
            <Skeleton className="h-9 w-24 mt-6 bg-gray-200 dark:bg-gray-700/50" />
          </div>
        </div>
      ) : (
        <GeneralSettings projectDetails={projectDetails} />
      ),
    },
    {
      id: 'environments',
      label: 'Environments',
      icon: <Globe className="w-[20px] h-[20px]" />,
      content: <EnvironmentsSettings projectSlug={projectSlug} />,
    },
    {
      id: 'members',
      label: 'Members',
      icon: <Users size={20} />,
      content: <MembersSettings projectSlug={projectSlug} />,
    },
    {
      id: 'danger',
      label: 'Danger',
      icon: <AlertTriangle className="w-[20px] h-[20px]" />,
      content: <DangerSettings projectSlug={projectSlug} projectName={projectDetails?.name} />,
      isDanger: true,
    },
  ];

  return (
    <div className="flex flex-col h-screen p-4">
      {/* Header - aligned with tab content with px-4 + px-3 = 28px total */}
      <div className="py-8 px-7 border-b">
        <h3 className="text-3xl font-bold">Project Settings</h3>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Tabs */}
        <div className="w-64 border-r">
          <div className="flex flex-col px-4 py-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center w-full text-left mb-1 rounded-md px-3 py-2 transition-colors group',
                  activeTab === tab.id
                    ? tab.isDanger
                      ? 'bg-red-50 dark:bg-red-900/10'
                      : 'bg-gray-100 dark:bg-gray-800/60'
                    : tab.isDanger
                      ? 'hover:bg-red-50 dark:hover:bg-red-900/10'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800/60'
                )}
              >
                <div className="w-[20px] h-[20px] flex items-center justify-center">
                  <span
                    className={cn(
                      activeTab === tab.id
                        ? tab.isDanger
                          ? 'text-red-500'
                          : 'text-black dark:text-white'
                        : tab.isDanger
                          ? 'text-red-500/70 group-hover:text-red-500'
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'
                    )}
                  >
                    {tab.icon}
                  </span>
                </div>
                <span
                  className={cn(
                    'ml-2 text-base',
                    activeTab === tab.id
                      ? tab.isDanger
                        ? 'font-medium text-red-500'
                        : 'font-medium text-black dark:text-white'
                      : tab.isDanger
                        ? 'text-red-500/70 group-hover:text-red-500'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'
                  )}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-auto px-2">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  );
}
