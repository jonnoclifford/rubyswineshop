# GitHub OAuth Quick Reference

## Environment Variables

```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback
GITHUB_AUTHORIZED_USERS=username1,username2
```

## Common Code Snippets

### Server Component Protection

```tsx
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  return <div>Welcome, {user.login}!</div>;
}
```

### Protected API Route

```tsx
import { requireAuth, unauthorizedResponse } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    // Your logic here
    return Response.json({ success: true });
  } catch {
    return unauthorizedResponse();
  }
}
```

### Client Component with Auth

```tsx
'use client';
import { useAuth } from '@/lib/hooks/useAuth';

export default function MyComponent() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not logged in</div>;

  return <div>Hello, {user?.login}!</div>;
}
```

### Login/Logout Buttons

```tsx
'use client';
import { loginWithGitHub, logout } from '@/lib/hooks/useAuth';

// Login
<button onClick={() => loginWithGitHub('/admin')}>Login</button>

// Logout
<button onClick={logout}>Logout</button>
```

### Reusable Auth Button

```tsx
import AuthButton from '@/components/admin/AuthButton';

<AuthButton redirectTo="/admin" />
```

## Routes

| Route | Purpose |
|-------|---------|
| `/admin/login` | Login page |
| `/admin` | Admin dashboard (protected) |
| `/api/auth/github` | Initiate OAuth |
| `/api/auth/github/callback` | OAuth callback |
| `/api/auth/logout` | Logout endpoint |
| `/api/auth/session` | Check session status |

## Setup Steps

1. **Create GitHub OAuth App**
   - Go to: https://github.com/settings/developers
   - New OAuth App
   - Callback URL: `http://localhost:3000/api/auth/github/callback`

2. **Add to .env.local**
   ```env
   GITHUB_CLIENT_ID=...
   GITHUB_CLIENT_SECRET=...
   GITHUB_AUTHORIZED_USERS=your_username
   ```

3. **Test**
   ```bash
   npm run dev
   # Visit http://localhost:3000/admin/login
   ```

## Debugging

```typescript
// Check if environment variables are set
console.log('Client ID:', process.env.GITHUB_CLIENT_ID ? 'Set' : 'Missing');

// Test authorization
import { isUserAuthorized } from '@/lib/auth';
console.log('Authorized:', isUserAuthorized('your_username'));

// Check session
import { getCurrentUser } from '@/lib/auth';
const user = await getCurrentUser();
console.log('Current user:', user?.login);
```

## Security Checklist

- [ ] HTTPS in production
- [ ] Secure Client Secret
- [ ] Rotate credentials regularly
- [ ] Enable 2FA on admin accounts
- [ ] Review authorized users
- [ ] Monitor auth logs
- [ ] Keep dependencies updated

## Common Errors

| Error | Solution |
|-------|----------|
| "Redirect URI mismatch" | Match callback URL in GitHub app settings |
| "Unauthorized" | Add username to GITHUB_AUTHORIZED_USERS |
| "Invalid state" | Clear cookies and try again |
| "Session not persisting" | Check cookie settings in browser |

## File Locations

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Dashboard
│   │   └── login/page.tsx        # Login page
│   └── api/auth/                 # Auth endpoints
├── components/admin/
│   ├── AdminDashboard.tsx
│   ├── LoginForm.tsx
│   └── AuthButton.tsx
├── lib/
│   ├── auth.ts                   # Core auth logic
│   └── hooks/useAuth.ts          # Client hook
└── middleware.ts                  # Route protection
```

## Support

- Full guide: [AUTH_SYSTEM_README.md](./AUTH_SYSTEM_README.md)
- Setup guide: [GITHUB_OAUTH_SETUP.md](./GITHUB_OAUTH_SETUP.md)
- GitHub OAuth docs: https://docs.github.com/en/developers/apps/building-oauth-apps
