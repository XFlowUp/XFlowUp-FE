import { ChevronLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ServiceMainMenu from './ServiceMainMenu';
import GithubRepositoryList from './GithubRepositoryList';
import DatabaseServiceList from './DatabaseServiceList';
import GithubRepositoryForm from './GithubRepositoryForm';
import DatabaseForm from './DatabaseForm';
import { ServiceNodeData } from './ServiceNode';
import { useArchitecture } from './ArchitectureContext';

enum ServiceDialogScreen {
  MAIN_MENU,
  GITHUB_REPOS,
  DATABASE_SERVICES,
  GITHUB_REPO_FORM,
  DATABASE_FORM,
}

interface ServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ServiceDialog({ isOpen, onOpenChange }: ServiceDialogProps) {
  const [currentScreen, setCurrentScreen] = useState(ServiceDialogScreen.MAIN_MENU);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [selectedDatabase, setSelectedDatabase] = useState<any>(null);
  const { addServiceNode } = useArchitecture();

  const handleBackToMainMenu = () => {
    setCurrentScreen(ServiceDialogScreen.MAIN_MENU);
  };

  const handleBackToRepos = () => {
    setCurrentScreen(ServiceDialogScreen.GITHUB_REPOS);
  };

  const handleBackToDatabases = () => {
    setCurrentScreen(ServiceDialogScreen.DATABASE_SERVICES);
  };

  const handleDialogOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setCurrentScreen(ServiceDialogScreen.MAIN_MENU);
      setSelectedRepo(null);
      setSelectedDatabase(null);
    }
  };

  const handleSelectGithubRepository = (repo: any) => {
    setSelectedRepo(repo);
    setCurrentScreen(ServiceDialogScreen.GITHUB_REPO_FORM);
  };

  const handleCreateGithubService = (serviceData: ServiceNodeData) => {
    addServiceNode(serviceData);
    onOpenChange(false);
  };

  const handleSelectDatabaseService = (service: any) => {
    setSelectedDatabase(service);
    setCurrentScreen(ServiceDialogScreen.DATABASE_FORM);
  };

  const handleCreateNewDatabase = () => {
    setSelectedDatabase(null);
    setCurrentScreen(ServiceDialogScreen.DATABASE_FORM);
  };

  const handleCreateDatabaseService = (serviceData: ServiceNodeData) => {
    addServiceNode(serviceData);
    onOpenChange(false);
  };

  const getCurrentTitle = () => {
    switch (currentScreen) {
      case ServiceDialogScreen.DATABASE_SERVICES:
        return 'Database Services';
      case ServiceDialogScreen.GITHUB_REPOS:
        return 'GitHub Repositories';
      case ServiceDialogScreen.GITHUB_REPO_FORM:
        return 'Configure Service';
      case ServiceDialogScreen.DATABASE_FORM:
        return 'Create Database';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="flex flex-col w-[500px] overflow-hidden h-[80vh]">
        <DialogHeader className="flex-shrink-0">
          <motion.div
            className="flex flex-col items-center space-y-2 sm:space-y-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
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
          </motion.div>
        </DialogHeader>

        <div className="flex min-h-[40px] items-center relative flex-shrink-0">
          {currentScreen !== ServiceDialogScreen.MAIN_MENU && (
            <>
              <motion.button
                onClick={
                  currentScreen === ServiceDialogScreen.GITHUB_REPO_FORM
                    ? handleBackToRepos
                    : currentScreen === ServiceDialogScreen.DATABASE_FORM
                      ? handleBackToDatabases
                      : handleBackToMainMenu
                }
                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              >
                <ChevronLeft size={20} className="mr-1" />
                <span>Back</span>
              </motion.button>

              <div className="absolute w-full text-center pointer-events-none overflow-hidden h-7">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={currentScreen}
                    className="font-semibold text-lg inline-block"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {getCurrentTitle()}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col bg-gray-100 dark:bg-neutral-800 rounded-sm shadow-lg relative overflow-hidden flex-grow h-[400px]">
          {currentScreen === ServiceDialogScreen.MAIN_MENU && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ServiceMainMenu
                onSelectGithub={() => setCurrentScreen(ServiceDialogScreen.GITHUB_REPOS)}
                onSelectDatabase={() => setCurrentScreen(ServiceDialogScreen.DATABASE_SERVICES)}
              />
            </motion.div>
          )}

          <AnimatePresence>
            {currentScreen === ServiceDialogScreen.DATABASE_SERVICES && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              >
                <DatabaseServiceList
                  onSelectService={handleSelectDatabaseService}
                  onCreateNew={handleCreateNewDatabase}
                />
              </motion.div>
            )}

            {currentScreen === ServiceDialogScreen.GITHUB_REPOS && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              >
                <GithubRepositoryList
                  onSelectRepository={handleSelectGithubRepository}
                  onBackToMainMenu={handleBackToMainMenu}
                />
              </motion.div>
            )}

            {currentScreen === ServiceDialogScreen.GITHUB_REPO_FORM && selectedRepo && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              >
                <GithubRepositoryForm
                  repository={selectedRepo}
                  onSubmit={handleCreateGithubService}
                />
              </motion.div>
            )}

            {currentScreen === ServiceDialogScreen.DATABASE_FORM && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              >
                <DatabaseForm onSubmit={handleCreateDatabaseService} database={selectedDatabase} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
