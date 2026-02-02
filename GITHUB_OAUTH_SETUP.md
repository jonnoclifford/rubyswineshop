# GitHub OAuth Authentication Setup Guide

This guide will walk you through setting up GitHub OAuth authentication for the admin interface of Ruby's Wine Bar website.

## Overview

The admin panel uses GitHub OAuth 2.0 for secure authentication. This means:

- Only users with authorized GitHub accounts can access the admin panel
- No password management required - GitHub handles authentication
- Secure session management with HTTP-only cookies
- CSRF protection with state parameters
- 7-day session expiration for security

## Prerequisites

- A GitHub account
- Access to your GitHub account settings
- Admin access to your website's environment variables

## Step 1: Create a GitHub OAuth Application

1. **Navigate to GitHub Developer Settings**
   - Go to https://github.com/settings/developers
   - Click on "OAuth Apps" in the left sidebar
   - Click the "New OAuth App" button

2. **Fill in Application Details**

   For **Production**:
   ```
   Application name: Ruby's Wine Bar Admin
   Homepage URL: https://rubyswineshop.com.au
   Application description: Admin authentication for Ruby's Wine Bar website
   Authorization callback URL: https://rubyswineshop.com.au/api/auth/github/callback
   ```

   For **Local Development**:
   ```
   Application name: Ruby's Wine Bar Admin (Local)
   Homepage URL: http://localhost:3000
   Application description: Local development admin authentication
   Authorization callback URL: http://localhost:3000/api/auth/github/callback
   ```

   > **Note**: You'll need separate OAuth apps for production and local development since callback URLs must match exactly.

3. **Register the Application**
   - Click "Register application"
   - You'll be redirected to your new OAuth app's page

4. **Get Your Credentials**
   - Copy the **Client ID** - you'll need this for your environment variables
   - Click **"Generate a new client secret"**
   - Copy the **Client Secret** immediately - you won't be able to see it again!
   - If you lose it, you'll need to generate a new one

## Step 2: Configure Environment Variables

1. **Open Your Environment File**
   - For local development: `.env.local`
   - For production: Your hosting platform's environment variables (Vercel, Netlify, etc.)

2. **Add GitHub OAuth Configuration**

   ```env
   # GitHub OAuth Authentication
   GITHUB_CLIENT_ID=your_actual_client_id_here
   GITHUB_CLIENT_SECRET=your_actual_client_secret_here
   GITHUB_CALLBACK_URL=https://rubyswineshop.com.au/api/auth/github/callback
   GITHUB_AUTHORIZED_USERS=jonnoclifford
   ```

   Replace:
   - `your_actual_client_id_here` with your Client ID from GitHub
   - `your_actual_client_secret_here` with your Client Secret from GitHub
   - Update `GITHUB_CALLBACK_URL` to match your domain
   - Update `GITHUB_AUTHORIZED_USERS` with comma-separated GitHub usernames who should have access

3. **Important Security Notes**
   - **Never commit** `.env.local` to version control
   - The `.env.example` file is for documentation only
   - Client Secret should be treated like a password
   - Only add trusted users to `GITHUB_AUTHORIZED_USERS`

## Step 3: Configure Authorized Users

The `GITHUB_AUTHORIZED_USERS` environment variable controls who can access the admin panel.

**Single User:**
```env
GITHUB_AUTHORIZED_USERS=jonnoclifford
```

**Multiple Users:**
```env
GITHUB_AUTHORIZED_USERS=jonnoclifford,johndoe,janedoe
```

**Important:**
- Use GitHub usernames, not display names
- Separate multiple users with commas (no spaces)
- Usernames are case-sensitive
- Users must authenticate with their GitHub account to prove their identity

## Step 4: Test the Authentication Flow

### Local Development Testing

1. **Start Your Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Admin Login**
   - Open http://localhost:3000/admin/login in your browser

