'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { slideInLeft, slideInRight, fadeIn } from '@/lib/animations';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import Image from 'next/image';
import type { FindUsContent, BusinessInfo } from '@/types/content';

interface FindUsProps {
  findUs: FindUsContent;
  business: BusinessInfo;
}

export function FindUs({ findUs, business }: FindUsProps) {

  return (
    <section id="find-us" className="py-section-lg bg-cream">
      <div className="container mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-serif tracking-normal text-display-md text-navy mb-12 text-center">
            {findUs.heading}
          </h2>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto">
          {/* Storefront Image */}
          {findUs.image && (
            <AnimatedSection variants={fadeIn}>
              <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-lg overflow-hidden shadow-xl mb-12">
                <Image
                  src={findUs.image.src}
                  alt={findUs.image.alt}
                  fill
                  className="object-cover object-bottom"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  loading="lazy"
                  quality={90}
                />
              </div>
            </AnimatedSection>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <AnimatedSection variants={slideInLeft}>
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={findUs.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ruby's Wine Bar location"
              />
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection variants={slideInRight}>
            <div>
              <h3 className="font-serif tracking-normal text-heading-lg text-navy mb-6">
                {findUs.contactHeading}
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif tracking-normal text-heading-sm text-navy mb-1">
                      Address
                    </h4>
                    <address className="text-body-md text-navy/80 not-italic">
                      {business.address.street}<br />
                      {business.address.suburb}, {business.address.state} {business.address.postcode}
                    </address>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif tracking-normal text-heading-sm text-navy mb-1">
                      Phone
                    </h4>
                    <a
                      href={`tel:${business.contact.phone}`}
                      className="text-body-md text-navy/80 hover:text-terracotta transition-colors"
                    >
                      {business.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif tracking-normal text-heading-sm text-navy mb-1">
                      Email
                    </h4>
                    <a
                      href={`mailto:${business.contact.email}`}
                      className="text-body-md text-navy/80 hover:text-terracotta transition-colors"
                    >
                      {business.contact.email}
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <Instagram className="w-6 h-6 text-terracotta flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif tracking-normal text-heading-sm text-navy mb-1">
                      Instagram
                    </h4>
                    <a
                      href={`https://instagram.com/${business.contact.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-md text-navy/80 hover:text-terracotta transition-colors"
                    >
                      {business.contact.instagram}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="pt-6 border-t border-navy/10">
                  <h4 className="font-serif tracking-normal text-heading-sm text-navy mb-4">
                    Opening Hours
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(business.hours).map(([day, hours]) => (
                      <div
                        key={day}
                        className="flex justify-between text-body-md"
                      >
                        <span className="text-navy/70">{day}</span>
                        <span className={hours === 'Closed' ? 'text-navy/40' : 'text-navy font-medium'}>
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
