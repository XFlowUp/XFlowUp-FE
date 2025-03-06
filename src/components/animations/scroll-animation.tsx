'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
}

export function ScrollAnimation({ children, delay = 0, ...props }: ScrollAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        bounce: 0.3,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
