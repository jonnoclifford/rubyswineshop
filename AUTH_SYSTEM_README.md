# Authentication System Documentation

## Quick Start

This authentication system provides secure GitHub OAuth-based authentication for the admin panel. Here's how to get started:

### 1. Set Up GitHub OAuth App

See [GITHUB_OAUTH_SETUP.md](./GITHUB_OAUTH_SETUP.md) for detailed instructions.

Quick version:
1. Go to https://github.com/settings/developers
2. Create new OAuth App
3. Set callback URL to: `http://localhost:3000/api/auth/github/callback` (local) or your production URL
4. Copy Client ID and Client Secret

### 2. Configure Environment Variables

Create `.env.local` file:

```env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback
GITHUB_AUTHORIZED_USERS=your_github_username
```

### 3. Test Authentication

```bash
npm run dev
```

Visit http://localhost:3000/admin/login and click "Continue with GitHub"

## Features

### Security Features

- **OAuth 2.0 Authentication**: Industry-standard authentication protocol
- **CSRF Protection**: State parameter prevents cross-site request forgery
- **HTTP-Only Cookies**: Session tokens not accessible to JavaScript
- **Secure Cookie Flags**: Automatic HTTPS enforcement in production
- **Session Expiration**: 7-day automatic logout for security
- **Authorization Control**: Whitelist of GitHub usernames
- **Encrypted Sessions**: Base64 encoding with upgrade path to proper encryption

### Developer Features

- **Server Components**: Full Next.js 15 App Router support
- **Client Components**: React hooks for auth state
- **Middleware Protection**: Automatic route protection
- **TypeScript**: Full type safety
- **Reusable Components**: Drop-in auth buttons and forms
- **API Route Helpers**: Easy protection of API endpoints

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx                      # Protected admin dashboard
│   │   └── login/
│   │       └── page.tsx                  # Login page
│   └── api/
│       └── auth/
│           ├── github/
│           │   ├── route.ts              # OAuth initiation
│           │   └── callback/
│           │       └── route.ts          # OAuth callback
│           ├── logout/
│           │   └── route.ts              # Logout endpoint
│           └── session/
│               └── route.ts              # Session check API
├── components/
│   └── admin/
│       ├── AdminDashboard.tsx            # Main admin UI
│       ├── LoginForm.tsx                 # Login form UI
│       └── AuthButton.tsx                # Reusable auth button
├── lib/
│   ├── auth.ts                           # Core auth functions
│   └── hooks/
│       └── useAuth.ts                    # Client-side auth hook
└── middleware.ts                         # Route protection
```

### Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Visit /admin
       ↓
┌──────────────────┐
│   Middleware     │ Check session cookie
└──────┬───────────┘
       │ 2. No session → Redirect to /admin/login
       ↓
┌──────────────────┐
│   Login Page     │
└──────┬───────────┘
       │ 3. Click "Login with GitHub"
       ↓
┌──────────────────┐
│ GET /api/auth/   │ Generate state, redirect to GitHub
│     github       │
└──────┬───────────┘
       │ 4. Redirect to GitHub
       ↓
┌──────────────────┐
│  GitHub OAuth    │ User authorizes
└──────┬───────────┘
       │ 5. Callback with code & state
       ↓
┌──────────────────┐
│ GET /api/auth/   │
│ github/callback  │
└──────┬───────────┘
       │ 6. Verify state
       │ 7. Exchange code for token
       │ 8. Fetch user profile
       │ 9. Check authorization
       │ 10. Create session cookie
       ↓
┌──────────────────┐
│ Redirect /admin  │ User sees dashboard
└──────────────────┘
```

## Usage Examples

### Server Component (Recommended)

```tsx
// src/app/admin/my-page/page.tsx
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function MyAdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Your GitHub username is @{user.login}</p>
    </div>
  );
}
```

### Protected API Route

```tsx
// src/app/api/admin/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // This will throw if user is not authenticated
    const user = await requireAuth();

    // Your protected logic here
    return NextResponse.json({
      message: 'Success',
      user: user.login,
    });
  } catch (error) {
    return unauthorizedResponse('You must be logged in to access this endpoint');
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const body = await request.json();

    // Process authenticated request
    // user.login contains the GitHub username
    // user.accessToken can be used for GitHub API calls

    return NextResponse.json({ success: true });
  } catch (error) {
    return unauthorizedResponse();
  }
}
```

### Client Component with Auth Hook

```tsx
// src/components/MyClientComponent.tsx
'use client';

import { useAuth } from '@/lib/hooks/useAuth';

export default function MyClientComponent() {
  const { isAuthenticated, user, isLoading, error } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div>
        <p>Please log in to continue</p>
        <button onClick={() => window.location.href = '/admin/login'}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>Logged in as @{user.login}</p>
      <img src={user.avatar_url} alt={user.login} />
    </div>
  );
}
```

### Using AuthButton Component

```tsx
// src/app/my-page/page.tsx
import AuthButton from '@/components/admin/AuthButton';

export default function MyPage() {
  return (
    <div>
      <header>
        <AuthButton redirectTo="/admin" />
      </header>
    </div>
  );
}
```

