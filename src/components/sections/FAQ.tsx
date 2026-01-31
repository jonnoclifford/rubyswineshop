'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { siteConfig } from '@/content/site-config';

export function FAQ() {
  const { faq } = siteConfig;

  return (
    <section className="py-section-lg bg-cream-dark">
      <div className="container mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-display text-display-md text-navy mb-12 text-center">
            {faq.heading}
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faq.items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-navy/10 bg-cream rounded-lg px-6"
                >
                  <AccordionTrigger className="font-display text-heading-sm text-navy hover:text-terracotta">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-md text-navy/80 leading-relaxed pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
