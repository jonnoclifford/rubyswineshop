import { siteConfig } from '@/content/site-config';
import { Instagram, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  const { business } = siteConfig;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-terracotta text-cream py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand with Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo-full.png"
              alt={business.name}
              width={200}
              height={200}
              className="w-48 h-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-body-sm text-cream/90 text-center md:text-left">
              {business.tagline}
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-heading-sm mb-3 text-cream">Get in Touch</h4>
            <div className="space-y-2 flex flex-col items-center md:items-start">
              <a
                href={`tel:${business.contact.phone}`}
                className="flex items-center gap-2 text-body-sm text-cream/90 hover:text-cream transition-colors"
              >
                <Phone className="w-4 h-4" />
                {business.contact.phone}
              </a>
              <a
                href={`mailto:${business.contact.email}`}
                className="flex items-center gap-2 text-body-sm text-cream/90 hover:text-cream transition-colors"
              >
                <Mail className="w-4 h-4" />
                {business.contact.email}
              </a>
              <a
                href={`https://instagram.com/${business.contact.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-body-sm text-cream/90 hover:text-cream transition-colors"
              >
                <Instagram className="w-4 h-4" />
                {business.contact.instagram}
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-heading-sm mb-3 text-cream">Visit Us</h4>
            <address className="text-body-sm text-cream/90 not-italic">
              {business.address.street}<br />
              {business.address.suburb}, {business.address.state} {business.address.postcode}
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/20 text-center">
          <p className="text-body-sm text-cream/80">
            © {currentYear} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