### Manual Login/Logout

```tsx
'use client';

import { loginWithGitHub, logout } from '@/lib/hooks/useAuth';

export default function ManualAuth() {
  return (
    <div>
      <button onClick={() => loginWithGitHub('/admin/dashboard')}>
        Login
      </button>

      <button onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
```

## API Reference

### Server-Side Functions (`@/lib/auth`)

#### `getGitHubAuthUrl(redirectTo?: string): Promise<string>`

Generates GitHub OAuth authorization URL with CSRF protection.

**Parameters:**
- `redirectTo` (optional): Path to redirect to after successful authentication

**Returns:** Authorization URL string

**Example:**
```typescript
const authUrl = await getGitHubAuthUrl('/admin/settings');
// Returns: https://github.com/login/oauth/authorize?client_id=...&state=...
```

---

#### `handleGitHubCallback(code: string, state: string): Promise<{ user: GitHubUser; redirectTo?: string } | null>`

Handles OAuth callback, creates session.

**Parameters:**
- `code`: Authorization code from GitHub
- `state`: CSRF state parameter

**Returns:** User object with optional redirect path, or null if authentication failed

**Example:**
```typescript
const result = await handleGitHubCallback(code, state);
if (result) {
  console.log(`User ${result.user.login} logged in`);
}
```

---

#### `getCurrentUser(): Promise<GitHubUser | null>`

Gets the currently authenticated user from session.

**Returns:** User object or null if not authenticated

**Example:**
```typescript
const user = await getCurrentUser();
if (user) {
  console.log(`Current user: @${user.login}`);
}
```

---

#### `isAuthenticated(): Promise<boolean>`

Checks if user has valid session.

**Returns:** Boolean indicating authentication status

**Example:**
```typescript
const authenticated = await isAuthenticated();
if (authenticated) {
  // User is logged in
}
```

---

#### `requireAuth(): Promise<GitHubUser>`

Requires authentication, throws error if not authenticated.

**Returns:** User object

**Throws:** Error if not authenticated

**Example:**
```typescript
export async function GET() {
  try {
    const user = await requireAuth();
    return Response.json({ user: user.login });
  } catch (error) {
    return unauthorizedResponse();
  }
}
```

---

#### `clearSession(): Promise<void>`

Clears the session cookie and logs out user.

**Example:**
```typescript
await clearSession();
```

---

#### `isUserAuthorized(username: string): boolean`

Checks if a GitHub username is in the authorized users list.

**Parameters:**
- `username`: GitHub username to check

**Returns:** Boolean indicating if user is authorized

**Example:**
```typescript
if (isUserAuthorized('octocat')) {
  // User is authorized
}
```

---

#### `unauthorizedResponse(message?: string): Response`

Creates a 401 Unauthorized response.

**Parameters:**
- `message` (optional): Custom error message

**Returns:** Response object with 401 status

**Example:**
```typescript
return unauthorizedResponse('You need admin access');
```

### Client-Side Functions (`@/lib/hooks/useAuth`)

#### `useAuth(): AuthState`

React hook for authentication state.

**Returns:**
```typescript
{
  isAuthenticated: boolean;
  user: GitHubUser | null;
  isLoading: boolean;
  error: string | null;
}
```

**Example:**
```typescript
function MyComponent() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not logged in</div>;

  return <div>Hello, {user?.login}!</div>;
}
```

---

#### `loginWithGitHub(redirectTo?: string): void`

Initiates GitHub OAuth login flow.

**Parameters:**
- `redirectTo` (optional): Path to redirect to after login

**Example:**
```typescript
<button onClick={() => loginWithGitHub('/admin/dashboard')}>
  Login
</button>
```

---

#### `logout(): Promise<void>`

Logs out user and redirects to home.

**Example:**
```typescript
<button onClick={() => logout()}>
  Logout
</button>
```

### Types

#### `GitHubUser`

```typescript
interface GitHubUser {
  id: number;
  login: string;              // GitHub username
  name: string | null;        // Display name
  email: string | null;       // Primary email
  avatar_url: string;         // Profile picture URL
  bio: string | null;         // User bio
}
```

#### `Session`

```typescript
interface Session {
  user: GitHubUser;
  accessToken: string;        // GitHub access token
  expiresAt: number;          // Timestamp when session expires
}
```

## Configuration

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GITHUB_CLIENT_ID` | Yes | GitHub OAuth App Client ID | `abc123def456` |
| `GITHUB_CLIENT_SECRET` | Yes | GitHub OAuth App Client Secret | `secret_abc123` |
| `GITHUB_CALLBACK_URL` | No | OAuth callback URL (defaults to NEXT_PUBLIC_SITE_URL + path) | `https://example.com/api/auth/github/callback` |
| `GITHUB_AUTHORIZED_USERS` | Yes | Comma-separated list of authorized GitHub usernames | `octocat,johndoe` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your website URL | `https://rubyswineshop.com.au` |

### Session Configuration

Modify these constants in `src/lib/auth.ts`:

