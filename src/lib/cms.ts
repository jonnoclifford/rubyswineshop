import { readFile } from 'fs/promises';
import { join } from 'path';
import type { SiteConfig } from '@/types/content';

export async function getSiteConfig(): Promise<SiteConfig> {
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
