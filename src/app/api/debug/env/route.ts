/**
 * DEBUG ENDPOINT - Remove after troubleshooting
 * Shows which environment variables are loaded (safely)
 * Use: /api/debug/env?key=debug123
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get('key');

  // Simple key protection
  if (key !== 'debug123') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    env: {
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ? `${process.env.GITHUB_CLIENT_ID.substring(0, 8)}...` : 'MISSING',
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ? 'SET' : 'MISSING',
      GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || 'MISSING',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'MISSING',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'MISSING',
      GITHUB_OWNER: process.env.GITHUB_OWNER || 'MISSING',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
    }
  });
}
