'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WineCard } from '@/components/shared/WineCard';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import type { MenuContent, ColorScheme } from '@/types/content';
import { getColorScheme } from '@/lib/color-schemes';

interface MenuProps {
  menu: MenuContent;
  colorScheme?: ColorScheme;
}

export function Menu({ menu, colorScheme }: MenuProps) {
  const scheme = getColorScheme(colorScheme);

  return (
    <section id="menu" className={`py-section-lg ${scheme.bg}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <h2 className={`font-serif text-display-md ${scheme.heading} mb-12 text-center tracking-normal`}>
            {menu.heading}
          </h2>
        </AnimatedSection>
        <div className="mb-16">
          <AnimatedSection>
            <h3 className={`font-serif text-heading-lg ${scheme.accent} mb-8 tracking-normal uppercase`}>
              {menu.byTheGlass.heading}
            </h3>
          </AnimatedSection>

          {menu.byTheGlass.description ? (
            <AnimatedSection>
              <p className={`text-body-lg ${scheme.text} leading-relaxed max-w-2xl`}>
                {menu.byTheGlass.description}
              </p>
            </AnimatedSection>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {menu.byTheGlass.items.map((wine, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <WineCard wine={wine} colorScheme={colorScheme} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="mb-16">
          <AnimatedSection>
            <h3 className={`font-serif text-heading-lg ${scheme.accent} mb-8 tracking-normal uppercase`}>
              {menu.byTheBottle.heading}
            </h3>
          </AnimatedSection>

          <div className="space-y-12">
            {menu.byTheBottle.categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className={`font-serif text-heading-md ${scheme.text} mb-6 tracking-normal uppercase`}>
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
                      <WineCard wine={wine} colorScheme={colorScheme} />
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
