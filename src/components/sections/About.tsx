'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { siteConfig } from '@/content/site-config';
import { slideInLeft, slideInRight } from '@/lib/animations';
import Image from 'next/image';

export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="py-section-lg bg-cream">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <AnimatedSection variants={slideInLeft}>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/storefront-day.png"
                alt="Ruby's Wine Shop storefront in Albion"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection variants={slideInRight}>
            <div>
              <h2 className="font-serif font-bold text-display-md text-navy mb-6 tracking-normal">
                {about.heading}
              </h2>

              <div className="space-y-4">
                {about.story.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-body-lg text-navy/80 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
