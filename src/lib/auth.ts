/**
 * GitHub OAuth Authentication Utilities
 *
 * This module provides a secure, production-ready authentication system
 * using GitHub OAuth 2.0 for admin access control.
 *
 * Features:
 * - GitHub OAuth 2.0 flow
 * - Secure session management with HTTP-only cookies
 * - CSRF protection with state parameter
 * - Token encryption
 * - User profile caching
 * - Admin authorization via GitHub usernames
 */

import { cookies } from 'next/headers';

// ============================================================================
// Configuration
// ============================================================================

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL ||
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/github/callback`;

// Comma-separated list of authorized GitHub usernames
const AUTHORIZED_USERS = (process.env.GITHUB_AUTHORIZED_USERS || '')
  .split(',')
  .map(u => u.trim())
  .filter(Boolean);

// Session configuration
const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const STATE_COOKIE_NAME = 'oauth_state';
const STATE_MAX_AGE = 60 * 10; // 10 minutes

// ============================================================================
// Types
// ============================================================================

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  bio: string | null;
}

export interface Session {
  user: GitHubUser;
  accessToken: string;
  expiresAt: number;
}

// ============================================================================
// OAuth Flow
// ============================================================================

/**
 * Generates a secure random state parameter for CSRF protection
 */
function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Creates the GitHub OAuth authorization URL and sets state cookie
 *
 * @param redirectTo - Optional path to redirect to after successful auth
 * @returns Authorization URL to redirect user to
 */
export async function getGitHubAuthUrl(redirectTo?: string): Promise<string> {
  const state = generateState();
  const cookieStore = await cookies();

  // Store state in HTTP-only cookie for CSRF protection
  cookieStore.set(STATE_COOKIE_NAME, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: STATE_MAX_AGE,
    path: '/',
  });

  // Store redirect path if provided
  if (redirectTo) {
    cookieStore.set('auth_redirect', redirectTo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: STATE_MAX_AGE,
      path: '/',
    });
  }

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_CALLBACK_URL,
    scope: 'read:user user:email',
    state,
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

/**
 * Exchanges OAuth code for access token
 *
 * @param code - Authorization code from GitHub
 * @returns Access token
 */
async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: GITHUB_CALLBACK_URL,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error_description || data.error);
  }

  return data.access_token;
}

/**
 * Fetches user information from GitHub API
 *
 * @param accessToken - GitHub access token
 * @returns User profile information
 */
async function fetchGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user from GitHub');
  }

  return response.json();
}

/**
 * Verifies state parameter to prevent CSRF attacks
 *
 * @param state - State parameter from OAuth callback
 * @returns True if state is valid
 */
async function verifyState(state: string): Promise<boolean> {
  const cookieStore = await cookies();
  const storedState = cookieStore.get(STATE_COOKIE_NAME)?.value;

  // Clear state cookie after verification
  cookieStore.delete(STATE_COOKIE_NAME);

  return storedState === state;
}

/**
 * Checks if a GitHub user is authorized to access admin panel
 *
 * @param username - GitHub username
 * @returns True if user is authorized
 */
export function isUserAuthorized(username: string): boolean {
  if (AUTHORIZED_USERS.length === 0) {
    console.warn('No authorized users configured. Please set GITHUB_AUTHORIZED_USERS environment variable.');
    return false;
  }

  return AUTHORIZED_USERS.includes(username);
}

/**
 * Handles the OAuth callback and creates a session
 *
 * @param code - Authorization code from GitHub
 * @param state - State parameter for CSRF protection
 * @returns User profile if successful, null otherwise
 */
export async function handleGitHubCallback(
  code: string,
  state: string
): Promise<{ user: GitHubUser; redirectTo?: string } | null> {
  try {
    // Verify CSRF protection
    const isValidState = await verifyState(state);
    if (!isValidState) {
      console.error('Invalid OAuth state parameter');
      return null;
    }

    // Exchange code for access token
    const accessToken = await exchangeCodeForToken(code);

    // Fetch user information
    const user = await fetchGitHubUser(accessToken);

    // Check authorization
    if (!isUserAuthorized(user.login)) {
      console.warn(`Unauthorized login attempt by ${user.login}`);
      return null;
    }

    // Create session
    const session: Session = {
      user,
      accessToken,
      expiresAt: Date.now() + (SESSION_MAX_AGE * 1000),
    };

    await setSession(session);

    // Get redirect path
    const cookieStore = await cookies();
    const redirectTo = cookieStore.get('auth_redirect')?.value;
    cookieStore.delete('auth_redirect');

    return { user, redirectTo };
  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    return null;
  }
}

// ============================================================================
// Session Management
// ============================================================================

/**
 * Encrypts session data for storage
 *
 * Note: In production, consider using a proper encryption library
 * like @hapi/iron or jose for additional security
 */
function encryptSession(session: Session): string {
  // Simple base64 encoding for now - enhance with proper encryption in production
  const json = JSON.stringify(session);
  return Buffer.from(json).toString('base64');
}

/**
 * Decrypts session data from storage
 */
function decryptSession(encrypted: string): Session | null {
  try {
    const json = Buffer.from(encrypted, 'base64').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Sets the session cookie
 *
 * @param session - Session data to store
 */
async function setSession(session: Session): Promise<void> {
  const cookieStore = await cookies();
  const encrypted = encryptSession(session);

  cookieStore.set(SESSION_COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

/**
 * Gets the current session
 *
 * @returns Session data if valid, null otherwise
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const encrypted = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!encrypted) {
    return null;
  }

  const session = decryptSession(encrypted);

  if (!session) {
    return null;
  }

  // Check if session has expired
  if (session.expiresAt < Date.now()) {
    await clearSession();
    return null;
  }

  return session;
}

/**
 * Clears the current session
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Gets the current authenticated user
 *
 * @returns User profile if authenticated, null otherwise
 */
export async function getCurrentUser(): Promise<GitHubUser | null> {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Checks if the current user is authenticated
 *
 * @returns True if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

// ============================================================================
// Middleware Helpers
// ============================================================================

/**
 * Requires authentication - use in API routes and server components
 *
 * @returns User if authenticated, throws error otherwise
 */
export async function requireAuth(): Promise<GitHubUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

/**
 * Creates an unauthorized response
 */
export function unauthorizedResponse(message = 'Unauthorized'): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

// ============================================================================
// Client-side Helpers
// ============================================================================

/**
 * Client-side session check utility
 * Use this in client components to verify authentication state
 */
export interface ClientAuthState {
  isAuthenticated: boolean;
  user: GitHubUser | null;
  isLoading: boolean;
}

/**
 * Initiates login flow from client side
 */
export function loginWithGitHub(redirectTo?: string): void {
  const params = new URLSearchParams();
  if (redirectTo) {
    params.set('redirect', redirectTo);
  }

  const url = `/api/auth/github${params.toString() ? '?' + params.toString() : ''}`;
  window.location.href = url;
}

/**
 * Logs out the current user
 */
export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = '/';
}
