# GitHub API Integration

This project includes a complete GitHub API integration for managing the `site-config.json` file. This allows you to read, update, view history, and rollback changes to your site configuration directly through GitHub.

## Features

- **Read Configuration**: Fetch the current site configuration from GitHub
- **Update Configuration**: Commit changes with automatic or custom commit messages
- **View History**: See all previous commits and changes
- **Rollback**: Revert to any previous version
- **Smart Commit Messages**: Automatically generates descriptive commit messages based on what changed
- **Error Handling**: Comprehensive error handling with detailed messages
- **Generic Implementation**: Works with any GitHub repository

## Setup

### 1. Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens/new)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Ruby's Wine Shop CMS")
4. Set expiration (recommended: 90 days)
5. Select scopes:
   - `repo` (Full control of private repositories)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

### 2. Configure Environment Variables

Add these variables to your `.env.local` file:

```bash
# Required: Your GitHub Personal Access Token
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Customize repository details (defaults shown)
GITHUB_OWNER=jonnoclifford
GITHUB_REPO=rubyswineshop
GITHUB_BRANCH=main
```

### 3. Test the Connection

Start your development server and test the connection:

```bash
npm run dev
```

Then visit: `http://localhost:3000/api/config/test`

You should see:
```json
{
  "success": true,
  "message": "Successfully connected to GitHub API",
  "details": {
    "owner": "jonnoclifford",
    "repo": "rubyswineshop",
    "branch": "main",
    "hasToken": true
  }
}
```

## API Routes

### GET `/api/config`

Fetch the current site configuration from GitHub.

**Response:**
```json
{
  "success": true,
  "data": {
    "business": { ... },
    "menu": { ... },
    "hero": { ... }
    // ... full site config
  }
}
```

**Example Usage:**
```typescript
const response = await fetch('/api/config');
const { success, data } = await response.json();

if (success) {
  console.log('Current config:', data);
}
```

### POST `/api/config`

Update the site configuration with a new commit.

**Request Body:**
```json
{
  "config": {
    // Your updated SiteConfig object
  },
  "commitMessage": "Optional custom message"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sha": "abc123...",
    "message": "Update site config - added 3 new wines",
    "author": "Your Name",
    "date": "2024-01-15T10:30:00Z",
    "url": "https://github.com/..."
  }
}
```

**Example Usage:**
```typescript
const response = await fetch('/api/config', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    config: updatedConfig,
    commitMessage: 'Update wine menu - added Pinot Noir'
  }),
});

const result = await response.json();
if (result.success) {
  console.log('Config updated!', result.data);
}
```

### GET `/api/config/history`

Get the commit history for site-config.json.

**Query Parameters:**
- `limit` - Number of commits to retrieve (default: 50, max: 100)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "sha": "abc123def456...",
      "shortSha": "abc123d",
      "message": "Update site config - added 3 new wines",
      "author": {
        "name": "Your Name",
        "email": "you@example.com",
        "date": "2024-01-15T10:30:00Z"
      },
      "githubAuthor": {
        "login": "yourusername",
        "avatarUrl": "https://avatars.githubusercontent.com/..."
      },
      "url": "https://github.com/..."
    }
  ],
  "count": 10
}
```

**Example Usage:**
```typescript
const response = await fetch('/api/config/history?limit=20');
const { success, data } = await response.json();

if (success) {
  console.log(`Found ${data.length} commits`);
  data.forEach(commit => {
    console.log(`${commit.shortSha}: ${commit.message}`);
  });
}
```

### POST `/api/config/history`

Revert the configuration to a previous version.

**Request Body:**
```json
{
  "sha": "abc123def456..." // Full 40-character commit SHA
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully reverted to version abc123d",
  "data": {
    "sha": "def456abc789...",
    "message": "Revert site config to version abc123d",
    "author": "Your Name",
    "date": "2024-01-15T11:00:00Z",
    "url": "https://github.com/..."
  }
}
```

**Example Usage:**
```typescript
const response = await fetch('/api/config/history', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sha: 'abc123def456...'
  }),
});

const result = await response.json();
if (result.success) {
  console.log('Reverted to previous version!');
}
```

## Automatic Commit Messages

If you don't provide a custom commit message, the system automatically generates descriptive messages based on what changed:

- **Wine Menu Changes**: "Update site config - added 3 new wines"
- **Hours Update**: "Update site config - updated opening hours"
- **Events**: "Update site config - updated events (5 total)"
- **Multiple Changes**: "Update site config - updated opening hours, added 2 new wines"

## Direct Library Usage

You can also use the GitHub API functions directly in your server-side code:

```typescript
import {
  readConfig,
  updateConfig,
  getFileHistory,
  revertToVersion,
  testConnection
} from '@/lib/github-api';

// Read current config
const config = await readConfig();

// Update config
const result = await updateConfig(newConfig, 'Custom commit message');

// Get history
const commits = await getFileHistory(20);

// Revert to version
const revertResult = await revertToVersion('abc123def456...');

// Test connection
const status = await testConnection();
```

## Error Handling

All API routes return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here",
  "statusCode": 401,
  "details": "Additional error details"
}
```

Common errors:
- **401**: Invalid or missing GitHub token
- **403**: Insufficient permissions
- **404**: Repository or file not found
- **422**: Invalid request body or parameters
- **500**: Server error

## Security Considerations

1. **Never commit your `.env.local` file** - it contains your GitHub token
2. **Use environment variables** for all sensitive data
3. **Restrict token permissions** - only grant `repo` scope
4. **Rotate tokens regularly** - set expiration dates
5. **Add authentication** - Consider adding authentication to your API routes in production

## Repository Configuration

The integration is designed to work with any GitHub repository. To use it with a different repository, update your environment variables:

```bash
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main  # or master, develop, etc.
```

The system will automatically look for `src/content/site-config.json` in your repository. To use a different file path, modify the `CONFIG_FILE_PATH` constant in `/src/lib/github-api.ts`.

## Troubleshooting

### "GITHUB_TOKEN environment variable is not set"

Make sure you've added `GITHUB_TOKEN` to your `.env.local` file and restarted your development server.

### "GitHub API error: Not Found"

Check that your `GITHUB_OWNER`, `GITHUB_REPO`, and `GITHUB_BRANCH` are correct in `.env.local`.

### "GitHub API error: Bad credentials"

Your GitHub token is invalid or has expired. Generate a new token and update `.env.local`.

### "GitHub API error: Resource protected by organization SAML enforcement"

If your repository is part of an organization with SAML SSO, you need to authorize your token for that organization.

## Development vs Production

### Development
In development, the GitHub API reads and writes to your repository directly. Make sure to use a development branch to avoid affecting your production site.

### Production
For production deployments:

1. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Consider adding authentication middleware to protect your API routes
3. Use a separate branch or repository for testing
4. Consider rate limiting to avoid hitting GitHub API limits

## Rate Limits

GitHub API has rate limits:
- **Authenticated requests**: 5,000 requests per hour
- **Unauthenticated requests**: 60 requests per hour

This integration uses authenticated requests, so you have plenty of headroom for normal usage.

## Next Steps

1. Set up your GitHub token
2. Test the connection with `/api/config/test`
3. Build a UI to interact with these APIs
4. Add authentication to protect your routes
5. Consider adding a CMS interface for non-technical users

For more information, see the [GitHub REST API documentation](https://docs.github.com/en/rest).
