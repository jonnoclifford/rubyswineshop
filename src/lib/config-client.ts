/**
 * Client-side utilities for interacting with the GitHub config API
 *
 * This module provides type-safe client-side functions for reading,
 * updating, and managing site configuration through the API routes.
 */

import type { SiteConfig } from '@/types/content';

/**
 * API response wrapper
 */
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
  details?: string;
}

/**
 * Commit information
 */
export interface CommitInfo {
  sha: string;
  shortSha?: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  githubAuthor?: {
    login: string;
    avatarUrl: string;
  } | null;
  url: string;
}

/**
 * Fetch the current site configuration
 *
 * @returns The current site configuration
 * @throws Error if the request fails
 */
export async function fetchConfig(): Promise<SiteConfig> {
  const response = await fetch('/api/config');
  const result: APIResponse<SiteConfig> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to fetch configuration');
  }

  return result.data;
}

/**
 * Update the site configuration
 *
 * @param config - The new configuration
 * @param commitMessage - Optional custom commit message
 * @returns Information about the commit
 * @throws Error if the request fails
 */
export async function saveConfig(
  config: SiteConfig,
  commitMessage?: string
): Promise<CommitInfo> {
  const response = await fetch('/api/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      config,
      commitMessage,
    }),
  });

  const result: APIResponse<CommitInfo> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to save configuration');
  }

  return result.data;
}

/**
 * Fetch commit history for the configuration file
 *
 * @param limit - Maximum number of commits to retrieve (default: 50)
 * @returns Array of commits
 * @throws Error if the request fails
 */
export async function fetchHistory(limit = 50): Promise<CommitInfo[]> {
  const response = await fetch(`/api/config/history?limit=${limit}`);
  const result: APIResponse<CommitInfo[]> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to fetch history');
  }

  return result.data;
}

/**
 * Revert the configuration to a previous version
 *
 * @param sha - The commit SHA to revert to
 * @returns Information about the revert commit
 * @throws Error if the request fails
 */
export async function revertConfig(sha: string): Promise<CommitInfo> {
  const response = await fetch('/api/config/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sha }),
  });

  const result: APIResponse<CommitInfo> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to revert configuration');
  }

  return result.data;
}

/**
 * Test the GitHub API connection
 *
 * @returns Connection status and details
 */
export async function testConnection(): Promise<{
  success: boolean;
  message: string;
  details?: {
    owner: string;
    repo: string;
    branch: string;
    hasToken: boolean;
  };
}> {
  const response = await fetch('/api/config/test');
  return await response.json();
}
