/**
 * API Route: /api/config
 *
 * Handles reading and updating the site-config.json file via GitHub API
 */

import { NextRequest, NextResponse } from 'next/server';
import { readConfig, updateConfig, GitHubAPIError } from '@/lib/github-api';
import type { SiteConfig } from '@/types/content';

/**
 * GET /api/config
 *
 * Fetch the current site configuration from GitHub
 *
 * @returns {SiteConfig} The current site configuration
 */
export async function GET() {
  try {
    const config = await readConfig();

    return NextResponse.json({
      success: true,
      data: config,
    });
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          statusCode: error.statusCode,
        },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch configuration',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/config
 *
 * Update the site configuration on GitHub with a new commit
 *
 * Request body:
 * {
 *   config: SiteConfig,        // Required: The new configuration
 *   commitMessage?: string     // Optional: Custom commit message
 * }
 *
 * @returns {object} Commit information on success
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.config) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: config',
        },
        { status: 400 }
      );
    }

    const config = body.config as SiteConfig;
    const commitMessage = body.commitMessage as string | undefined;

    // Update config on GitHub
    const result = await updateConfig(config, commitMessage);

    return NextResponse.json({
      success: true,
      data: {
        sha: result.commit.sha,
        message: result.commit.message,
        author: result.commit.author.name,
        date: result.commit.author.date,
        url: result.commit.html_url,
      },
    });
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          statusCode: error.statusCode,
        },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update configuration',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
