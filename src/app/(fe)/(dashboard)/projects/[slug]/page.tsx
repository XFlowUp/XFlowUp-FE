import { MainNav } from '@/app/(fe)/(dashboard)/projects/_components/MainNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArchitectureView from '@/app/(fe)/(dashboard)/projects/_components/ArchitectureView';
import { Badge } from '@/components/ui/badge';
import { UserDropdown } from '@/components/user-nav';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Tabs defaultValue="architecture" className="w-full h-full gap-0">
        <header className="border-b bg-white dark:bg-gray-950">
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
              <Badge
                variant="outline"
                className="bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 border-green-200 dark:border-green-800 px-3 py-1.5 flex justify-center items-center gap-3"
              >
                <span className="font-medium">TRIAL</span>
                <span className="text-green-300 dark:text-green-700">|</span>
                <span className="text-green-500 dark:text-green-400">$ 4.68</span>
              </Badge>
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
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <TabsContent value="architecture" className="h-[calc(100vh-64px)] p-0 m-0">
            <ArchitectureView />
          </TabsContent>
          <TabsContent value="observability" className="p-0 m-0">
            <div className="p-6">Observability content</div>
          </TabsContent>
          <TabsContent value="logs" className="p-0 m-0">
            <div className="p-6">Logs content</div>
          </TabsContent>
          <TabsContent value="settings" className="p-0 m-0">
            <div className="p-6">Settings content</div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
