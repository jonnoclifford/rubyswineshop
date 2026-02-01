/**
 * CMS integration utilities for Tina CMS
 * This module provides functions to fetch and transform content from Tina CMS
 *
 * Note: This file is deprecated. Use tina-client.ts instead.
 */

import { getSiteConfig as getSiteConfigFromClient } from './tina-client';
import type { SiteConfig } from '@/types/content';

/**
 * Fetch site configuration from Tina CMS
 * This function queries the CMS and transforms the response to match our application types
 *
 * @returns Promise<SiteConfig> - The transformed site configuration
 * @deprecated Use getSiteConfig from tina-client.ts instead
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  return getSiteConfigFromClient();
}
