/**
 * DEBUG ENDPOINT - Remove after troubleshooting
 * Shows which environment variables are loaded (safely)
 */

import { NextResponse } from 'next/server';

export async function GET() {
  // Only allow in development/preview, not production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Debug endpoint disabled in production' }, { status: 403 });
  }

  return NextResponse.json({
    env: {
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ? `${process.env.GITHUB_CLIENT_ID.substring(0, 8)}...` : 'MISSING',
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ? 'SET' : 'MISSING',
      GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || 'MISSING',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'MISSING',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'MISSING',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
    }
  });
}
