# 🚀 Start Using Your Custom CMS (5 Minutes)

Your site now has a complete custom CMS admin system. Here's how to activate it:

---

## Step 1: Create GitHub OAuth App (2 minutes)

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name:** Ruby's Wine Bar Admin
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/github/callback`
4. Click "Register application"
5. Copy the **Client ID**
6. Click "Generate a new client secret" and copy it

---

## Step 2: Create GitHub Personal Access Token (1 minute)

1. Go to: https://github.com/settings/tokens/new
2. Name: "Ruby's Wine Bar CMS"
3. Check the **repo** scope (full control of private repositories)
4. Click "Generate token"
5. **Copy the token immediately** (you can't see it again!)

---

## Step 3: Add Credentials (1 minute)

Create or update `.env.local`:

```bash
# GitHub OAuth (from Step 1)
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

# GitHub API (from Step 2)
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=jonnoclifford
GITHUB_REPO=rubyswineshop
GITHUB_BRANCH=main

# Who can access admin
GITHUB_AUTHORIZED_USERS=jonnoclifford

# Required for OAuth
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## Step 4: Start the Admin (30 seconds)

```bash
npm run dev
```

Then visit: **http://localhost:3000/admin**

---

## Step 5: Login and Test (1 minute)

1. Click "Login with GitHub"
2. Authorize the app
3. You'll be redirected to the admin dashboard
4. Try editing something (business hours, wine menu, etc.)
5. Click "Save Changes"
6. Changes commit to GitHub and deploy automatically!

---

## 🎉 You're Done!

You now have a working CMS that:
- ✅ Edits all site content
- ✅ Auto-commits to GitHub
- ✅ Auto-deploys to production
- ✅ Has version history
- ✅ Costs $0/month

---

## For Production (Vercel)

Add the same environment variables to Vercel:

1. Go to https://vercel.com/jonnoclifford/rubyswineshop
2. Settings → Environment Variables
3. Add all variables from `.env.local`
4. Update `GITHUB_CALLBACK_URL` to: `https://rubyswineshop.vercel.app/api/auth/github/callback`
5. Update `NEXTAUTH_URL` to: `https://rubyswineshop.vercel.app`
6. Update GitHub OAuth app callback URL to match

Then visit: **https://rubyswineshop.vercel.app/admin**

---

## Need Help?

- **OAuth Setup:** See `GITHUB_OAUTH_SETUP.md`
- **API Setup:** See `QUICK_START.md`
- **Using Admin:** See `ADMIN_QUICKSTART.md`
- **All Docs:** See `AUTH_SYSTEM_README.md`

---

**Built for Ruby's Wine Bar - Ready to hand off to business owner once configured!**
