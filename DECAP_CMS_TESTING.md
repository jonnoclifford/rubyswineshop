# Decap CMS Testing Checklist

This document outlines the testing steps to verify Decap CMS is properly configured and working.

## Configuration Files Created

- ✅ `/public/admin/index.html` - Decap CMS admin interface
- ✅ `/public/admin/config.yml` - CMS configuration with all site sections
- ✅ `/src/lib/config-client.ts` - Simplified config client for reading site-config.json
- ✅ `/next.config.mjs` - Updated with /admin redirect
- ✅ `SETUP.md` - Comprehensive setup and usage documentation

## Pre-deployment Testing (Local)

### 1. Test Local Access (Without OAuth)

**Setup:**
```bash
# Terminal 1: Start local backend
npx decap-server

# Terminal 2: Start dev server
npm run dev
```

**Test:**
1. Navigate to `http://localhost:3000/admin/index.html`
2. You should see the Decap CMS interface
3. Click "Login with Local Backend" (if using decap-server)
4. Verify you can see "Site Configuration" collection

### 2. Test Configuration Loading

**Check:**
- Open browser console
- Look for any errors related to config.yml
- Verify the CMS loads all sections:
  - Header & Navigation
  - Business Information
  - Hero Section
  - About Section
  - Menu Section
  - Hungry Section
  - What's On Section
  - FAQ Section
  - Walk-In Modal
  - Find Us Section
  - SEO Settings

### 3. Test Content Editing (Local Backend)

**Test editing a simple field:**
1. Click "Site Configuration"
2. Expand "Business Information"
3. Change the "Tagline" field
4. Click "Save"
5. Click "Publish"
6. Check that changes appear in `src/content/site-config.json`

**Test adding a menu item:**
1. Navigate to "Menu Section"
2. Expand "By the Glass" > "Glass Wines"
3. Click "Add Glass Wines"
4. Fill in wine details:
   - Name: Test Wine
   - Producer: Test Producer
   - Region: Test Region
   - Price: $15
   - Description: Test description
5. Save and publish
6. Verify the new item appears in site-config.json

### 4. Test Image Upload

**Upload a test image:**
1. In the CMS, navigate to any image field (e.g., "About Section" > "About Image")
2. Click the image selector
3. Upload a test image
4. Verify it saves to `public/images/`
5. Check that the path in the JSON is `/images/filename.ext`

### 5. Test List Fields

**Test adding an event:**
1. Navigate to "What's On Section"
2. Click "Add Events"
3. Fill in event details
4. Save and publish
5. Verify it appears in the site-config.json

**Test FAQ item:**
1. Navigate to "FAQ Section"
2. Add a new FAQ item
3. Save and publish
4. Verify formatting is preserved

## Production Deployment Testing

### 1. GitHub OAuth Setup

**Before deploying, ensure:**
- [ ] GitHub OAuth app is created
- [ ] Client ID and Secret are saved
- [ ] Netlify Identity is configured (if using Netlify)
- [ ] Base URL in config.yml matches your OAuth provider

### 2. Deploy to Netlify

**Deployment checklist:**
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
# (None required for Decap CMS - configuration is in config.yml)
```

### 3. Test Production Access

**After deployment:**
1. Navigate to `https://yourdomain.com/admin`
2. Click "Login with GitHub"
3. Authorize the OAuth app
4. Verify you can access the CMS

### 4. Test Content Changes in Production

**Make a simple change:**
1. Edit a text field (e.g., business tagline)
2. Save as draft
3. Set to "In Review" (editorial workflow)
4. Publish the change
5. Verify:
   - A pull request was created (editorial workflow) or commit was made (simple mode)
   - Netlify triggered a rebuild
   - Changes appear on the live site

### 5. Test Editorial Workflow

**If using editorial workflow:**
1. Make multiple changes
2. Save as draft
3. Go to "Workflow" tab in CMS
4. Verify draft appears in "Drafts" column
5. Move to "In Review"
6. Verify it appears in "In Review" column
7. Click "Publish"
8. Verify:
   - PR is merged to main branch
   - Build is triggered
   - Changes go live

### 6. Test Media Upload in Production

1. Navigate to any image field
2. Upload a new image
3. Save and publish
4. Verify:
   - Image appears in `public/images/` in repo
   - Image is accessible at `/images/filename.ext`
   - Image displays correctly on the site

## Common Issues and Solutions

### Issue: CMS shows "Failed to load config"

**Solutions:**
- Check YAML syntax in `config.yml` (indentation matters!)
- Verify `src/content/site-config.json` exists and is valid JSON
- Check browser console for specific errors

### Issue: "Error: Missing backend"

**Solutions:**
- Verify `backend` section in config.yml has correct repo name
- For local testing, ensure `local_backend: true` is set
- For production, ensure GitHub OAuth is configured

### Issue: Changes don't appear on site

**Solutions:**
- Check that build completed successfully
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+F5)
- Verify changes were committed to the main branch
- Check deployment logs in Netlify/Vercel

### Issue: Images not uploading

**Solutions:**
- Verify `media_folder` is set to `"public/images"`
- Check `public_folder` is set to `"/images"`
- Ensure you have write permissions to the repository
- Check file size (keep under 10MB for GitHub)

### Issue: "Unhandled error" when clicking a field

**Solutions:**
- Check that the field type in config.yml matches the data type in site-config.json
- For list fields, ensure the structure matches exactly
- Look for typos in field names

## Validation Checklist

Before considering setup complete:

- [ ] CMS loads without errors at `/admin`
- [ ] All 11 sections are visible and editable
- [ ] Can save changes locally (with decap-server)
- [ ] Images can be uploaded to `public/images/`
- [ ] Changes are reflected in `site-config.json`
- [ ] GitHub OAuth is configured (production)
- [ ] Can login and access CMS in production
- [ ] Changes made in CMS trigger builds
- [ ] Editorial workflow works (if enabled)
- [ ] List fields (menu items, events, FAQ) work correctly
- [ ] Image fields work correctly
- [ ] Changes appear on live site after build

## Performance Notes

- First load of CMS may take a few seconds (loading Decap CMS from CDN)
- Editorial workflow adds overhead but provides safety
- Consider using "simple" publish mode if you don't need review process
- Large images will increase commit size - optimize before upload

## Next Steps After Validation

1. Train content editors on CMS usage (refer to SETUP.md)
2. Set up Netlify Identity and invite users (if using Netlify)
3. Consider setting up automated backups of `site-config.json`
4. Document any custom workflows specific to your team
5. Set up notifications for build failures

## Support Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [GitHub Backend Setup](https://decapcms.org/docs/github-backend/)
- [Widget Reference](https://decapcms.org/docs/widgets/)
- Project SETUP.md for detailed instructions

---

**Testing Date**: _____________
**Tested By**: _____________
**Status**: _____________
**Notes**: _____________
