/**
 * GitHub OAuth Initialization Route
 *
 * This endpoint initiates the GitHub OAuth flow by redirecting
 * the user to GitHub's authorization page.
 *
 * Query Parameters:
 *   - redirect: Optional path to redirect to after successful authentication
 *
 * Example: /api/auth/github?redirect=/admin/dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGitHubAuthUrl } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const redirectTo = searchParams.get('redirect') || undefined;

    // DEBUG: Log environment variables
    console.log('OAuth Debug:', {
      clientId: process.env.GITHUB_CLIENT_ID?.substring(0, 10) + '...',
      callbackUrl: process.env.GITHUB_CALLBACK_URL,
      hasClientSecret: !!process.env.GITHUB_CLIENT_SECRET,
    });

    // Generate GitHub OAuth URL with state for CSRF protection
    const authUrl = await getGitHubAuthUrl(redirectTo);

    // DEBUG: Log generated URL
    console.log('Generated OAuth URL:', authUrl);

    // Redirect user to GitHub authorization page
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error initiating GitHub OAuth:', error);

    return NextResponse.json(
      { error: 'Failed to initiate authentication' },
      { status: 500 }
    );
  }
}
