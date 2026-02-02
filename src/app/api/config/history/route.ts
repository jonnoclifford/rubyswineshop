/**
 * API Route: /api/config/history
 *
 * Handles retrieving commit history and reverting to previous versions
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFileHistory, revertToVersion, GitHubAPIError } from '@/lib/github-api';

/**
 * GET /api/config/history
 *
 * Retrieve the commit history for site-config.json
 *
 * Query parameters:
 * - limit: Number of commits to retrieve (default: 50, max: 100)
 *
 * @returns {Array} Array of commits with their details
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(parseInt(limitParam, 10), 100) : 50;

    const commits = await getFileHistory(limit);

    // Transform commits to a cleaner format
    const formattedCommits = commits.map((commit) => ({
      sha: commit.sha,
      shortSha: commit.sha.substring(0, 7),
      message: commit.commit.message,
      author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        date: commit.commit.author.date,
      },
      githubAuthor: commit.author
        ? {
            login: commit.author.login,
            avatarUrl: commit.author.avatar_url,
          }
        : null,
      url: commit.html_url,
    }));

    return NextResponse.json({
      success: true,
      data: formattedCommits,
      count: formattedCommits.length,
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
        error: 'Failed to fetch commit history',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/config/history
 *
 * Revert the site configuration to a previous version
 *
 * Request body:
 * {
 *   sha: string  // Required: The commit SHA to revert to
 * }
 *
 * @returns {object} Information about the revert commit
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.sha) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: sha',
        },
        { status: 400 }
      );
    }

    const { sha } = body as { sha: string };

    // Validate SHA format (40 character hex string)
    if (!/^[a-f0-9]{40}$/i.test(sha)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid SHA format. Expected a 40-character hexadecimal string.',
        },
        { status: 400 }
      );
    }

    // Revert to the specified version
    const result = await revertToVersion(sha);

    return NextResponse.json({
      success: true,
      message: `Successfully reverted to version ${sha.substring(0, 7)}`,
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
        error: 'Failed to revert configuration',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
