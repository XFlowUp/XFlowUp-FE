import Link from 'next/link';
import { IoSettingsOutline } from '@react-icons/all-files/io5/IoSettingsOutline';
import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/avatar-component';
import { UserDropdown } from '@/components/dropdown-components';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
        <header className="flex justify-between items-center py-4">
          <Avatar />
          <div className="flex flex-row justify-between items-center">
            <a
              href="#"
              className="font-semibold mr-8 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-sm focus:outline-none focus-visible:ring-2"
            >
              Help
            </a>
            <UserDropdown />
          </div>
        </header>

        <div className="flex flex-col w-full pt-12">
          <main className="grid gap-12 max-w-container mx-auto w-full pb-24">
            <div className="grid gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md h-md px-3 space-x-2 focus:outline-none max-w-max border-none w-full py-2 h-auto overflow-hidden -ml-2 sm:-ml-3">
                    <div className="flex space-x-4 items-center w-full overflow-hidden">
                      <Avatar />
                      <div className="flex items-center gap-3">
                        <p className="text-h2 font-medium truncate tracking-[-0.24px]">Quang Anh</p>
                        <p className="flex items-center rounded px-2 py-1 uppercase text-[11px] font-medium leading-none border bg-green-50 text-green-500 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                          <span className="inline-block mt-px">Trial</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mt-2 sm:mt-0">
                    <Link href="/people">
                      <Avatar className="w-7 h-7" />
                    </Link>

                    <div className="flex gap-2 flex-grow justify-end">
                      <Button variant="outline" size="icon">
                        <IoSettingsOutline />
                      </Button>
                      <Button>
                        <IoMdAdd /> New
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex p-3 rounded-md items-center bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:items-center lg:justify-between">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-y-2 gap-x-6 justify-between sm:justify-start">
                    <div className="flex space-x-1">
                      <p className="text-sm font-semibold">Free Trial</p>
                      <p className="text-sm opacity-50">|</p>
                      <p className="text-sm">$ 4.75</p>
                    </div>
                    <p className="text-sm">512 MB of RAM, 1 GB of Disk, and 2 vCPU</p>
                  </div>
                  <Button>Choose a plan</Button>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <hr className="w-full border-t border-gray-100 dark:border-gray-800 my-0" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border rounded-lg p-6 h-45 transition-all duration-200 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                  <div className="flex flex-col gap-2 h-full relative z-10">
                    <div className="flex flex-col flex-grow">
                      <p className="font-medium mb-3">Web call</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">3 services</p>
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
