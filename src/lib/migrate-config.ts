/**
 * Configuration Migration Utilities
 *
 * Ensures backwards compatibility when upgrading to new config structures.
 * Automatically adds default settings for new features.
 */

import type { SiteConfig, SectionSettings } from '@/types/content';

/**
 * Migrate to Phase 1: Add section settings if missing
 * Provides sensible defaults based on current site design
 */
export function migrateToPhase1(config: SiteConfig): SiteConfig {
  // If sectionSettings already exists, return as-is
  if (config.sectionSettings) {
    return config;
  }

  // Add default section settings matching current design
  const defaultSectionSettings: SectionSettings = {
    hero: {
      enabled: true,
      order: 0,
      colorScheme: 'dark', // Hero currently has dark background
    },
    about: {
      enabled: true,
      order: 1,
      colorScheme: 'light', // About section uses cream background
    },
    menu: {
      enabled: true,
      order: 2,
      colorScheme: 'cream', // Menu section
    },
    hungry: {
      enabled: true,
      order: 3,
      colorScheme: 'light', // Hungry section uses light background
    },
    whatsOn: {
      enabled: true,
      order: 4,
      colorScheme: 'terracotta', // Events section with terracotta
    },
    faq: {
      enabled: true,
      order: 5,
      colorScheme: 'light', // FAQ with light background
    },
    findUs: {
      enabled: true,
      order: 6,
      colorScheme: 'cream', // Find Us section
    },
  };

  return {
    ...config,
    sectionSettings: defaultSectionSettings,
  };
}

/**
 * Ensure config has all required fields for the current version
 */
export function ensureConfigVersion(config: SiteConfig): SiteConfig {
  return migrateToPhase1(config);
}
