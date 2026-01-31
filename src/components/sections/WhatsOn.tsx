'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { EventCard } from '@/components/shared/EventCard';
import { siteConfig } from '@/content/site-config';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function WhatsOn() {
  const { whatsOn } = siteConfig;

  return (
    <section id="whats-on" className="py-section-lg bg-terracotta">
      <div className="container mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-serif font-bold text-display-md text-cream mb-12 text-center tracking-wide">
            {whatsOn.heading}
          </h2>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {whatsOn.events.map((event, index) => (
            <motion.div key={index} variants={staggerItem} className="h-full">
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
