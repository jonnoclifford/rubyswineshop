/**
 * GitHub API Integration for site-config.json
 *
 * This module provides a complete GitHub REST API v3 integration for reading,
 * updating, and managing version history of the site-config.json file.
 *
 * Features:
 * - Read current config from GitHub
 * - Commit and push changes with descriptive messages
 * - View commit history
 * - Rollback to previous versions
 * - Generic implementation works with any GitHub repository
 */

import type { SiteConfig } from '@/types/content';

// Environment variables for GitHub API
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'jonnoclifford';
const GITHUB_REPO = process.env.GITHUB_REPO || 'rubyswineshop';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const CONFIG_FILE_PATH = 'src/content/site-config.json';

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Custom error class for GitHub API errors
 */
export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

/**
 * Validate that required environment variables are set
 */
function validateConfig(): void {
  if (!GITHUB_TOKEN) {
    throw new GitHubAPIError(
      'GITHUB_TOKEN environment variable is not set. Please add it to your .env.local file.'
    );
  }
}

/**
 * Make an authenticated request to the GitHub API
 */
async function githubRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  validateConfig();

  const url = `${GITHUB_API_BASE}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new GitHubAPIError(
        `GitHub API error: ${response.statusText}`,
        response.status,
        errorBody
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError(
      `Failed to communicate with GitHub API: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Response from GitHub's get file content API
 */
interface GitHubFileResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  content: string; // base64 encoded
  encoding: string;
  download_url: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

/**
 * Response from GitHub's create/update file API
 */
