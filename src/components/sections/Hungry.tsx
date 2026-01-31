'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site-config';
import { fadeIn } from '@/lib/animations';
import { ExternalLink } from 'lucide-react';

export function Hungry() {
  const { hungry } = siteConfig;

  return (
    <section className="py-section-lg bg-cream text-navy">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection variants={fadeIn}>
            <h2 className="font-display text-display-md mb-8">
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
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
