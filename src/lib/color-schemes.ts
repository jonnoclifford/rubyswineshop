/**
 * Color Scheme System
 *
 * Provides consistent color schemes that can be applied to any section.
 * Each scheme includes background, text, heading, and accent colors.
 *
 * IMPORTANT: All class names must be complete strings (not template literals)
 * so Tailwind's JIT compiler can detect and include them in the build.
 */

import type { ColorScheme } from '@/types/content';

export interface ColorSchemeStyles {
  // Complete class names for Tailwind JIT
  bgClass: string;
  textClass: string;
  headingClass: string;
  accentClass: string;
}

export const COLOR_SCHEMES: Record<ColorScheme, ColorSchemeStyles> = {
  light: {
    bgClass: 'bg-cream',
    textClass: 'text-navy/80',
    headingClass: 'text-navy',
    accentClass: 'text-terracotta',
  },
  dark: {
    bgClass: 'bg-navy',
    textClass: 'text-cream/90',
    headingClass: 'text-cream',
    accentClass: 'text-terracotta',
  },
  terracotta: {
    bgClass: 'bg-terracotta',
    textClass: 'text-cream/95',
    headingClass: 'text-cream',
    accentClass: 'text-cream',
  },
  cream: {
    bgClass: 'bg-cream',
    textClass: 'text-navy/80',
    headingClass: 'text-terracotta',
    accentClass: 'text-navy',
  },
} as const;

// Legacy property names for backwards compatibility
export interface ColorSchemeStylesLegacy {
  bg: string;
  text: string;
  heading: string;
  accent: string;
}

/**
 * Get color scheme styles for a section
 * Returns 'light' as default if no scheme is specified
 */
export function getColorScheme(scheme?: ColorScheme): ColorSchemeStylesLegacy {
  const colors = COLOR_SCHEMES[scheme || 'light'];
  return {
    bg: colors.bgClass,
    text: colors.textClass,
    heading: colors.headingClass,
    accent: colors.accentClass,
  };
}

/**
 * Human-readable labels for color schemes
 */
export const COLOR_SCHEME_LABELS: Record<ColorScheme, string> = {
  light: 'Light (Cream background)',
  dark: 'Dark (Navy background)',
  terracotta: 'Terracotta',
  cream: 'Cream Alternative',
};
