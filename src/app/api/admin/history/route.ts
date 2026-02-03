import { NextRequest, NextResponse } from 'next/server';
import { getFileHistory, revertToVersion } from '@/lib/github-api';
import { getCurrentUser } from '@/lib/auth';

/**
 * GET /api/admin/history
 * Returns the commit history for site-config.json
 */
export async function GET(request: NextRequest) {
  // Check authentication
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get query parameter for limit (default to 20 most recent commits)
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const commits = await getFileHistory(limit);

    // Format commits for frontend
    const formattedCommits = commits.map(commit => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      htmlUrl: commit.html_url,
      avatarUrl: commit.author?.avatar_url,
    }));

    return NextResponse.json({ commits: formattedCommits });
  } catch (error) {
    console.error('Failed to fetch history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/history/revert
 * Reverts the config to a previous version
 */
export async function POST(request: NextRequest) {
  // Check authentication
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { sha } = await request.json();

    if (!sha || typeof sha !== 'string') {
      return NextResponse.json(
        { error: 'Invalid SHA provided' },
        { status: 400 }
      );
    }

    const result = await revertToVersion(sha);

    return NextResponse.json({
      success: true,
      commit: {
        sha: result.commit.sha,
        message: result.commit.message,
      },
    });
  } catch (error) {
    console.error('Failed to revert version:', error);
    return NextResponse.json(
      { error: 'Failed to revert to previous version' },
      { status: 500 }
    );
  }
}
