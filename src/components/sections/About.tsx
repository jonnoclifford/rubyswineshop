'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { slideInLeft, slideInRight } from '@/lib/animations';
import Image from 'next/image';
import type { AboutContent } from '@/types/content';

interface AboutProps {
  about: AboutContent;
}

export function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-section-lg bg-cream">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <AnimatedSection variants={slideInLeft} className="lg:col-span-2">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl max-w-md mx-auto lg:mx-0">
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                className="object-cover object-[40%]"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
                quality={90}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection variants={slideInRight} className="lg:col-span-3">
            <div>
              <h2 className="font-serif text-display-md text-navy mb-6 tracking-normal">
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
