import { MainNav } from '@/app/(fe)/(dashboard)/projects/_components/MainNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArchitectureView from '@/app/(fe)/(dashboard)/projects/_components/ArchitectureView';
import { Badge } from '@/components/ui/badge';
import { UserDropdown } from '@/components/user-nav';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrialPlanHeader from '@/app/(fe)/(dashboard)/projects/_components/TrialPlanHeader';

export default async function ProjectsPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      <Tabs defaultValue="architecture" className="w-full h-full flex flex-col gap-0">
        <header className="border-b bg-white dark:bg-gray-950 flex-shrink-0">
          <div className="flex h-16 items-center px-6">
            <MainNav slug={params.slug} />
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <TabsList className="bg-gray-100/80 dark:bg-gray-800/50 rounded-lg p-1">
                <TabsTrigger
                  value="architecture"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md px-4 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Architecture
                </TabsTrigger>
                <TabsTrigger
                  value="observability"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md px-4 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Observability
                </TabsTrigger>
                <TabsTrigger
                  value="logs"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md px-4 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Logs
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md px-4 data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
              <TrialPlanHeader />
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <UserDropdown />
            </div>
          </div>
        </header>
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <TabsContent
            value="architecture"
            className="h-full p-0 m-0 overflow-hidden data-[state=active]:block"
          >
            <ArchitectureView />
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
            className="p-0 m-0 h-full overflow-auto data-[state=active]:block"
          >
            <div className="p-6">Settings content</div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
