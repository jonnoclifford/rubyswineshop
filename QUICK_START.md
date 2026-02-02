# GitHub API Integration - Quick Start Guide

Get your site configuration managed through GitHub in 5 minutes.

## Step 1: Get Your GitHub Token

1. Visit https://github.com/settings/tokens/new
2. Click "Generate new token (classic)"
3. Name it: `Ruby's Wine Shop CMS`
4. Select scope: `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately!**

## Step 2: Add to .env.local

Create or edit `.env.local` in your project root:

```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=jonnoclifford
GITHUB_REPO=rubyswineshop
GITHUB_BRANCH=main
```

## Step 3: Start Development Server

```bash
npm run dev
```

## Step 4: Test the Connection

Visit: http://localhost:3000/api/config/test

You should see:
```json
{
  "success": true,
  "message": "Successfully connected to GitHub API"
}
```

## Step 5: Try the APIs

### Read Config
```bash
curl http://localhost:3000/api/config
```

### View History
```bash
curl http://localhost:3000/api/config/history?limit=10
```

### Update Config (from JavaScript)
```javascript
const response = await fetch('/api/config', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    config: yourUpdatedConfig,
    commitMessage: 'Update wine menu'
  })
});
```

## Common Use Cases

### 1. Load current config in a React component

```typescript
import { fetchConfig } from '@/lib/config-client';

const [config, setConfig] = useState(null);

useEffect(() => {
  fetchConfig().then(setConfig);
}, []);
```

### 2. Save changes with auto-generated commit message

```typescript
import { saveConfig } from '@/lib/config-client';

const handleSave = async () => {
  await saveConfig(updatedConfig);
  // Commit message automatically describes what changed!
};
```

### 3. View commit history

```typescript
import { fetchHistory } from '@/lib/config-client';

const commits = await fetchHistory(20);
commits.forEach(c => {
  console.log(`${c.shortSha}: ${c.message}`);
});
```

### 4. Revert to previous version

```typescript
import { revertConfig } from '@/lib/config-client';

await revertConfig('abc123def456...');
// Creates new commit restoring old version
```

## What's Included

### Files Created

1. **`/src/lib/github-api.ts`** - Core GitHub API integration
   - `readConfig()` - Read from GitHub
   - `updateConfig()` - Commit changes
   - `getFileHistory()` - View commits
   - `revertToVersion()` - Rollback functionality

2. **`/src/lib/config-client.ts`** - Client-side utilities
   - `fetchConfig()` - Load config
   - `saveConfig()` - Save changes
   - `fetchHistory()` - Get commits
   - `revertConfig()` - Revert version

3. **API Routes:**
   - `GET /api/config` - Fetch current config
   - `POST /api/config` - Save changes
   - `GET /api/config/history` - Get commit history
   - `POST /api/config/history` - Revert to version
   - `GET /api/config/test` - Test connection

4. **Documentation:**
   - `GITHUB_API.md` - Complete API documentation
   - `EXAMPLE_USAGE.tsx` - Full React component example
   - `QUICK_START.md` - This file!

## Auto-Generated Commit Messages

The system automatically generates descriptive commit messages:

| Change | Generated Message |
|--------|------------------|
| Add 3 wines | "Update site config - added 3 new wines" |
| Update hours | "Update site config - updated opening hours" |
| Add event | "Update site config - updated events (5 total)" |
| Multiple changes | "Update site config - updated opening hours, added 2 new wines" |

Or provide your own custom message:
```typescript
await saveConfig(config, "Special holiday hours for Christmas week");
```

## Security Best Practices

1. Never commit `.env.local` to git
2. Use read-only tokens for public sites
3. Add authentication to API routes in production
4. Rotate tokens every 90 days
5. Use separate tokens for dev and production

## Troubleshooting

### "GITHUB_TOKEN environment variable is not set"
- Add token to `.env.local`
- Restart dev server

### "GitHub API error: Not Found"
- Check `GITHUB_OWNER` and `GITHUB_REPO` are correct
- Ensure repository exists and is accessible

### "GitHub API error: Bad credentials"
- Token is invalid or expired
- Generate new token at https://github.com/settings/tokens

## Next Steps

1. Build an admin UI using the example component
2. Add authentication to protect API routes
3. Create a CMS interface for content editors
4. Set up webhooks to auto-deploy on config changes
5. Add real-time preview of changes

## Need Help?

- **Full Documentation**: See `GITHUB_API.md`
- **Example Code**: See `EXAMPLE_USAGE.tsx`
- **GitHub API Docs**: https://docs.github.com/en/rest

Happy editing!
