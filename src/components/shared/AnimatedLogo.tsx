'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AnimatedLogoProps {
  showHeading?: boolean;
}

export function AnimatedLogo({ showHeading = false }: AnimatedLogoProps) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => setStartAnimation(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[420px] lg:h-[650px] -mt-12 lg:mt-0">
      {/* Type/Text - positioned close to glasses, mobile adjustments */}
      <div
        className={`absolute left-0 right-0 -top-3 lg:top-[30px] transition-all ease-out ${
          startAnimation
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-16'
        }`}
        style={{
          transitionDelay: '800ms',
          transitionDuration: '1150ms',
        }}
      >
        <div className="w-4/5 mx-auto">
          <Image
            src="/images/logo-type.png"
            alt="Ruby's Wine Shop"
            width={700}
            height={220}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Container for glasses - mobile: tighter spacing, desktop: perfected spacing */}
      <div className="absolute left-0 right-0 bottom-[120px] lg:bottom-[110px] h-[280px] lg:h-[500px]">
        {/* Left Glass */}
        <div
          className={`absolute bottom-[21px] lg:bottom-[-12px] transition-all ease-out ${
            startAnimation
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-64'
          }`}
          style={{
            width: '70%',
            left: 'calc(10% + 17px)',
            transitionDelay: '0ms',
            transitionDuration: '1150ms',
          }}
        >
          <Image
            src="/images/logo-left-glass.png"
            alt="Left wine glass"
            width={600}
            height={800}
            className="w-full h-auto lg:hidden"
            priority
          />
        </div>

        {/* Left Glass - Desktop only */}
        <div
          className={`absolute hidden lg:block transition-all ease-out ${
            startAnimation
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-64'
          }`}
          style={{
            width: '77%',
            left: 'calc(13% - 11px)',
            bottom: '-12px',
            transitionDelay: '0ms',
            transitionDuration: '1150ms',
          }}
        >
          <Image
            src="/images/logo-left-glass.png"
            alt="Left wine glass"
            width={600}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Right Glass - Mobile */}
        <div
          className={`absolute bottom-[20px] lg:bottom-[-14px] transition-all ease-out ${
            startAnimation
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-64'
          }`}
          style={{
            width: '70%',
            right: 'calc(10% + 15px)',
            transitionDelay: '0ms',
            transitionDuration: '1150ms',
          }}
        >
          <Image
            src="/images/logo-right-glass.png"
            alt="Right wine glass"
            width={600}
            height={800}
            className="w-full h-auto lg:hidden"
            priority
          />
        </div>

        {/* Right Glass - Desktop only */}
        <div
          className={`absolute hidden lg:block transition-all ease-out ${
            startAnimation
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-64'
          }`}
          style={{
            width: '77%',
            right: 'calc(13% - 11px)',
            bottom: '-14px',
            transitionDelay: '0ms',
            transitionDuration: '1150ms',
          }}
        >
          <Image
            src="/images/logo-right-glass.png"
            alt="Right wine glass"
            width={600}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Heading - appears on mobile under the glasses */}
      {showHeading && (
        <div
          className={`absolute left-0 right-0 transition-all ease-out ${
            startAnimation
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            bottom: '-80px',
            transitionDelay: '1200ms',
            transitionDuration: '1150ms',
          }}
        >
          <h1 className="font-serif font-bold text-heading-lg text-navy text-center px-6 tracking-normal">
            Natural wines meet neighbourhood charm
          </h1>
        </div>
      )}
    </div>
  );
}
