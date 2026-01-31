'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  variants,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
