import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle';
import { ChevronRight, Train } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-gray-800 dark:text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Featured section */}
          <div>
            <h3 className="text-sm font-medium mb-6">Featured</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 dark:bg-[#13131f] dark:border-[#2a2a3c]">
                <h4 className="text-sm font-medium mb-1">Launch Week 02</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore everything we launched—new features, updates, and more.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 dark:bg-[#13131f] dark:border-[#2a2a3c]">
                <h4 className="text-sm font-medium mb-1">XFlowUp V2: Faster and Cheaper</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Learn how we have simultaneously decreased cost and increased performance.
                </p>
              </div>
            </div>
          </div>

          {/* Product section */}
          <div>
            <h3 className="text-sm font-medium mb-6">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Open Source Kickback
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-medium mt-8 mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Central Station
                </Link>
              </li>
            </ul>
          </div>

          {/* Compare section */}
          <div>
            <h3 className="text-sm font-medium mb-6">Compare</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Heroku
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Render
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Fly.io
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Vercel
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-medium mt-8 mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Trust
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact and Legal section */}
          <div>
            <h3 className="text-sm font-medium mb-6">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Email
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-medium mt-8 mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Fair Use
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Bug Bounty Program
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer with status and copyright */}
      <div className="border-t border-gray-200 dark:border-[#2a2a3c]">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <Train className="h-5 w-5" />
            <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
              All systems operational <ChevronRight className="h-3 w-3 ml-1" />
            </span>
          </div>
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 md:mt-0">
            © 2025 XFlowUp Corp. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
