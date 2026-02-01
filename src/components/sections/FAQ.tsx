'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { slideInLeft, slideInRight } from '@/lib/animations';
import type { FAQContent } from '@/types/content';

interface FAQProps {
  faq: FAQContent;
}

export function FAQ({ faq }: FAQProps) {

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
              <Accordion type="single" collapsible>
                {faq.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-navy/10 py-2"
                  >
                    <AccordionTrigger className="text-body-lg text-navy hover:text-terracotta tracking-normal font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-body-md text-navy/70 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>

            {/* Image */}
            {faq.image && (
              <AnimatedSection delay={0.4} variants={slideInRight} className="lg:col-span-2">
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl sticky top-8">
                  <Image
                    src={faq.image.src}
                    alt={faq.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    loading="lazy"
                    quality={85}
                  />
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
