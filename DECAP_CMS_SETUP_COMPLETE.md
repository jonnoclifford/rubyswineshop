# Decap CMS Setup - Complete

## Summary

Decap CMS has been successfully configured to work with the existing content structure for Ruby's Wine Bar website. The setup allows content management through a user-friendly web interface at `/admin` without requiring technical knowledge.

## What Was Configured

### 1. Admin Interface Files

**Location**: `/public/admin/`

- **index.html** - Decap CMS admin interface with Netlify Identity widget
- **config.yml** - Complete CMS configuration (290 lines) with:
  - GitHub backend (repo: jonnoclifford/rubyswineshop, branch: main)
  - Media folder: `public/images`
  - Editorial workflow enabled (draft → review → publish)
  - Local backend support for development
  - All 11 site sections configured

### 2. Content Structure

**Content File**: `/src/content/site-config.json`

All site content is managed through a single JSON file with these sections:

1. **Header & Navigation** - Logo, nav links, CTA button
2. **Business Information** - Name, address, contact, hours, coordinates
3. **Hero Section** - Headlines, images, call-to-actions
4. **About Section** - Story paragraphs and image
5. **Menu Section** - Wines by glass/bottle, snacks
6. **Hungry Section** - Partner restaurant info
7. **What's On** - Events and activities
8. **FAQ Section** - Questions and answers
9. **Walk-In Modal** - Walk-in policy
10. **Find Us** - Location and contact
11. **SEO Settings** - Meta tags, keywords, OG image

### 3. Code Integration

**File**: `/src/lib/cms.ts`

A utility module that:
- Reads site-config.json from the file system
- Provides type-safe access to configuration
- Includes helper functions for each section
- Has fallback to TypeScript config if JSON reading fails

**Components Updated**:
- `src/app/layout.tsx` - Uses `getSiteConfig()` for SEO
- `src/app/page.tsx` - Uses `getSiteConfig()` for page content

### 4. Next.js Configuration

**File**: `/next.config.mjs`

Added redirect from `/admin` → `/admin/index.html` for cleaner URL access.

### 5. Documentation

Three comprehensive documentation files created:

1. **SETUP.md** (71KB)
   - How to access the CMS
   - GitHub OAuth setup instructions
   - Local development guide
   - Content editing workflow
   - Troubleshooting guide

2. **DECAP_CMS_TESTING.md** (7.7KB)
   - Pre-deployment testing checklist
   - Production testing steps
   - Issue resolution guide
   - Validation checklist

3. **This file** - Setup completion summary

## Key Features

### Editorial Workflow

The CMS is configured with an editorial workflow:
- **Draft** → Make changes without publishing
- **In Review** → Submit for review
- **Published** → Merge to main branch and deploy

To disable and use simple direct publishing:
```yaml
# In public/admin/config.yml
publish_mode: simple
```

### Local Development

Test content changes locally without GitHub OAuth:

```bash
# Terminal 1: Start local backend
npx decap-server

# Terminal 2: Start dev server
npm run dev

# Access at: http://localhost:3000/admin/index.html
```

### Image Management

- Upload location: `public/images/`
- Accessible at: `/images/filename.ext`
- Supports: JPG, PNG, WebP, SVG
- Automatically handled by Decap CMS

## GitHub OAuth Setup Required

Before production deployment, you need to:

1. **Create GitHub OAuth App**
   - Go to GitHub Settings → Developer Settings → OAuth Apps
   - Create new app with callback: `https://api.netlify.com/auth/done`
   - Save Client ID and Secret

2. **Configure Netlify Identity**
   - Enable Identity in Netlify dashboard
   - Add GitHub as external provider
   - Enter Client ID and Secret

3. **Alternative Providers**
   - If not using Netlify, update `base_url` in config.yml
   - Use custom OAuth solution or third-party provider

See SETUP.md for detailed instructions.

## How to Use

### Accessing the CMS

**Production**: `https://yourdomain.com/admin`
**Local**: `http://localhost:3000/admin` (or `/admin/index.html`)

### Making Content Changes

1. Log in to `/admin`
2. Click "Site Configuration"
3. Expand the section you want to edit
4. Make your changes
5. Click "Save" (creates draft)
6. Move through workflow: Draft → In Review → Publish
7. Changes are committed to GitHub
8. Site rebuilds automatically

