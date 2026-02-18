'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EventCard } from '@/components/shared/EventCard';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import type { WhatsOnContent, ColorScheme } from '@/types/content';
import { getColorScheme } from '@/lib/color-schemes';

interface WhatsOnProps {
  whatsOn: WhatsOnContent;
  colorScheme?: ColorScheme;
}

export function WhatsOn({ whatsOn, colorScheme }: WhatsOnProps) {
  const scheme = getColorScheme(colorScheme);

  return (
    <section id="whats-on" className={`py-section-lg ${scheme.bg}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <h2 className={`font-serif text-display-md ${scheme.heading} mb-12 text-center tracking-normal`}>
            {whatsOn.heading}
          </h2>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto"
        >
          {whatsOn.events.map((event, index) => (
            <motion.div key={index} variants={staggerItem} className="h-full w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
              <EventCard event={event} colorScheme={colorScheme} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
