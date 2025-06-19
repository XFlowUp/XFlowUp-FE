'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Database, StickyNote, Plus } from 'lucide-react';

interface ContextMenuProps {
  position: { x: number; y: number } | null;
  onClose: () => void;
  onAddGithubService: () => void;
  onAddDatabaseService: () => void;
  onAddStickyNote: () => void;
}

export default function ContextMenu({
  position,
  onClose,
  onAddGithubService,
  onAddDatabaseService,
  onAddStickyNote,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showSubMenu, setShowSubMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!position) return null;

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.1,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: 'easeIn',
      },
    },
  };

  const subMenuVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.15,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.1,
        ease: 'easeIn',
      },
    },
  };

  return (
    <AnimatePresence>
      {position && (
        <motion.div
          ref={menuRef}
          className="fixed z-50 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[200px]"
          style={{
            left: position.x,
            top: position.y,
          }}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="relative"
            onMouseEnter={() => setShowSubMenu(true)}
            onMouseLeave={() => setShowSubMenu(false)}
          >
            <button className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <Plus size={16} className="text-gray-600 dark:text-gray-400" />
                <span>Add Service</span>
              </div>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {showSubMenu && (
                <motion.div
                  className="absolute left-full top-0 ml-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[180px]"
                  variants={subMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button
                    onClick={() => {
                      onAddGithubService();
                      onClose();
                    }}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Github size={16} className="text-gray-600 dark:text-gray-400" />
                    <span>GitHub</span>
                  </button>
                  <button
                    onClick={() => {
                      onAddDatabaseService();
                      onClose();
                    }}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Database size={16} className="text-gray-600 dark:text-gray-400" />
                    <span>Database</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

          <button
            onClick={() => {
              onAddStickyNote();
              onClose();
            }}
            className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <StickyNote size={16} className="text-gray-600 dark:text-gray-400" />
            <span>Add Sticky Note</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
