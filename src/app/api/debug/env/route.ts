/**
 * Debug endpoint - TEMPORARY
 * Shows environment variable status (not values)
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasClientId: !!process.env.GITHUB_CLIENT_ID,
    hasClientSecret: !!process.env.GITHUB_CLIENT_SECRET,
    hasToken: !!process.env.GITHUB_TOKEN,
    hasAuthorizedUsers: !!process.env.GITHUB_AUTHORIZED_USERS,
    authorizedUsersLength: (process.env.GITHUB_AUTHORIZED_USERS || '').length,
    authorizedUsersValue: process.env.GITHUB_AUTHORIZED_USERS, // Showing value for debugging
    nodeEnv: process.env.NODE_ENV,
  });
}
