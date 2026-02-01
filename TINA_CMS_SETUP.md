# Tina CMS Environment Setup

This guide will help you configure the required environment variables for Tina CMS.

## Required Environment Variables

The following environment variables must be set in your `.env.local` file:

### 1. NEXT_PUBLIC_TINA_CLIENT_ID
- **Description**: Your Tina Cloud project's unique client identifier
- **Visibility**: Public (exposed to the browser)
- **Required**: Yes

### 2. TINA_TOKEN
- **Description**: Authentication token for the Tina Cloud API
- **Visibility**: Server-side only (never exposed to the browser)
- **Required**: Yes
- **Type**: Read-Only Token or Content Token

### 3. NEXT_PUBLIC_TINA_BRANCH
- **Description**: The git branch that Tina CMS should use for content
- **Visibility**: Public (exposed to the browser)
- **Required**: Yes
- **Default**: `main`

### 4. TINA_PUBLIC_IS_LOCAL (Optional)
- **Description**: Enable local development mode to use filesystem instead of Tina Cloud
- **Visibility**: Public (exposed to the browser)
- **Required**: No
- **Default**: `false`
- **Use Case**: Set to `true` during local development to work with local markdown files without connecting to Tina Cloud. Set to `false` or remove for production.

## Getting Your Tina Credentials

Follow these steps to obtain your Tina CMS credentials:

### Step 1: Create a Tina Cloud Account
1. Navigate to [https://app.tina.io](https://app.tina.io)
2. Click "Sign Up" and create a free account
3. Verify your email address if required

### Step 2: Create or Select a Project
1. After logging in, click "Create Project" (or select an existing project)
2. If creating new:
   - Enter your project name (e.g., "Ruby's Wine Bar")
   - Connect your GitHub repository
   - Select the branch you want to use (usually `main`)

### Step 3: Get Your Client ID
1. In your Tina project dashboard, navigate to "Overview" or "Configuration"
2. Find the **Client ID** section
3. Copy the Client ID (it will be a random string like `abc123def456`)
4. Paste it into your `.env.local` file as `NEXT_PUBLIC_TINA_CLIENT_ID`

### Step 4: Generate a Token
1. In your Tina project dashboard, navigate to "Tokens" or "API Tokens"
2. Click "Create Token" or "New Token"
3. Choose the token type:
   - **Read-Only Token**: For read-only access to content
   - **Content Token**: For full read/write access
4. Give your token a descriptive name (e.g., "Local Development")
5. Copy the generated token (you won't be able to see it again!)
6. Paste it into your `.env.local` file as `TINA_TOKEN`

### Step 5: Set Your Branch
1. Set `NEXT_PUBLIC_TINA_BRANCH` to match your git branch name
2. This is typically `main` or `master`
3. Make sure this matches the branch configured in your Tina project

## Example .env.local File

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://rubyswineshop.com.au
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here

# Tina CMS Configuration
NEXT_PUBLIC_TINA_CLIENT_ID=abc123def456ghi789
TINA_TOKEN=tina_cloud_token_xyz789abc123
NEXT_PUBLIC_TINA_BRANCH=main

# Local Development Mode (optional)
# Set to true to use filesystem instead of Tina Cloud during development
TINA_PUBLIC_IS_LOCAL=true
```

## Verifying Your Setup

After adding the environment variables:

1. Restart your Next.js development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Navigate to `/admin` in your browser (e.g., `http://localhost:3000/admin`)

3. You should see the Tina CMS admin interface

4. If you see authentication errors, double-check:
   - Your Client ID is correct
   - Your token is valid and has the right permissions
   - Your branch name matches your git branch

## Troubleshooting

### "Invalid Client ID" Error
- Verify you copied the entire Client ID from Tina Cloud
- Make sure there are no extra spaces or quotes
- Confirm your Tina project is properly configured

### "Authentication Failed" Error
- Check that your TINA_TOKEN is valid
- Ensure the token has not expired
- Try generating a new token

### "Branch Not Found" Error
- Verify `NEXT_PUBLIC_TINA_BRANCH` matches your actual git branch name
- Check that the branch exists in your connected repository
- Ensure the branch is configured in your Tina project settings

## Security Best Practices

1. **Never commit `.env.local`** to git - it contains sensitive credentials
2. **Use different tokens** for development and production
3. **Regenerate tokens** if they are ever exposed
4. **Use Read-Only tokens** when possible to limit access
5. **Keep `.env.example`** updated but with placeholder values only

## Additional Resources

- [Tina CMS Documentation](https://tina.io/docs/)
- [Tina Cloud Dashboard](https://app.tina.io)
- [Tina CMS GitHub](https://github.com/tinacms/tinacms)
- [Environment Variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)

## Support

If you encounter issues:
- Check the [Tina CMS Discord](https://discord.com/invite/zumN63Ybpf)
- Visit the [Tina Community Forum](https://community.tinacms.org/)
- Review the [Tina Troubleshooting Guide](https://tina.io/docs/troubleshooting/)
