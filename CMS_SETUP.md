# Tina CMS Setup Guide

A comprehensive guide for setting up and using Tina CMS to manage content for Ruby's Wine Bar website.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Getting Tina Credentials](#getting-tina-credentials)
3. [Environment Variables](#environment-variables)
4. [Admin Access](#admin-access)
5. [Content Editing](#content-editing)
6. [Publishing Changes](#publishing-changes)
7. [Image Management](#image-management)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Running the CMS Locally

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with your Tina credentials (see [Environment Variables](#environment-variables)):
   ```bash
   cp .env.example .env.local
   # Then edit .env.local with your actual credentials
   ```

3. Start the development server with Tina CMS:
   ```bash
   npm run dev
   ```
   This command runs `tinacms dev -c "next dev"` which starts both the Tina CMS and Next.js development server.

4. Open your browser to:
   - Website: http://localhost:3000
   - Admin Interface: http://localhost:3000/admin

That's it! You should now see the Tina CMS admin interface.

---

## Getting Tina Credentials

Follow these steps to set up your Tina Cloud account and get the required credentials.

### Step 1: Create a Tina Cloud Account

1. Go to [https://app.tina.io](https://app.tina.io)
2. Click "Sign Up" to create a free account
3. You can sign up with:
   - GitHub (recommended for seamless integration)
   - Email and password
4. Verify your email if prompted

### Step 2: Create a New Project

1. After logging in, click "Create Project"
2. Fill in the project details:
   - **Project Name**: Ruby's Wine Bar (or your preferred name)
   - **Description**: Optional - describe your project
3. Connect your GitHub repository:
   - Select the repository where this project is hosted
   - Grant Tina access to the repository
4. Choose the branch:
   - Select `main` (or whichever branch you're using)
   - This should match your deployment branch

### Step 3: Get Your Client ID

1. Once your project is created, you'll be taken to the project dashboard
2. Look for the "Overview" or "Configuration" section
3. Find the **Client ID** field
4. Copy the Client ID (it looks like a random string: `abc123def456ghi789`)
5. Save it - you'll need this for your environment variables

### Step 4: Generate an API Token

1. In your Tina project dashboard, navigate to "Tokens" or "API Tokens" in the sidebar
2. Click "Create Token" or "New Token"
3. Configure your token:
   - **Token Name**: Give it a descriptive name (e.g., "Local Development" or "Production")
   - **Token Type**: Choose "Read-Only Token" for development or "Content Token" for full access
   - **Permissions**: Typically "Read" for development, "Read/Write" for production editing
4. Click "Create Token"
5. **Important**: Copy the token immediately - you won't be able to see it again!
6. Store it securely - you'll need this for your environment variables

### Step 5: Configure Branch Settings

1. In your Tina project dashboard, go to "Settings" or "Configuration"
2. Verify the branch is set correctly:
   - Should match your git branch name (`main`, `master`, etc.)
3. Ensure the repository is properly connected
4. Save any changes

---

## Environment Variables

### Required Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Tina CMS Configuration
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_from_tina_cloud
TINA_TOKEN=your_token_from_tina_cloud
NEXT_PUBLIC_TINA_BRANCH=main

# Local Development Mode (optional)
TINA_PUBLIC_IS_LOCAL=true
```

### Variable Descriptions

| Variable | Description | Required | Visibility |
|----------|-------------|----------|------------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Your Tina Cloud project's client ID | Yes | Public (browser) |
| `TINA_TOKEN` | Authentication token for Tina Cloud API | Yes | Server-side only |
| `NEXT_PUBLIC_TINA_BRANCH` | Git branch for content (usually `main`) | Yes | Public (browser) |
| `TINA_PUBLIC_IS_LOCAL` | Use local filesystem in development | No | Public (browser) |

### Local vs Production Mode

**Local Development Mode** (`TINA_PUBLIC_IS_LOCAL=true`):
- Uses your local filesystem to read/write content
- Changes are made directly to files in `src/content/`
- Faster development cycle
- No internet connection needed for the CMS
- Recommended for development

**Production Mode** (`TINA_PUBLIC_IS_LOCAL=false` or not set):
- Uses Tina Cloud's hosted database
- Changes are synced to your git repository
- Required for production deployments
- Enables collaborative editing
- Recommended for staging and production

### Security Notes

- Never commit `.env.local` to git (it's in `.gitignore`)
- Use different tokens for development and production
- Keep your `TINA_TOKEN` secret (never expose it in client-side code)
- Regenerate tokens if they're ever compromised
- The `.env.example` file shows the structure but contains no real credentials

---

## Admin Access

### Accessing the Admin Interface

Once your environment is configured and the development server is running:

1. Navigate to http://localhost:3000/admin (or your production URL + `/admin`)
2. The admin interface will load automatically
3. You should see the Tina CMS editor

### Admin Interface Overview

The Tina admin interface has three main areas:

1. **Navigation Sidebar** (left):
   - Collections list (e.g., "Site Configuration")
   - Media manager
   - Settings

2. **Content Editor** (middle):
   - Form fields for editing content
   - Rich text editors for descriptions
   - Image upload areas
   - Organized sections matching your schema

3. **Preview Pane** (right):
   - Live preview of your changes
   - Shows how content will appear on the website
   - Updates in real-time as you edit

### First-Time Setup

When you first access the admin interface:

1. You'll see "Site Configuration" in the collections list
2. Click on it to open the editor
3. If no configuration exists, you may need to create one
4. The schema is pre-configured with all necessary fields

---

## Content Editing

### Available Content Sections

The CMS is organized into the following editable sections:

#### 1. Business Information
- Business name and tagline
- Address (street, suburb, state, postcode, country)
- Contact details (phone, email, Instagram)
- Business hours for each day of the week
- Map coordinates (latitude/longitude)

#### 2. Hero Section
- Headline and subheadline
- Call-to-action buttons (primary and secondary)
- Hero images (desktop and mobile versions)
- Image alt text for accessibility

#### 3. About Section
- Heading
- Story paragraphs (add multiple paragraphs)
- About image with alt text

#### 4. Menu Section
- Main heading
- **By the Glass**: Individual wines with name, producer, region, price, description
- **By the Bottle**: Organized into categories (Sparkling, White/Orange, Red)
  - Each category has multiple wines
- **Snacks**: Food items with name, description, and price

#### 5. Hungry Section
- Heading
- Description paragraphs
- Partner name and link
- Image with alt text

#### 6. What's On Section
- Heading
- Events list with:
  - Title, date, time
  - Description
  - Recurring event toggle

#### 7. FAQ Section
- Heading
- FAQ items with questions and answers

#### 8. Walk-In Modal
- Modal heading
- Message paragraphs
- Hours heading
- CTA button text

#### 9. Find Us Section
- Heading
- Google Maps embed URL
- Contact heading

#### 10. SEO Settings
- Page title
- Meta description
- Keywords (list)
- Open Graph image

### How to Edit Content

1. **Access the Admin**: Go to http://localhost:3000/admin
2. **Select Collection**: Click "Site Configuration" in the sidebar
3. **Choose the File**: Click on "site-config" to edit
4. **Edit Fields**:
   - Click on any section to expand it
   - Edit text fields directly
   - Use the textarea for longer content
   - Click "+" to add items to lists (e.g., new menu items)
   - Click the trash icon to remove items
5. **Save Changes**: Click the "Save" button at the top of the editor

### Content Editing Tips

- **Text Fields**: Single-line inputs for short text like titles and names
- **Textarea Fields**: Multi-line inputs for longer content like descriptions
- **Lists**: Use the "+" button to add items, drag to reorder, trash icon to delete
- **Required Fields**: Marked with a red asterisk (*)
- **Image Fields**: Click to upload or select existing images
- **Rich Text**: Some fields support basic formatting (if configured)

### Adding New Items

**To add a new wine to "By the Glass":**
1. Navigate to Menu → By the Glass → Glass Wines
2. Click the "+" button to add a new item
3. Fill in: name, producer, region, price, description
4. Click "Save"

**To add a new event:**
1. Navigate to What's On → Events
2. Click the "+" button
3. Fill in: title, date, time, description
4. Toggle "Recurring Event" if applicable
5. Click "Save"

**To add a new FAQ:**
1. Navigate to FAQ → FAQ Items
2. Click the "+" button
3. Fill in: question and answer
4. Click "Save"

---

## Publishing Changes

### How Publishing Works

The publishing workflow for this site follows this flow:

```
Edit in CMS → Save → Git Commit → Push to GitHub → Vercel Auto-Deploy
```

### Local Development Workflow

When `TINA_PUBLIC_IS_LOCAL=true`:

1. **Edit Content**: Make changes in the admin interface
2. **Save**: Click the "Save" button
3. **File Updated**: Changes are written to `src/content/site-config.ts`
4. **Review Changes**: Check git status to see what changed
   ```bash
   git status
   git diff src/content/site-config.ts
   ```
5. **Commit**: Commit your changes
   ```bash
   git add src/content/site-config.ts
   git commit -m "Update menu with new wines"
   ```
6. **Push**: Push to GitHub
   ```bash
   git push
   ```
7. **Auto-Deploy**: Vercel automatically deploys the changes to production

### Production Workflow

When `TINA_PUBLIC_IS_LOCAL=false` (production mode):

1. **Edit Content**: Make changes in the admin interface
2. **Save**: Click the "Save" button
3. **Tina Cloud Sync**: Tina Cloud commits the changes to your GitHub repository
4. **Auto-Deploy**: Vercel detects the commit and automatically deploys

### Deployment Timeline

- **Git Push**: Instant
- **Vercel Build**: Typically 1-3 minutes
- **Live Site Update**: As soon as build completes
- **CDN Propagation**: 1-5 minutes for global availability

### Verifying Deployment

1. **Check Vercel Dashboard**:
   - Go to https://vercel.com
   - View your project's deployments
   - See build logs and status

2. **Check Git History**:
   ```bash
   git log --oneline -5
   ```

3. **Test the Live Site**:
   - Visit your production URL
   - Hard refresh (Cmd+Shift+R or Ctrl+Shift+F5)
   - Verify your changes are visible

---

## Image Management

### Uploading Images

1. **Access Media Manager**:
   - In the Tina admin, look for the "Media" section
   - Or click on any image field to open the media manager

2. **Upload Process**:
   - Click "Upload" button
   - Select image files from your computer
   - Images are saved to `public/images/` directory

3. **Image Organization**:
   - All images stored in `public/images/`
   - Organized by type or section (optional)
   - Referenced in content with path: `/images/filename.jpg`

### Image Best Practices

**File Formats**:
- Use WebP for photos (best compression)
- Use PNG for logos and graphics with transparency
- Use JPEG for photos if WebP not available
- Use SVG for icons and simple graphics

**Image Sizes**:
- **Hero Images**:
  - Desktop: 1920x1080px minimum
  - Mobile: 1080x1920px (portrait)
- **About Image**: 800x1000px
- **OG Image**: 1200x630px
- **Thumbnails**: 400x400px

**Optimization**:
- Compress images before upload (use tools like TinyPNG)
- Target file sizes:
  - Hero images: < 200KB
  - Section images: < 150KB
  - Thumbnails: < 50KB
- Next.js automatically optimizes images through the Image component

**Naming Conventions**:
- Use descriptive names: `wine-glass-red.jpg` not `IMG_1234.jpg`
- Use lowercase and hyphens: `ruby-portrait.jpg` not `Ruby Portrait.jpg`
- Avoid spaces and special characters

### Replacing Images

To replace an existing image:

1. **Method 1 - Upload New File**:
   - Upload image with the same filename
   - The old image is replaced
   - No content updates needed

2. **Method 2 - Upload Different File**:
   - Upload new image with new filename
   - Edit the content to reference new filename
   - Delete old image if no longer needed

### Deleting Images

1. **Check Usage**: Ensure image isn't used anywhere on the site
2. **Delete from Media**: Use the media manager to delete
3. **Or Delete File**: Manually delete from `public/images/` directory

---

## Troubleshooting

### Common Issues and Solutions

#### "Invalid Client ID" Error

**Problem**: CMS shows authentication error about invalid client ID.

**Solutions**:
- Verify `NEXT_PUBLIC_TINA_CLIENT_ID` is correct in `.env.local`
- Copy the client ID again from Tina Cloud (check for extra spaces)
- Ensure no quotes around the value in `.env.local`
- Restart the development server after changing env variables

#### "Authentication Failed" Error

**Problem**: CMS cannot authenticate with Tina Cloud.

**Solutions**:
- Check that `TINA_TOKEN` is valid and correct
- Generate a new token in Tina Cloud dashboard
- Ensure token has appropriate permissions (Read/Write)
- Verify token hasn't expired
- Check for typos in `.env.local`
- Restart dev server

#### "Branch Not Found" Error

**Problem**: CMS cannot find the specified git branch.

**Solutions**:
- Verify `NEXT_PUBLIC_TINA_BRANCH` matches your actual branch name
- Check branch exists: `git branch -a`
- Ensure branch is pushed to GitHub
- Update branch name in Tina Cloud project settings
- Use `main` or `master` as appropriate

#### Admin Page Shows Blank Screen

**Problem**: `/admin` route loads but shows nothing.

**Solutions**:
- Check browser console for JavaScript errors
- Verify Tina CMS is running: look for "Tina CMS" in terminal
- Ensure `npm run dev` is running (not just `npm run dev:next`)
- Clear browser cache and hard refresh
- Check that `public/admin/index.html` exists after build

#### Changes Not Saving

**Problem**: Clicking "Save" doesn't persist changes.

**Solutions**:
- **Local Mode**: Check file permissions on `src/content/site-config.ts`
- **Cloud Mode**: Verify Tina Cloud connection is active
- Check browser console for errors
- Ensure you have write permissions on the repository
- Try refreshing the page and editing again

#### Build Errors

**Problem**: `npm run build` fails with Tina errors.

**Solutions**:
- Run `tinacms build` separately to see specific errors
- Check `.tina/config.ts` for syntax errors
- Verify all environment variables are set
- Clear `.tina/__generated__` folder and rebuild
- Check Node.js version (needs 18+ or 20+)

#### Images Not Loading

**Problem**: Uploaded images don't appear on the site.

**Solutions**:
- Verify image is in `public/images/` directory
- Check image path in content starts with `/images/`
- Ensure image filename has no spaces
- Hard refresh browser (Cmd+Shift+R)
- Check image file permissions

#### Content Changes Not Reflecting on Site

**Problem**: Saved changes don't appear on the live site.

**Solutions**:
- **Local Dev**: Ensure development server reloaded
- **Production**: Check if changes were committed to git
- Verify Vercel deployment succeeded
- Check Vercel deployment logs for errors
- Clear browser cache
- Wait a few minutes for CDN propagation

### Development Environment Issues

#### Port Already in Use

**Problem**: Can't start dev server, port 3000 in use.

**Solutions**:
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

#### Module Not Found Errors

**Problem**: Import errors or missing module errors.

**Solutions**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### TypeScript Errors

**Problem**: Type errors in Tina-generated files.

**Solutions**:
```bash
# Regenerate Tina types
rm -rf .tina/__generated__
npm run dev

# Or run type check
npm run type-check
```

### Getting Help

If you're still experiencing issues:

1. **Check Logs**:
   - Terminal/console output
   - Browser console (F12 → Console tab)
   - Vercel deployment logs

2. **Documentation**:
   - [Tina CMS Documentation](https://tina.io/docs/)
   - [Next.js Documentation](https://nextjs.org/docs)

3. **Community Support**:
   - [Tina Discord](https://discord.com/invite/zumN63Ybpf)
   - [Tina Community Forum](https://community.tinacms.org/)
   - [GitHub Issues](https://github.com/tinacms/tinacms/issues)

4. **Contact Developer**:
   - For project-specific issues, contact your development team

---

## Additional Tips for Business Owners

### Daily Content Updates

**Updating Business Hours**:
1. Go to `/admin`
2. Open Site Configuration
3. Navigate to Business Information → Business Hours
4. Update specific days
5. Save and commit

**Adding Daily Wine Specials**:
1. Go to Menu → By the Glass
2. Add new wine or update existing ones
3. Consider adding notes in the description: "Today's special!"
4. Save and publish

**Updating Events**:
1. Go to What's On → Events
2. Add upcoming events
3. Remove or archive past events
4. Update recurring event details as needed

### Best Practices for Non-Technical Users

- **Save Often**: Click "Save" frequently to avoid losing work
- **Preview First**: Use the preview pane to see changes before publishing
- **Test on Mobile**: Check how changes look on your phone
- **Small Changes**: Make one change at a time for easier troubleshooting
- **Keep a Backup**: Take screenshots of important content before major edits
- **Consistent Formatting**: Follow existing patterns for consistency
- **Ask for Help**: When in doubt, reach out to your developer

### Content Strategy Tips

- Update events weekly to keep content fresh
- Rotate "By the Glass" wines regularly
- Update seasonal descriptions and specials
- Add new FAQ items based on customer questions
- Keep contact information current
- Update business hours for holidays

---

## Quick Reference

### Essential Commands

```bash
# Start development server with CMS
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check
```

### Essential Paths

- **Admin Interface**: http://localhost:3000/admin
- **Content File**: `src/content/site-config.ts`
- **Environment File**: `.env.local`
- **Tina Config**: `.tina/config.ts`
- **Images Folder**: `public/images/`

### Essential Links

- **Tina Cloud Dashboard**: https://app.tina.io
- **Tina Documentation**: https://tina.io/docs/
- **Vercel Dashboard**: https://vercel.com

---

**Last Updated**: February 2026

For technical support or questions about this documentation, contact your development team.
