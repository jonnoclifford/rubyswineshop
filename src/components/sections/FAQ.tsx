'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { siteConfig } from '@/content/site-config';
import Image from 'next/image';
import { slideInLeft, slideInRight } from '@/lib/animations';

export function FAQ() {
  const { faq } = siteConfig;

  return (
    <section className="py-section-lg bg-cream-dark">
      <div className="container mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-serif text-display-md text-navy mb-12 text-center tracking-normal">
            {faq.heading}
          </h2>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* FAQ Items */}
            <AnimatedSection delay={0.2} variants={slideInLeft} className="lg:col-span-3">
              <Accordion type="single" collapsible className="space-y-4">
                {faq.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-navy/10 bg-cream rounded-lg px-6"
                  >
                    <AccordionTrigger className="font-serif text-heading-sm text-navy hover:text-terracotta tracking-normal">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-body-md text-navy/80 leading-relaxed pt-2">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection delay={0.4} variants={slideInRight} className="lg:col-span-2">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl sticky top-8">
                <Image
                  src="/images/storefront-window.png"
                  alt="Ruby's Wine Shop storefront window with logo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
