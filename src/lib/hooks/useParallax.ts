import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function useParallax(distance: number = 50) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  return { ref, y };
}
