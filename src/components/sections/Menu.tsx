'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WineCard } from '@/components/shared/WineCard';
import { siteConfig } from '@/content/site-config';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

export function Menu() {
  const { menu } = siteConfig;

  return (
    <section id="menu" className="py-section-lg bg-cream">
      <div className="container mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-serif font-bold text-display-md text-navy mb-12 text-center">
            {menu.heading}
          </h2>
        </AnimatedSection>

        {/* By the Glass */}
        <div className="mb-16">
          <AnimatedSection>
            <h3 className="font-serif font-bold text-heading-lg text-terracotta mb-8">
              {menu.byTheGlass.heading}
            </h3>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {menu.byTheGlass.items.map((wine, index) => (
              <motion.div key={index} variants={staggerItem}>
                <WineCard wine={wine} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* By the Bottle */}
        <div className="mb-16">
          <AnimatedSection>
            <h3 className="font-serif font-bold text-heading-lg text-terracotta mb-8">
              {menu.byTheBottle.heading}
            </h3>
          </AnimatedSection>

          <div className="space-y-12">
            {menu.byTheBottle.categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className="font-serif font-bold text-heading-md text-navy mb-6">
                  {category.name}
                </h4>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {category.items.map((wine, wineIndex) => (
                    <motion.div key={wineIndex} variants={staggerItem}>
                      <WineCard wine={wine} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
