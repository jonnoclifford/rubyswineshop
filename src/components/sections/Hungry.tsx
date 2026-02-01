'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { TiltingGlass } from '@/components/shared/TiltingGlass';
import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/animations';
import { ExternalLink } from 'lucide-react';
import type { HungryContent } from '@/types/content';

interface HungryProps {
  hungry: HungryContent;
}

export function Hungry({ hungry }: HungryProps) {

  return (
    <section className="py-section-lg xl:pt-0 bg-cream text-navy">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Mobile: centered layout, Desktop: two-column layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          {/* Desktop only: Left glass (1/3 width) */}
          <div className="hidden lg:flex lg:w-1/3 lg:justify-center lg:items-center">
            <TiltingGlass side="left" inline={true} />
          </div>

          {/* Content (full width on mobile, 2/3 on desktop) */}
          <div className="w-full lg:w-2/3">
            <div className="max-w-3xl mx-auto text-center lg:text-left">
              <AnimatedSection variants={fadeIn}>
                <h2 className="font-serif text-display-md mb-8 tracking-normal">
                  {hungry.heading}
                </h2>
              </AnimatedSection>

              <AnimatedSection variants={fadeIn} delay={0.2}>
                <div className="space-y-4 mb-8">
                  {hungry.description.map((paragraph, index) => (
                    <p key={index} className="text-body-lg leading-relaxed text-navy/80">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimatedSection>

              {hungry.partnerLink && (
                <AnimatedSection variants={fadeIn} delay={0.4}>
                  <div className="flex justify-center lg:justify-start">
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-2 border-navy text-navy hover:bg-navy hover:text-cream"
                    >
                      <a
                        href={hungry.partnerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        View {hungry.partnerName} Menu
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
