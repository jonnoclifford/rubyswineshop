# Decap CMS Setup Guide for Ruby's Wine Bar

This guide will help you set up and use Decap CMS to manage content for the Ruby's Wine Bar website.

## Table of Contents

1. [Accessing the CMS](#accessing-the-cms)
2. [GitHub OAuth Setup](#github-oauth-setup)
3. [Local Development](#local-development)
4. [Making Content Changes](#making-content-changes)
5. [Content Structure](#content-structure)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Accessing the CMS

### Production
Once deployed, access the CMS at:
```
https://yourdomain.com/admin
```

### Local Development
When running the development server:
```
http://localhost:3000/admin
```

---

## GitHub OAuth Setup

Decap CMS requires GitHub OAuth for authentication. Follow these steps:

### Step 1: Create a GitHub OAuth App

1. Go to your GitHub account settings
2. Navigate to **Developer settings** > **OAuth Apps** > **New OAuth App**
3. Fill in the application details:
   - **Application name**: Ruby's Wine Bar CMS
   - **Homepage URL**: `https://yourdomain.com` (or your Netlify URL)
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`

4. Click **Register application**
5. You'll receive a **Client ID** - save this
6. Click **Generate a new client secret** and save the secret (you won't see it again!)

### Step 2: Configure Netlify Identity (Recommended)

If deploying to Netlify:

1. In your Netlify site dashboard, go to **Settings** > **Identity**
2. Click **Enable Identity**
3. Under **Registration preferences**, set to "Invite only" for security
4. Under **External providers**, click **Add provider** > **GitHub**
5. Enter your GitHub OAuth **Client ID** and **Client Secret**
6. Save the settings

### Step 3: Alternative OAuth Providers

If not using Netlify, you can use other OAuth providers:
- [Netlify's OAuth client](https://github.com/netlify/netlify-cms-oauth-provider-node)
- [gatsby-plugin-netlify-cms](https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cms/)
- Custom OAuth solution

Update the `base_url` in `/public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: jonnoclifford/rubyswineshop
  branch: main
  base_url: YOUR_OAUTH_PROVIDER_URL
```

---

## Local Development

For local development without OAuth:

### Step 1: Install Decap Server

```bash
npm install -g decap-server
```

### Step 2: Run the Local Proxy

In one terminal:
```bash
npx decap-server
```

This runs a local Git proxy server on port 8081.

### Step 3: Run Your Dev Server

In another terminal:
```bash
npm run dev
```

### Step 4: Access the Local CMS

Navigate to `http://localhost:3000/admin`

The CMS will automatically use the local backend (configured in `config.yml` with `local_backend: true`).

---

## Making Content Changes

### Using the Editorial Workflow

The CMS is configured with an **editorial workflow** (draft → review → publish):

1. **Make Changes**: Edit content in the CMS
2. **Save as Draft**: Changes are saved to a draft branch
3. **Set to "In Review"**: Move to review status
4. **Publish**: Merge changes to the main branch

To change to **direct publishing** (no review process):

Edit `/public/admin/config.yml`:
```yaml
publish_mode: simple
```

### Content Types

All site content is in a single configuration file:
- **Location**: `src/content/site-config.json`
- **Sections**: Header, Business Info, Hero, About, Menu, Events, FAQ, etc.

### Editing Steps

1. Log in to `/admin`
2. Click **Site Configuration**
3. Expand the section you want to edit (e.g., "Menu Section", "Events")
4. Make your changes
5. Click **Save** (creates a draft)
6. Click **Publish** or move through the editorial workflow
7. Your changes will be committed to GitHub
8. Netlify/Vercel will automatically rebuild and deploy

---

## Content Structure

### Key Sections

| Section | Description |
|---------|-------------|
| **Header & Navigation** | Logo, navigation links, CTA button |
| **Business Information** | Name, address, contact, hours, coordinates |
| **Hero Section** | Main headline, images, call-to-actions |
| **About Section** | Story paragraphs and image |
| **Menu Section** | Wine by glass/bottle, snacks |
| **Hungry Section** | Partner restaurant information |
| **What's On** | Events and recurring activities |
| **FAQ Section** | Common questions and answers |
| **Walk-In Modal** | Walk-in policy information |
| **Find Us** | Location, map, contact details |
| **SEO Settings** | Meta title, description, keywords, OG image |

### Image Management

- **Upload Location**: `public/images/`
- **Public URL**: `/images/filename.jpg`
- Supported formats: JPG, PNG, WebP, SVG
- Recommended: Optimize images before upload (use tools like TinyPNG)

---

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Enable GitHub OAuth (see above)
5. Push changes to trigger automatic deployment

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel auto-detects Next.js settings
3. For OAuth, use a custom solution or Netlify's OAuth provider
4. Push changes to trigger automatic deployment

### Environment Variables

No special environment variables are required for Decap CMS. All configuration is in `/public/admin/config.yml`.

---

## Troubleshooting

### "Failed to load config" Error

- Check that `/public/admin/config.yml` exists
- Verify YAML syntax (indentation matters!)
- Check browser console for specific errors

### "Error loading the CMS configuration"

- Ensure `src/content/site-config.json` exists
- Verify JSON is valid (no trailing commas, proper quotes)

### OAuth Authentication Failed

- Double-check GitHub OAuth Client ID and Secret
- Verify callback URL matches your OAuth app settings
- For Netlify: ensure Identity is enabled and GitHub provider is configured

### Changes Not Appearing on Site

- Check that the build succeeded on Netlify/Vercel
- Verify changes were committed to the `main` branch
- Clear browser cache or do a hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)

### Local Backend Not Working

- Ensure `decap-server` is running (`npx decap-server`)
- Check that port 8081 is not in use by another service
- Verify `local_backend: true` is in `config.yml`

### File Permissions Issues

If you get permission errors when committing:
- Ensure your GitHub account has write access to the repository
- Check that the OAuth app has the correct scopes

---

## Additional Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Configuration Options](https://decapcms.org/docs/configuration-options/)
- [Widget Documentation](https://decapcms.org/docs/widgets/)
- [GitHub OAuth Setup Guide](https://decapcms.org/docs/github-backend/)

---

## Quick Reference

### Access CMS
```
Production: https://yourdomain.com/admin
Local: http://localhost:3000/admin
```

### Start Development
```bash
# Terminal 1 (for local editing without OAuth)
npx decap-server

# Terminal 2
npm run dev
```

### Configuration Files
```
/public/admin/config.yml      # Decap CMS configuration
/public/admin/index.html       # CMS admin interface
/src/content/site-config.json  # All site content
```

---

**Need help?** Open an issue on GitHub or contact the development team.
