import { readFile } from 'fs/promises';
import { join } from 'path';
import type { SiteConfig } from '@/types/content';

export async function getSiteConfig(): Promise<SiteConfig> {
  // In production, fetch from GitHub to get latest content
  if (process.env.NODE_ENV === 'production') {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/${process.env.GITHUB_BRANCH}/src/content/site-config.json`,
        { next: { revalidate: 10 } } // Cache for 10 seconds
      );

      if (response.ok) {
        const config = await response.json() as SiteConfig;
        return config;
      }
    } catch (error) {
      console.error('Error fetching from GitHub:', error);
    }
  }

  // Development: read from local file
  try {
    const configPath = join(process.cwd(), 'src', 'content', 'site-config.json');
    const fileContent = await readFile(configPath, 'utf-8');
    return JSON.parse(fileContent) as SiteConfig;
  } catch (error) {
    console.error('Error reading site configuration:', error);
    const { siteConfig } = await import('@/content/site-config');
    return siteConfig as SiteConfig;
  }
}