3. **Test the Login Flow**
   - Click "Continue with GitHub"
   - You'll be redirected to GitHub
   - Authorize the application (first time only)
   - You should be redirected back to `/admin` and see the dashboard

4. **Verify Authorization**
   - If your GitHub username is in `GITHUB_AUTHORIZED_USERS`, you'll see the admin dashboard
   - If not, you'll see an "unauthorized" error

### Common Issues and Solutions

**Issue: "Invalid callback URL"**
- Solution: Make sure your `GITHUB_CALLBACK_URL` exactly matches the one in your GitHub OAuth app settings
- Check for trailing slashes, http vs https, port numbers

**Issue: "Unauthorized user"**
- Solution: Verify your GitHub username is in the `GITHUB_AUTHORIZED_USERS` list
- Check for typos or incorrect capitalization

**Issue: "Invalid state parameter"**
- Solution: Clear your browser cookies and try again
- This happens if you abandon the login flow midway

**Issue: Session expires immediately**
- Solution: Check that your cookies are being set correctly
- In production, ensure `secure: true` cookies are only used with HTTPS

## Step 5: Deploy to Production

### Vercel Deployment

1. **Add Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add each variable:
     - `GITHUB_CLIENT_ID`
     - `GITHUB_CLIENT_SECRET`
     - `GITHUB_CALLBACK_URL`
     - `GITHUB_AUTHORIZED_USERS`
   - Apply to Production environment

2. **Redeploy Your Application**
   - Vercel will automatically redeploy
   - Or trigger a manual deployment

3. **Update GitHub OAuth App**
   - Go back to your GitHub OAuth app settings
   - Ensure the callback URL matches your production domain
   - Update if necessary

### Other Hosting Platforms

The setup is similar for other platforms:
- Netlify: Environment Variables in Site Settings
- Railway: Variables in your project settings
- Heroku: Config Vars in app settings

## Step 6: Security Best Practices

### Required Security Measures

1. **Use HTTPS in Production**
   - OAuth requires HTTPS for security
   - Session cookies use `secure` flag in production

2. **Regular Credential Rotation**
   - Rotate your Client Secret every 90 days
   - Remove unused OAuth applications

3. **Monitor Authorized Users**
   - Regularly review who has admin access
   - Remove users who no longer need access

4. **Session Security**
   - Sessions expire after 7 days
   - Users must re-authenticate
   - No automatic session extension

### Optional Security Enhancements

1. **IP Allowlisting**
   - Add middleware to restrict admin access to specific IPs
   - Useful for office-only access

2. **Two-Factor Authentication**
   - GitHub's 2FA protects the OAuth flow
   - Encourage all admin users to enable 2FA on their GitHub accounts

3. **Audit Logging**
   - Log all admin login attempts
   - Track which users access the admin panel

4. **Rate Limiting**
   - Implement rate limiting on auth endpoints
   - Prevents brute force attacks

## Architecture Overview

### Authentication Flow

```
1. User clicks "Login with GitHub"
   ↓
2. Redirected to GitHub OAuth authorization
   ↓
3. User authorizes the application
   ↓
4. GitHub redirects back with authorization code
   ↓
5. Server exchanges code for access token
   ↓
6. Server fetches user profile from GitHub
   ↓
7. Server checks if user is in authorized list
   ↓
8. Server creates encrypted session cookie
   ↓
9. User is redirected to admin dashboard
```

### Session Management

- Sessions are stored in HTTP-only cookies
- Cookie contains encrypted user data and access token
- CSRF protection via state parameter
- Sessions expire after 7 days
- No refresh token - users must re-authenticate

### File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Main admin dashboard
│   │   └── login/
│   │       └── page.tsx          # Login page
│   └── api/
│       └── auth/
│           ├── github/
│           │   ├── route.ts      # OAuth initiation
│           │   └── callback/
│           │       └── route.ts  # OAuth callback handler
│           ├── logout/
│           │   └── route.ts      # Logout endpoint
│           └── session/
│               └── route.ts      # Session check endpoint
├── components/
│   └── admin/
│       ├── AdminDashboard.tsx    # Admin UI
│       └── LoginForm.tsx         # Login UI
└── lib/
    ├── auth.ts                   # Core authentication logic
    └── hooks/
        └── useAuth.ts            # Client-side auth hook
