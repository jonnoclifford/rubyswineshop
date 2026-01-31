'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site-config';
import { MapPin, Phone, Mail } from 'lucide-react';

interface VisitUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VisitUsModal({ open, onOpenChange }: VisitUsModalProps) {
  const { walkInModal, business } = siteConfig;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-cream border-terracotta/20">
        <DialogHeader>
          <DialogTitle className="font-serif text-heading-lg text-navy">
            {walkInModal.heading}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Information about our walk-in only policy
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {walkInModal.message.map((paragraph, index) => (
            <p key={index} className="text-body-md text-navy/80 leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="pt-4 border-t border-navy/10">
            <h3 className="font-serif text-heading-sm text-navy mb-3">
              {walkInModal.hoursHeading}
            </h3>
            <div className="space-y-2">
              {Object.entries(business.hours).map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between text-body-sm"
                >
                  <span className="text-navy/70">{day}</span>
                  <span className={hours === 'Closed' ? 'text-navy/40' : 'text-navy font-medium'}>
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-navy/10 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
              <div className="text-body-sm text-navy/80">
                {business.address.street}<br />
                {business.address.suburb}, {business.address.state} {business.address.postcode}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-terracotta flex-shrink-0" />
              <a
                href={`tel:${business.contact.phone}`}
                className="text-body-sm text-navy/80 hover:text-terracotta transition-colors"
              >
                {business.contact.phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-terracotta flex-shrink-0" />
              <a
                href={`mailto:${business.contact.email}`}
                className="text-body-sm text-navy/80 hover:text-terracotta transition-colors"
              >
                {business.contact.email}
              </a>
            </div>
          </div>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-terracotta hover:bg-terracotta-dark text-cream uppercase"
          >
            {walkInModal.ctaText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
