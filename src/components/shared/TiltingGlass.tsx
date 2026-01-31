'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltingGlassProps {
  side?: 'left' | 'right';
  marginTop?: string;
  marginBottom?: string;
  desktop?: boolean;
  inline?: boolean;
}

export function TiltingGlass({
  side = 'left',
  marginTop = '-mt-8',
  marginBottom = 'mb-2',
  desktop = false,
  inline = false
}: TiltingGlassProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const glassImage = side === 'left'
    ? '/images/left-glass-cropped.png'
    : '/images/right-glass-cropped.png';

  const horizontalMargin = side === 'left' ? '-ml-5' : 'ml-5';

  if (inline) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-64 h-64"
        style={{
          transformOrigin: 'center 85%',
        }}
      >
        <motion.div
          animate={{
            rotate: [0, -8, 0, 8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.5,
          }}
          style={{
            transformOrigin: 'center 85%',
          }}
        >
          <Image
            src={glassImage}
            alt="Wine glass"
            width={400}
            height={400}
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </motion.div>
    );
  }

  if (desktop) {
    const horizontalPosition = side === 'right' ? 'right-[10%]' : 'left-[10%]';

    return (
      <div className="hidden lg:block relative bg-cream">
        <div className={`absolute ${horizontalPosition} -translate-y-3/4 top-0 z-10`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-64 h-64"
            style={{
              transformOrigin: 'center 85%',
            }}
          >
            <motion.div
              animate={{
                rotate: [0, -8, 0, 8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.5,
              }}
              style={{
                transformOrigin: 'center 85%',
              }}
            >
              <Image
                src={glassImage}
                alt="Wine glass"
                width={400}
                height={400}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`lg:hidden ${marginTop} ${marginBottom} flex justify-center items-center bg-cream`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className={`relative w-28 h-28 ${horizontalMargin}`}
        style={{
          transformOrigin: 'center 85%', // Pivot point near base of glass
        }}
      >
        <motion.div
          animate={{
            rotate: [0, -8, 0, 8, 0], // Tilt left, center, tilt right, center
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.5,
          }}
          style={{
            transformOrigin: 'center 85%',
          }}
        >
          <Image
            src={glassImage}
            alt="Wine glass"
            width={400}
            height={400}
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