```typescript
// Session duration (default: 7 days)
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

// OAuth state expiration (default: 10 minutes)
const STATE_MAX_AGE = 60 * 10;

// Cookie names
const SESSION_COOKIE_NAME = 'admin_session';
const STATE_COOKIE_NAME = 'oauth_state';
```

## Security Considerations

### Production Checklist

- [ ] Use HTTPS only (enforced automatically)
- [ ] Keep Client Secret secure (never commit to git)
- [ ] Regularly rotate OAuth credentials
- [ ] Enable 2FA on all admin GitHub accounts
- [ ] Review authorized users list regularly
- [ ] Monitor authentication logs
- [ ] Use latest Next.js version
- [ ] Keep dependencies updated

### Recommended Enhancements

1. **Proper Encryption**: Replace base64 encoding with proper encryption library
   ```bash
   npm install @hapi/iron
   ```

2. **Rate Limiting**: Add rate limiting to auth endpoints
   ```bash
   npm install @upstash/ratelimit
   ```

3. **Audit Logging**: Log all authentication events
   ```typescript
   console.log(`[AUTH] User ${user.login} logged in from ${ip}`);
   ```

4. **IP Allowlisting**: Restrict admin access to specific IPs
   ```typescript
   // In middleware.ts
   const allowedIPs = ['1.2.3.4', '5.6.7.8'];
   const clientIP = request.ip;
   if (!allowedIPs.includes(clientIP)) {
     return unauthorizedResponse('IP not allowed');
   }
   ```

### Session Security

- Sessions are stored in HTTP-only cookies (not accessible to JavaScript)
- Cookies use `secure` flag in production (HTTPS only)
- Cookies use `sameSite: 'lax'` to prevent CSRF
- Sessions expire after 7 days
- No automatic session extension (must re-authenticate)

## Testing

### Manual Testing

1. **Test Login Flow**
   ```
   Visit: http://localhost:3000/admin/login
   Click: "Continue with GitHub"
   Authorize: App on GitHub
   Verify: Redirected to /admin dashboard
   ```

2. **Test Authorization**
   ```
   Remove your username from GITHUB_AUTHORIZED_USERS
   Try to login
   Verify: "Unauthorized" error appears
   ```

3. **Test Session Persistence**
   ```
   Login to admin panel
   Close browser
   Reopen and visit /admin
   Verify: Still logged in (session persists)
   ```

4. **Test Logout**
   ```
   Click logout button
   Verify: Redirected to home page
   Try to access /admin
   Verify: Redirected to login page
   ```

### Automated Testing

Example test with Jest:

```typescript
// __tests__/auth.test.ts
import { isUserAuthorized } from '@/lib/auth';

describe('Authentication', () => {
  it('should authorize listed users', () => {
    process.env.GITHUB_AUTHORIZED_USERS = 'octocat,johndoe';
    expect(isUserAuthorized('octocat')).toBe(true);
    expect(isUserAuthorized('janedoe')).toBe(false);
  });
});
```

## Troubleshooting

### Common Issues

**Issue: Redirect URI mismatch**
```
Error: The redirect_uri MUST match the registered callback URL
```
Solution: Ensure `GITHUB_CALLBACK_URL` exactly matches your GitHub OAuth app settings

---

**Issue: Unauthorized user**
```
Error: You are not authorized to access this admin panel
```
Solution: Add your GitHub username to `GITHUB_AUTHORIZED_USERS` environment variable

---

**Issue: Session not persisting**
```
Problem: Logged out on every page refresh
```
Solution: Check browser cookie settings, ensure cookies are enabled

---

**Issue: Invalid state parameter**
```
Error: Invalid OAuth state parameter
```
Solution: Clear browser cookies and try again. Don't bookmark OAuth callback URL.

---

**Issue: Environment variables not loaded**
```
Error: Cannot read property 'CLIENT_ID' of undefined
```
Solution: Restart dev server after changing `.env.local`, ensure file is in project root

### Debug Mode

Add this to `src/lib/auth.ts` to enable debug logging:

```typescript
const DEBUG = process.env.NODE_ENV === 'development';

function debug(...args: any[]) {
  if (DEBUG) {
    console.log('[AUTH]', ...args);
  }
}

// Use in functions:
debug('User authenticated:', user.login);
```

## Migration and Updates

### From Basic Auth

If migrating from basic authentication:

1. Remove old auth logic
2. Update API routes to use `requireAuth()`
3. Update client components to use `useAuth()` hook
4. Add middleware protection
5. Update environment variables

### Version Updates

When updating Next.js or dependencies:

1. Test auth flow thoroughly
2. Check for cookie API changes
3. Verify middleware compatibility
4. Review security advisories

## Support

For issues or questions:

1. Check [GITHUB_OAUTH_SETUP.md](./GITHUB_OAUTH_SETUP.md) for setup instructions
2. Review this documentation
3. Check GitHub OAuth documentation: https://docs.github.com/en/developers/apps/building-oauth-apps
4. Check Next.js documentation: https://nextjs.org/docs

## License

This authentication system is part of Ruby's Wine Bar website project.
