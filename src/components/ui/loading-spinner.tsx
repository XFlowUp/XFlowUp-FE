'use client';

import { cn } from '@/shared/lib/utils';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
}

export function LoadingSpinner({
  className,
  size = 'md',
  color = 'primary',
  text,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    white: 'border-white',
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const spinTransition = {
    repeat: Infinity,
    ease: 'linear',
    duration: 1,
  };

  return (
    <motion.div
      className={cn('flex flex-col items-center justify-center', className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="relative">
        <motion.div
          className={cn('border-2 rounded-full border-t-transparent', sizes[size], colors[color])}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
      </div>

      {text && (
        <motion.p
          className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}

interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
}

export function LoadingDots({ className, size = 'md', color = 'primary', text }: LoadingDotsProps) {
  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  const dotColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    white: 'bg-white',
  };

  const dotContainerSizes = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    initial: { scale: 0.5, opacity: 0.3 },
    animate: {
      scale: [0.5, 1, 0.5],
      opacity: [0.3, 1, 0.3],
      transition: {
        repeat: Infinity,
        duration: 1.2,
      },
    },
  };

  return (
    <motion.div
      className={cn('flex flex-col items-center justify-center', className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div className={cn('flex items-center justify-center', dotContainerSizes[size])}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className={cn('rounded-full', dotSizes[size], dotColors[color])}
            variants={dotVariants}
            custom={i}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 1.2,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {text && (
        <motion.p
          className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingSpinner size="lg" text="Loading..." />
      </motion.div>
    </div>
  );
}

export function LoadingPageWithDots() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingDots size="lg" text="Loading..." />
      </motion.div>
    </div>
  );
}
