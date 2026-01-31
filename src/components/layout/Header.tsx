'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { siteConfig } from '@/content/site-config';
import { VisitUsModal } from '@/components/shared/VisitUsModal';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: "What's On", href: '#whats-on' },
  { name: 'Find Us', href: '#find-us' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // On mobile, only show header after scrolling past most of hero section
      const scrollThreshold = window.innerWidth < 768 ? window.innerHeight * 0.7 : 20;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    handleScroll(); // Check initial state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-sm shadow-sm translate-y-0 opacity-100'
            : 'bg-transparent md:translate-y-0 md:opacity-100 -translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="relative flex items-center hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Image
                src="/logo-text.png"
                alt={siteConfig.business.name}
                width={180}
                height={80}
                className="h-12 w-auto object-contain"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-body-sm uppercase tracking-[0.08em] text-navy hover:text-terracotta transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <MagneticButton
                magnetic
                magneticStrength={0.25}
                onClick={() => setIsModalOpen(true)}
                className="bg-terracotta hover:bg-terracotta-dark text-cream uppercase"
              >
                Visit Us
              </MagneticButton>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-navy p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden pb-6 pt-2 border-t border-navy/10">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-body-md text-navy hover:text-terracotta transition-colors py-2"
                  >
                    {link.name}
                  </a>
                ))}
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="bg-terracotta hover:bg-terracotta-dark text-cream w-full uppercase"
                >
                  Visit Us
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <VisitUsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
