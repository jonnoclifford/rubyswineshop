/**
 * API Route: /api/admin/config
 *
 * Protected admin endpoint for reading and updating site configuration
 * Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { readConfig, updateConfig, GitHubAPIError } from '@/lib/github-api';
import type { SiteConfig } from '@/types/content';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * GET /api/admin/config
 *
 * Fetch the current site configuration (authenticated)
 */
export async function GET() {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // In development, read from local file for instant updates
    let config: SiteConfig;
    if (process.env.NODE_ENV === 'development') {
      try {
        const configPath = join(process.cwd(), 'src', 'content', 'site-config.json');
        const fileContent = readFileSync(configPath, 'utf-8');
        config = JSON.parse(fileContent) as SiteConfig;
        console.log('📖 Reading from local config file (dev mode)');
      } catch (localError) {
        console.warn('⚠️ Failed to read local config, falling back to GitHub:', localError);
        config = await readConfig();
      }
    } else {
      config = await readConfig();
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to fetch config:', error);

    if (error instanceof GitHubAPIError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch configuration' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/config
 *
 * Update the site configuration (authenticated)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const config = await request.json() as SiteConfig;

    // Create a descriptive commit message
    const commitMessage = `Update site configuration via admin panel\n\nUpdated by: ${user.email || user.name || 'Admin'}`;

    // Update config on GitHub
    const result = await updateConfig(config, commitMessage);

    // In development, also write to local file for immediate preview
    if (process.env.NODE_ENV === 'development') {
      try {
        const configPath = join(process.cwd(), 'src', 'content', 'site-config.json');
        writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
        console.log('✅ Local config file updated for dev preview');
      } catch (localError) {
        console.warn('⚠️ Failed to update local config file:', localError);
        // Don't fail the request - GitHub update succeeded
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        sha: result.commit.sha,
        message: result.commit.message,
      },
    });
  } catch (error) {
    console.error('Failed to update config:', error);

    if (error instanceof GitHubAPIError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update configuration' },
      { status: 500 }
    );
  }
}
