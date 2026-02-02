'use client';

/**
 * Authentication Hook
 *
 * Client-side hook for checking authentication status and user information.
 * This hook fetches the session from the API and provides loading states.
 *
 * Usage:
 * ```tsx
 * const { isAuthenticated, user, isLoading } = useAuth();
 * ```
 */

import { useEffect, useState } from 'react';
import type { GitHubUser } from '@/lib/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: GitHubUser | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session');

        if (!mounted) return;

        if (!response.ok) {
          throw new Error('Failed to check authentication');
        }

        const data = await response.json();

        setState({
          isAuthenticated: data.authenticated,
          user: data.user,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (!mounted) return;

        setState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}

/**
 * Login helper function
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
 * Logout helper function
 */
export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = '/';
}
