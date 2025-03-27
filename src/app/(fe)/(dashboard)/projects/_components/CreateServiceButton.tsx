import { ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import ServiceMainMenu from './ServiceMainMenu';
import GithubRepositoryList from './GithubRepositoryList';
import DatabaseServiceList from './DatabaseServiceList';

enum ServiceDialogScreen {
  MAIN_MENU,
  GITHUB_REPOS,
  DATABASE_SERVICES,
}

export default function CreateServiceButton() {
  const [currentScreen, setCurrentScreen] = useState(ServiceDialogScreen.MAIN_MENU);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBackToMainMenu = () => {
    setCurrentScreen(ServiceDialogScreen.MAIN_MENU);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setCurrentScreen(ServiceDialogScreen.MAIN_MENU);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-[500px] overflow-hidden max-h-[80vh]">
        <DialogHeader className="flex-shrink-0">
          <div className="flex flex-col items-center space-y-2 sm:space-y-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Zm1 14V7h12v12H7ZM28 5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H28Zm1 14V7h12v12H29ZM5 28a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V28Zm2 1v12h12V29H7Zm29-1a1 1 0 1 0-2 0v6h-6a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6v-6Z"
                fill="url(#czsppitv6a)"
              ></path>
              <defs>
                <linearGradient
                  id="czsppitv6a"
                  x1="5.76"
                  y1="42.747"
                  x2="43"
                  y2="20.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#B814B8"></stop>
                  <stop offset="1" stopColor="#500CE4"></stop>
                </linearGradient>
              </defs>
            </svg>
            <DialogTitle className="font-bold text-[40px]">New Service</DialogTitle>
            <p className="text-gray-600 text-center ">Deploy your app to production effortlessly</p>
          </div>
        </DialogHeader>

        <div className="flex min-h-[40px] items-center relative flex-shrink-0">
          {currentScreen !== ServiceDialogScreen.MAIN_MENU && (
            <>
              <button
                onClick={handleBackToMainMenu}
                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft size={20} className="mr-1" />
                <span>Back</span>
              </button>
              <h3 className="absolute w-full text-center font-semibold text-lg pointer-events-none">
                {currentScreen === ServiceDialogScreen.DATABASE_SERVICES
                  ? 'Database Services'
                  : 'GitHub Repositories'}
              </h3>
            </>
          )}
        </div>

        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded-sm shadow-lg relative overflow-hidden flex-grow min-h-0">
          {currentScreen === ServiceDialogScreen.MAIN_MENU && (
            <ServiceMainMenu
              onSelectGithub={() => setCurrentScreen(ServiceDialogScreen.GITHUB_REPOS)}
              onSelectDatabase={() => setCurrentScreen(ServiceDialogScreen.DATABASE_SERVICES)}
            />
          )}

          {currentScreen === ServiceDialogScreen.DATABASE_SERVICES && (
            <DatabaseServiceList
              onSelectService={service => {
                console.log('Selected database service:', service);
              }}
            />
          )}

          {currentScreen === ServiceDialogScreen.GITHUB_REPOS && (
            <GithubRepositoryList
              onSelectRepository={repo => {
                console.log('Selected repository:', repo);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
