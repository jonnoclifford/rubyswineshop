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

    const config = await readConfig();
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
