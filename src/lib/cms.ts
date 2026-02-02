/**
 * CMS integration utilities for Decap CMS
 * This module provides functions to fetch site configuration
 * managed through Decap CMS
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { SiteConfig } from '@/types/content';

/**
 * Fetch site configuration from Decap CMS JSON file
 * This reads the site-config.json file that is managed by Decap CMS
 *
 * @returns Promise<SiteConfig> - The site configuration
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const configPath = join(process.cwd(), 'src', 'content', 'site-config.json');
    const fileContent = await readFile(configPath, 'utf-8');
    const config = JSON.parse(fileContent);
    return config as SiteConfig;
  } catch (error) {
    console.error('Error reading site configuration:', error);
    // Fallback to TypeScript config if JSON fails
    const { siteConfig } = await import('@/content/site-config');
    return siteConfig as SiteConfig;
  }
}

/**
 * Fetches business information from the site config
 */
export async function getBusinessInfo() {
  const config = await getSiteConfig();
  return config.business;
}

/**
 * Fetches hero section data
 */
export async function getHeroData() {
  const config = await getSiteConfig();
  return config.hero;
}

/**
 * Fetches about section data
 */
export async function getAboutData() {
  const config = await getSiteConfig();
  return config.about;
}

/**
 * Fetches menu data
 */
export async function getMenuData() {
  const config = await getSiteConfig();
  return config.menu;
}

/**
 * Fetches events/what's on data
 */
export async function getEventsData() {
  const config = await getSiteConfig();
  return config.whatsOn;
}

/**
 * Fetches FAQ data
 */
export async function getFAQData() {
  const config = await getSiteConfig();
  return config.faq;
}

/**
 * Fetches SEO metadata
 */
export async function getSEOData() {
  const config = await getSiteConfig();
  return config.seo;
}