### Example: Updating Menu

1. Navigate to **Menu Section** → **By the Glass**
2. Click **Add Glass Wines**
3. Fill in:
   - Wine Name
   - Producer
   - Region
   - Price
   - Description
4. Save and publish
5. New wine appears on the live site after build

### Example: Adding an Event

1. Navigate to **What's On Section**
2. Click **Add Events**
3. Fill in:
   - Event Title
   - Date
   - Time
   - Description
   - Recurring toggle
4. Save and publish
5. Event appears in What's On section

## File Structure

```
RubySite/
├── public/
│   ├── admin/
│   │   ├── index.html        # CMS admin interface
│   │   └── config.yml         # CMS configuration (290 lines)
│   └── images/                # Media uploads location
├── src/
│   ├── content/
│   │   └── site-config.json   # All site content (managed by CMS)
│   └── lib/
│       └── cms.ts             # CMS integration utilities
├── SETUP.md                   # Detailed setup guide
├── DECAP_CMS_TESTING.md       # Testing checklist
└── next.config.mjs            # Includes /admin redirect
```

## Environment Variables

No environment variables required! All configuration is in `/public/admin/config.yml`.

## Deployment Checklist

Before going live:

- [ ] Set up GitHub OAuth app
- [ ] Configure Netlify Identity (or alternative)
- [ ] Test CMS access locally with `decap-server`
- [ ] Verify config.yml syntax is correct
- [ ] Test content changes locally
- [ ] Deploy to Netlify/Vercel
- [ ] Test OAuth login in production
- [ ] Make a test content change
- [ ] Verify build triggers and deploys
- [ ] Train content editors (refer to SETUP.md)

## Testing the Setup

Run through DECAP_CMS_TESTING.md checklist to validate:

1. CMS loads without errors
2. All sections are editable
3. Images can be uploaded
4. Changes save to site-config.json
5. Editorial workflow functions (if enabled)
6. OAuth authentication works (production)
7. Builds trigger on content changes
8. Changes appear on live site

## Package Dependencies

Current dependencies (already installed):

```json
{
  "decap-cms-app": "^3.10.0"  // Decap CMS package
}
```

The CMS is loaded from CDN in production for optimal performance.

## Migration from TinaCMS

This setup replaces the previous TinaCMS configuration:

- ❌ Removed: TinaCMS dependencies and configuration
- ❌ Removed: `.tina/` directory
- ✅ Added: Decap CMS with simpler setup
- ✅ Retained: Same content structure (site-config.json)
- ✅ Retained: All existing content unchanged
- ✅ Improved: No build-time CMS compilation needed

## Benefits of This Setup

1. **Simple**: No API layer, reads directly from JSON
2. **Fast**: No CMS build step required
3. **Open Source**: Fully self-hosted, no external dependencies
4. **Git-based**: All changes tracked in version control
5. **Type-safe**: TypeScript types for all content
6. **Flexible**: Easy to customize and extend
7. **Portable**: Can move to any hosting provider

## Next Steps

1. **Set up OAuth** (see SETUP.md)
2. **Deploy to production** (Netlify/Vercel)
3. **Test in production** (use DECAP_CMS_TESTING.md)
4. **Train content editors** (share SETUP.md)
5. **Customize workflow** (adjust publish_mode if needed)
6. **Set up backups** (optional: automated JSON backups)

## Support and Resources

- **Documentation**: See SETUP.md for detailed instructions
- **Testing**: Follow DECAP_CMS_TESTING.md for validation
- **Official Docs**: https://decapcms.org/docs/
- **Widget Reference**: https://decapcms.org/docs/widgets/
- **GitHub Backend**: https://decapcms.org/docs/github-backend/

## Troubleshooting

Common issues and solutions are documented in SETUP.md under "Troubleshooting" section.

Quick reference:
- Config errors → Check YAML syntax
- OAuth errors → Verify GitHub app settings
- Build errors → Check deployment logs
- Image upload issues → Verify media_folder path

---

**Setup Date**: February 2, 2026
**Status**: ✅ Complete and ready for testing
**Next Action**: Set up GitHub OAuth and deploy to production

## Questions?

Refer to the documentation files or check the official Decap CMS documentation at https://decapcms.org
