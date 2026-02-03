'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { heroText, staggerContainer, staggerItem } from '@/lib/animations';
import { AnimatedLogo } from '@/components/shared/AnimatedLogo';
import { useParallax } from '@/lib/hooks/useParallax';
import type { HeroContent, ColorScheme } from '@/types/content';
import { getColorScheme } from '@/lib/color-schemes';

interface HeroProps {
  hero: HeroContent;
  colorScheme?: ColorScheme;
}

export function Hero({ hero, colorScheme }: HeroProps) {
  const { ref: parallaxRef, y } = useParallax(100);
  const shouldReduceMotion = useReducedMotion();
  const scheme = getColorScheme(colorScheme);

  return (
    <section ref={parallaxRef} className={`relative h-screen w-full overflow-hidden ${scheme.bg}`}>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-6 lg:px-8 w-full -mt-[80px] xl:mt-0">
            {/* Mobile: Centered Animated Logo with Heading */}
            <div className="xl:hidden flex justify-center items-center">
              <AnimatedLogo showHeading={true} />
            </div>

            {/* Desktop: Two Column Layout - Only show at XL breakpoint */}
            <div className="hidden xl:grid grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Text Content */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-xl"
              >
                <motion.h1
                  variants={heroText}
                  className={`font-serif text-display-md ${scheme.heading} mb-6 tracking-normal`}
                >
                  {hero.headline}
                </motion.h1>

                <motion.p
                  variants={staggerItem}
                  className={`text-body-lg md:text-heading-sm ${scheme.text}`}
                >
                  {hero.subheadline}
                </motion.p>
              </motion.div>

              {/* Right: Animated Logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ y: shouldReduceMotion ? 0 : y }}
                className="flex justify-center items-center"
              >
                <AnimatedLogo />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 md:bottom-8 left-0 right-0 z-10 flex justify-center">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => {
              const aboutSection = document.querySelector('#about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Scroll to next section"
          >
            <ChevronDown className={`w-8 h-8 ${scheme.accent}`} />
          </motion.button>
        </div>
    </section>
  );
}
