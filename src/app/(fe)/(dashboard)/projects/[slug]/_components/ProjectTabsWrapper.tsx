'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MainNav } from '@/app/(fe)/(dashboard)/projects/_components/MainNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArchitectureView from '@/app/(fe)/(dashboard)/projects/_components/ArchitectureView';
import { UserDropdown } from '@/components/user-nav';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlanHeader from '@/app/(fe)/(dashboard)/projects/_components/PlanHeader';
import SettingsContent from '../../_components/SettingsContent';

interface ProjectTabsWrapperProps {
  slug: string;
}

const tabs = [
  { value: 'architecture', label: 'Architecture' },
  { value: 'observability', label: 'Observability' },
  { value: 'logs', label: 'Logs' },
  { value: 'settings', label: 'Settings' },
];

export default function ProjectTabsWrapper({ slug }: ProjectTabsWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('architecture');

  // Đọc tab từ URL khi component mount
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabs.some(tab => tab.value === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  // Hàm xử lý thay đổi tab
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Cập nhật URL với search param
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full h-full flex flex-col gap-0"
      >
        <header className="border-b bg-white dark:bg-gray-950 flex-shrink-0">
          <div className="flex h-16 items-center px-6">
            <MainNav slug={slug} />
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <TabsList className="bg-gray-100/80 dark:bg-gray-800/50 rounded-lg p-1">
                {tabs.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md px-4 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <PlanHeader />
              <UserDropdown />
            </div>
          </div>
        </header>
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <TabsContent
            value="architecture"
            className="h-full p-0 m-0 overflow-hidden data-[state=active]:block"
          >
            <ArchitectureView projectSlug={slug} />
          </TabsContent>
          <TabsContent
            value="observability"
            className="p-0 m-0 h-full overflow-auto data-[state=active]:block"
          >
            <div className="p-6">Observability content</div>
          </TabsContent>
          <TabsContent
            value="logs"
            className="p-0 m-0 h-full overflow-auto data-[state=active]:block"
          >
            <div className="p-6">Logs content</div>
          </TabsContent>
          <TabsContent
            value="settings"
            className="h-full p-0 m-0 overflow-hidden data-[state=active]:block"
          >
            <SettingsContent />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