```

## API Reference

### Server-Side Functions

**`getGitHubAuthUrl(redirectTo?: string): Promise<string>`**
- Generates GitHub OAuth authorization URL
- Sets CSRF protection state cookie
- Optional redirect path after authentication

**`handleGitHubCallback(code: string, state: string): Promise<{ user: GitHubUser; redirectTo?: string } | null>`**
- Handles OAuth callback
- Verifies CSRF state
- Exchanges code for token
- Creates session
- Returns user profile or null

**`getCurrentUser(): Promise<GitHubUser | null>`**
- Gets currently authenticated user
- Returns user profile or null
- Validates session expiration

**`isAuthenticated(): Promise<boolean>`**
- Checks if user has valid session
- Returns true/false

**`requireAuth(): Promise<GitHubUser>`**
- Throws error if not authenticated
- Use in API routes that require auth
- Returns user profile

**`clearSession(): Promise<void>`**
- Clears session cookie
- Logs out user

### Client-Side Hooks

**`useAuth()`**
```tsx
const { isAuthenticated, user, isLoading, error } = useAuth();
```
- React hook for authentication state
- Automatically fetches session on mount
- Provides loading states

**`loginWithGitHub(redirectTo?: string): void`**
- Initiates login flow
- Redirects to GitHub OAuth

**`logout(): Promise<void>`**
- Logs out user
- Clears session
- Redirects to home

### API Endpoints

**`GET /api/auth/github`**
- Initiates OAuth flow
- Query params: `?redirect=/path`

**`GET /api/auth/github/callback`**
- Handles OAuth callback
- Query params: `code`, `state`

**`POST /api/auth/logout`**
- Logs out user
- Clears session cookie

**`GET /api/auth/session`**
- Returns current session state
- Response: `{ authenticated: boolean, user: GitHubUser | null }`

## Extending the System

### Adding Admin Routes

All routes under `/admin/*` should check authentication:

```tsx
// src/app/admin/my-page/page.tsx
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function MyAdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  return <div>Protected content</div>;
}
```

### Protected API Routes

```tsx
// src/app/api/admin/my-endpoint/route.ts
import { requireAuth, unauthorizedResponse } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await requireAuth();

    // Your protected logic here

    return Response.json({ success: true });
  } catch (error) {
    return unauthorizedResponse();
  }
}
```

### Custom Authorization Rules

Extend the authorization logic in `src/lib/auth.ts`:

```typescript
// Example: Check GitHub organization membership
export async function isUserInOrganization(
  accessToken: string,
  org: string
): Promise<boolean> {
  const response = await fetch(`https://api.github.com/user/orgs`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  const orgs = await response.json();
  return orgs.some((o: any) => o.login === org);
}
```

## Troubleshooting

### Enable Debug Logging

Add this to your auth functions to debug issues:

```typescript
console.log('Auth debug:', {
  clientId: GITHUB_CLIENT_ID ? 'Set' : 'Missing',
  clientSecret: GITHUB_CLIENT_SECRET ? 'Set' : 'Missing',
  callbackUrl: GITHUB_CALLBACK_URL,
  authorizedUsers: AUTHORIZED_USERS,
});
```

### Clear Browser State

If you're experiencing issues:
1. Clear browser cookies for your domain
2. Clear browser cache
3. Try in incognito/private mode

### Verify Environment Variables

```bash
# Check if variables are loaded
node -e "console.log(process.env.GITHUB_CLIENT_ID)"
```

## Support and Resources

- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
- [Web Security Best Practices](https://owasp.org/www-project-web-security-testing-guide/)

## License

This authentication system is part of Ruby's Wine Bar website and is provided as-is for the project's use.
