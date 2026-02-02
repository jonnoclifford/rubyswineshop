/**
 * Session Check Route
 *
 * This endpoint returns the current authentication status and user information.
 * Use this from client components to check if the user is authenticated.
 *
 * Method: GET
 * Returns: { authenticated: boolean, user: GitHubUser | null }
 */

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();

    return NextResponse.json({
      authenticated: user !== null,
      user,
    });
  } catch (error) {
    console.error('Session check error:', error);

    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 200 }
    );
  }
}
