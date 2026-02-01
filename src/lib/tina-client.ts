/**
 * Tina CMS Client Wrapper
 *
 * This module provides a simplified interface for fetching content from TinaCMS
 * in Next.js 15 App Router server components.
 *
 * Features:
 * - Type-safe content fetching with generated TypeScript types
 * - Graceful error handling with fallback data
 * - Optimized for server components
 * - Easy-to-use helper functions
 */

import { siteConfig as fallbackConfig } from '@/content/site-config';
import type { SiteConfig } from '@/types/content';

// Re-export types for convenience
export type { SiteConfig } from '@/types/content';

/**
 * Configuration for the Tina client
 */
const TINA_CONFIG = {
  // The relative path to the site config file in the CMS
  siteConfigPath: 'site-config.json',
  // Whether to use fallback data on error
  useFallback: true,
  // Log errors to console (useful for debugging)
  logErrors: process.env.NODE_ENV === 'development',
} as const;

/**
 * Fetches the main site configuration from TinaCMS
 *
 * @returns The complete site configuration object
 * @throws Will return fallback data if fetching fails and fallback is enabled
 *
 * @example
 * ```tsx
 * // In a server component
 * export default async function Page() {
 *   const config = await getSiteConfig();
 *   return <div>{config.business.name}</div>;
 * }
 * ```
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  // For now, always use fallback in local mode
  // The Tina admin interface will still work through the dev server at /admin
  if (process.env.TINA_PUBLIC_IS_LOCAL === 'true') {
    if (TINA_CONFIG.logErrors) {
      console.log('Local mode: Using fallback configuration. Admin edits will work at /admin');
    }
    return fallbackConfig as SiteConfig;
  }

  // For cloud mode, try to use Tina client
  try {
    const clientModule = await import('../../.tina/__generated__/client');
    const client = clientModule.client || clientModule.default;

    if (!client || !client.queries?.siteConfig) {
      throw new Error('Tina client not available or siteConfig query not found');
    }

    const result = await client.queries.siteConfig({
      relativePath: TINA_CONFIG.siteConfigPath,
    });

    if (!result?.data?.siteConfig) {
      throw new Error('No site config data returned from TinaCMS');
    }

    // Remove Tina metadata and return clean data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _sys, _values, id, __typename, ...cleanData } = result.data.siteConfig;

    return cleanData as SiteConfig;
  } catch (error) {
    if (TINA_CONFIG.logErrors) {
      console.error('Error fetching site config from TinaCMS:', error);
      console.log('Using fallback configuration');
    }

    if (TINA_CONFIG.useFallback) {
      return fallbackConfig as SiteConfig;
    }

    throw error;
  }
}

/**
 * Fetches business information from the site config
 *
 * @returns The business information object
 *
 * @example
 * ```tsx
 * const business = await getBusinessInfo();
 * console.log(business.name); // "Ruby's Wine Bar"
 * ```
 */
export async function getBusinessInfo() {
  const config = await getSiteConfig();
  return config.business;
}

/**
 * Fetches hero section data
 *
 * @returns The hero section configuration
 */
export async function getHeroData() {
  const config = await getSiteConfig();
  return config.hero;
}

/**
 * Fetches about section data
 *
 * @returns The about section configuration
 */
export async function getAboutData() {
  const config = await getSiteConfig();
  return config.about;
}

/**
 * Fetches menu data
 *
 * @returns The complete menu configuration
 */
export async function getMenuData() {
  const config = await getSiteConfig();
  return config.menu;
}

/**
 * Fetches events/what's on data
 *
 * @returns The events configuration
 */
export async function getEventsData() {
  const config = await getSiteConfig();
  return config.whatsOn;
}

/**
 * Fetches FAQ data
 *
 * @returns The FAQ configuration
 */
export async function getFAQData() {
  const config = await getSiteConfig();
  return config.faq;
}

/**
 * Fetches SEO metadata
 *
 * @returns The SEO configuration
 */
export async function getSEOData() {
  const config = await getSiteConfig();
  return config.seo;
}
