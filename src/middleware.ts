/**
 * Next.js Middleware
 *
 * This middleware protects admin routes by checking authentication
 * before allowing access. If the user is not authenticated, they are
 * redirected to the login page.
 *
 * Protected paths:
 * - /admin/* (except /admin/login)
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Session cookie name - must match the one in lib/auth.ts
const SESSION_COOKIE_NAME = 'admin_session';

/**
 * Checks if a session cookie exists and is not expired
 */
function hasValidSession(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return false;
  }

  try {
    // Decrypt session to check expiration
    const sessionJson = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
    const session = JSON.parse(sessionJson);

    // Check if session has expired
    if (session.expiresAt && session.expiresAt < Date.now()) {
      return false;
    }

    return true;
  } catch {
    // Invalid session cookie
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an admin route (excluding login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const hasSession = hasValidSession(request);

    if (!hasSession) {
      // No valid session - redirect to login
      const loginUrl = new URL('/admin/login', request.url);

      // Preserve the original destination for redirect after login
      loginUrl.searchParams.set('redirect', pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
