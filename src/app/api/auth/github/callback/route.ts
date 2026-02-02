/**
 * GitHub OAuth Callback Route
 *
 * This endpoint handles the OAuth callback from GitHub after the user
 * authorizes the application. It exchanges the authorization code for
 * an access token, verifies the user is authorized, and creates a session.
 *
 * Query Parameters:
 *   - code: Authorization code from GitHub
 *   - state: CSRF protection state parameter
 *
 * Success: Redirects to /admin or the specified redirect path
 * Failure: Redirects to / with error parameter
 */

import { NextRequest, NextResponse } from 'next/server';
import { handleGitHubCallback } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // Validate required parameters
  if (!code || !state) {
    console.error('Missing code or state parameter');
    return NextResponse.redirect(
      new URL('/?auth_error=invalid_callback', request.url)
    );
  }

  try {
    // Handle OAuth callback and create session
    const result = await handleGitHubCallback(code, state);

    if (!result) {
      // Authentication failed (invalid state or unauthorized user)
      return NextResponse.redirect(
        new URL('/?auth_error=unauthorized', request.url)
      );
    }

    // Success - redirect to admin panel or specified path
    const redirectPath = result.redirectTo || '/admin';
    const redirectUrl = new URL(redirectPath, request.url);

    // Add success indicator
    redirectUrl.searchParams.set('auth_success', 'true');

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('GitHub OAuth callback error:', error);

    return NextResponse.redirect(
      new URL('/?auth_error=server_error', request.url)
    );
  }
}