interface GitHubCommitResponse {
  content: GitHubFileResponse;
  commit: {
    sha: string;
    node_id: string;
    url: string;
    html_url: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
}

/**
 * Commit information from GitHub's commits API
 */
export interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

/**
 * Read the current site-config.json from GitHub
 *
 * @returns The parsed site configuration
 * @throws {GitHubAPIError} If the file cannot be read or parsed
 */
export async function readConfig(): Promise<SiteConfig> {
  try {
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONFIG_FILE_PATH}?ref=${GITHUB_BRANCH}`;
    const data = await githubRequest<GitHubFileResponse>(endpoint);

    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    // Parse JSON
    const config = JSON.parse(content) as SiteConfig;

    return config;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError(
      `Failed to read config: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get the current SHA of the config file (required for updates)
 */
async function getFileSha(): Promise<string> {
  try {
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONFIG_FILE_PATH}?ref=${GITHUB_BRANCH}`;
    const data = await githubRequest<GitHubFileResponse>(endpoint);
    return data.sha;
  } catch (error) {
    throw new GitHubAPIError(
      `Failed to get file SHA: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Generate a descriptive commit message based on the changes
 *
 * @param oldConfig - Previous configuration
 * @param newConfig - New configuration
 * @returns A descriptive commit message
 */
function generateCommitMessage(
  oldConfig: SiteConfig | null,
  newConfig: SiteConfig
): string {
  if (!oldConfig) {
    return 'Initial site configuration';
  }

  const changes: string[] = [];

  // Check menu changes
  if (JSON.stringify(oldConfig.menu) !== JSON.stringify(newConfig.menu)) {
    const oldGlassCount = oldConfig.menu.byTheGlass.items.length;
    const newGlassCount = newConfig.menu.byTheGlass.items.length;
    const oldBottleCount = oldConfig.menu.byTheBottle.categories.reduce(
      (sum, cat) => sum + cat.items.length, 0
    );
    const newBottleCount = newConfig.menu.byTheBottle.categories.reduce(
      (sum, cat) => sum + cat.items.length, 0
    );

    if (newGlassCount !== oldGlassCount || newBottleCount !== oldBottleCount) {
      const diff = (newGlassCount + newBottleCount) - (oldGlassCount + oldBottleCount);
      if (diff > 0) {
        changes.push(`added ${diff} new wine${diff > 1 ? 's' : ''}`);
      } else if (diff < 0) {
        changes.push(`removed ${Math.abs(diff)} wine${Math.abs(diff) > 1 ? 's' : ''}`);
      } else {
        changes.push('updated wine menu');
      }
    }
  }

  // Check business hours changes
  if (JSON.stringify(oldConfig.business.hours) !== JSON.stringify(newConfig.business.hours)) {
    changes.push('updated opening hours');
  }

  // Check events changes
  if (JSON.stringify(oldConfig.whatsOn) !== JSON.stringify(newConfig.whatsOn)) {
    const oldEventCount = oldConfig.whatsOn.events.length;
    const newEventCount = newConfig.whatsOn.events.length;
    if (newEventCount !== oldEventCount) {
      changes.push(`updated events (${newEventCount} total)`);
    } else {
      changes.push('updated event details');
    }
  }

  // Check contact info changes
  if (JSON.stringify(oldConfig.business.contact) !== JSON.stringify(newConfig.business.contact)) {
    changes.push('updated contact information');
  }

  // Check FAQ changes
  if (JSON.stringify(oldConfig.faq) !== JSON.stringify(newConfig.faq)) {
    changes.push('updated FAQ');
  }

  // Check about section changes
  if (JSON.stringify(oldConfig.about) !== JSON.stringify(newConfig.about)) {
    changes.push('updated about section');
  }

  // If we detected specific changes, use them
  if (changes.length > 0) {
    return `Update site config - ${changes.join(', ')}`;
  }

  // Fallback to generic message
  return 'Update site configuration';
}

/**
 * Update site-config.json on GitHub with a new configuration
 *
 * @param newConfig - The new site configuration to commit
 * @param commitMessage - Optional custom commit message (auto-generated if not provided)
 * @returns Information about the commit
 * @throws {GitHubAPIError} If the update fails
 */
export async function updateConfig(
  newConfig: SiteConfig,
  commitMessage?: string
): Promise<GitHubCommitResponse> {
  try {
    // Get current file SHA (required for update)
    const currentSha = await getFileSha();

    // Get current config for commit message generation
    let oldConfig: SiteConfig | null = null;
    try {
      oldConfig = await readConfig();
    } catch {
      // If we can't read the old config, that's okay
    }

    // Generate commit message if not provided
    const message = commitMessage || generateCommitMessage(oldConfig, newConfig);

    // Encode new content as base64
    const content = Buffer.from(
      JSON.stringify(newConfig, null, 2) + '\n'
    ).toString('base64');

    // Update file via GitHub API
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONFIG_FILE_PATH}`;
    const response = await githubRequest<GitHubCommitResponse>(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content,
        sha: currentSha,
        branch: GITHUB_BRANCH,
      }),
    });

    return response;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError(
      `Failed to update config: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get the commit history for site-config.json
 *
 * @param limit - Maximum number of commits to retrieve (default: 50)
 * @returns Array of commits, most recent first
 * @throws {GitHubAPIError} If fetching history fails
 */
export async function getFileHistory(limit = 50): Promise<GitHubCommit[]> {
  try {
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?path=${CONFIG_FILE_PATH}&per_page=${limit}`;
    const commits = await githubRequest<GitHubCommit[]>(endpoint);
    return commits;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError(
      `Failed to get file history: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get the content of site-config.json at a specific commit
 *
 * @param sha - The commit SHA to retrieve
 * @returns The configuration at that commit
 * @throws {GitHubAPIError} If fetching the version fails
 */
async function getConfigAtCommit(sha: string): Promise<SiteConfig> {
  try {
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONFIG_FILE_PATH}?ref=${sha}`;
    const data = await githubRequest<GitHubFileResponse>(endpoint);

    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    // Parse JSON
    const config = JSON.parse(content) as SiteConfig;

    return config;
  } catch (error) {
    throw new GitHubAPIError(
      `Failed to get config at commit ${sha}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Revert site-config.json to a previous version
 *
 * This creates a new commit with the content from a previous commit,
 * rather than using git revert (which isn't available via REST API)
 *
 * @param sha - The commit SHA to revert to
 * @returns Information about the revert commit
 * @throws {GitHubAPIError} If the revert fails
 */
export async function revertToVersion(sha: string): Promise<GitHubCommitResponse> {
  try {
    // Get the config at the target commit
    const configAtCommit = await getConfigAtCommit(sha);

    // Commit it as a new change
    const commitMessage = `Revert site config to version ${sha.substring(0, 7)}`;

    return await updateConfig(configAtCommit, commitMessage);
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError(
      `Failed to revert to version ${sha}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Test GitHub API connection and permissions
 *
 * @returns Success status and any error messages
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
  try {
    validateConfig();

    // Try to read the repository
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
    await githubRequest(endpoint);

    return {
      success: true,
      message: 'Successfully connected to GitHub API',
      details: {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        branch: GITHUB_BRANCH,
        hasToken: !!GITHUB_TOKEN,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof GitHubAPIError
        ? error.message
        : 'Unknown error connecting to GitHub API',
    };
  }
}
