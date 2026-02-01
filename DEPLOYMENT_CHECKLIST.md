# Tina CMS Deployment Checklist

This checklist guides you through deploying the Ruby's Wine Bar website with Tina CMS integration to Vercel.

## Pre-Deployment Verification

### Local Testing
- [ ] All environment variables set in `.env.local`
  - [ ] `NEXT_PUBLIC_TINA_CLIENT_ID` configured
  - [ ] `TINA_TOKEN` configured
  - [ ] `NEXT_PUBLIC_TINA_BRANCH` set to `main`
  - [ ] `NEXT_PUBLIC_SITE_URL` configured
  - [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` configured
- [ ] Local development server runs successfully (`npm run dev`)
- [ ] Admin interface accessible at `http://localhost:3000/admin`
- [ ] Content editable in admin interface
- [ ] Can edit and save site configuration
- [ ] Images can be uploaded via Tina media manager

### Code Quality
- [ ] TypeScript compilation passes (`npm run type-check`)
- [ ] Production build succeeds (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] All pages render correctly in production mode (`npm run start`)
- [ ] Test site on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test site on mobile devices (portrait and landscape)

### Git Repository
- [ ] All changes committed to git
- [ ] Repository pushed to GitHub
- [ ] Working on correct branch (typically `main`)
- [ ] `.env.local` is NOT committed (verify `.gitignore` includes it)
- [ ] `.env.example` is up-to-date with all required variables

## Tina Cloud Setup

### Create Tina Cloud Project
1. Navigate to [https://app.tina.io](https://app.tina.io)
2. Sign up or log in to your account
3. Click "Create Project" or "New Project"
4. Configure project settings:
   - **Project Name**: Ruby's Wine Bar (or your preferred name)
   - **Connect Repository**: Select your GitHub repository
   - **Branch**: `main` (must match `NEXT_PUBLIC_TINA_BRANCH`)
5. Wait for project creation to complete

### Get Tina Credentials
- [ ] Copy **Client ID** from Tina project dashboard
  - Location: Overview > Client ID
  - Save for Vercel environment variables
- [ ] Generate a **Content Token** or **Read-Only Token**
  - Location: Tokens > Create Token
  - Choose "Content Token" for full read/write access
  - Name it descriptively (e.g., "Production Token")
  - Save token immediately (you won't see it again!)
  - Save for Vercel environment variables

### Configure Tina Project
- [ ] Verify repository connection is active
- [ ] Confirm branch is set to `main`
- [ ] Check that Tina can access your repository
- [ ] Review project settings for any errors

## Vercel Deployment

### Initial Setup
1. Navigate to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure project settings:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `.` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (should auto-detect)
   - **Install Command**: `npm install`

### Environment Variables Setup
Add the following environment variables in Vercel project settings (Settings > Environment Variables):

#### Required Variables
- [ ] `NEXT_PUBLIC_TINA_CLIENT_ID`
  - **Value**: Your Tina Client ID from Tina Cloud
  - **Environment**: Production, Preview, Development

- [ ] `TINA_TOKEN`
  - **Value**: Your Tina Content Token from Tina Cloud
  - **Environment**: Production, Preview, Development

- [ ] `NEXT_PUBLIC_TINA_BRANCH`
  - **Value**: `main`
  - **Environment**: Production, Preview, Development

- [ ] `NEXT_PUBLIC_SITE_URL`
  - **Value**: `https://rubyswineshop.com.au` (or your production domain)
  - **Environment**: Production
  - **Value**: `https://your-preview-url.vercel.app` (use actual preview URL)
  - **Environment**: Preview

- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
  - **Value**: Your Google Maps API key
  - **Environment**: Production, Preview, Development

#### Important Notes
- NEVER set `TINA_PUBLIC_IS_LOCAL=true` in production
- Ensure all `NEXT_PUBLIC_*` variables are set for all environments
- Server-only variables (like `TINA_TOKEN`) should NOT start with `NEXT_PUBLIC_`

### Deploy
- [ ] Click "Deploy" button in Vercel
- [ ] Wait for deployment to complete (typically 2-5 minutes)
- [ ] Review build logs for any errors
- [ ] Note your deployment URL

## Post-Deployment Verification

### Basic Functionality
- [ ] Visit your production URL
- [ ] All pages load without errors
- [ ] Images display correctly
- [ ] Navigation works properly
- [ ] Mobile responsiveness looks correct
- [ ] No console errors in browser DevTools

### Tina CMS Admin
- [ ] Navigate to `https://your-domain.com/admin`
- [ ] Admin interface loads successfully
- [ ] Can authenticate with Tina Cloud
- [ ] Site configuration visible in admin
- [ ] Can view all content sections:
  - [ ] Business Information
  - [ ] Hero Section
  - [ ] About Section
  - [ ] Menu Section
  - [ ] Hungry Section
  - [ ] What's On Section
  - [ ] FAQ Section
  - [ ] Walk-In Modal
  - [ ] Find Us Section
  - [ ] SEO Settings

### Content Editing
- [ ] Make a test edit to any content field
- [ ] Click "Save" button
- [ ] Verify git commit created in GitHub repository
  - Check repository commits at `https://github.com/your-username/your-repo/commits`
  - Should see a commit from Tina CMS
- [ ] Verify Vercel deployment triggered automatically
  - Check Vercel dashboard > Deployments
  - Wait for deployment to complete
- [ ] Confirm changes appear on live site
- [ ] Revert test change and verify deployment

### Media Upload
- [ ] Click on an image field in admin
- [ ] Upload a test image
- [ ] Verify image appears in media library
- [ ] Verify image saved to `/public/images/` in repository
- [ ] Check that git commit created for image
- [ ] Delete test image
- [ ] Verify deletion committed to git

### Performance Check
- [ ] Run Lighthouse audit in Chrome DevTools
  - Performance score > 90
  - Accessibility score > 90
  - Best Practices score > 90
  - SEO score > 90
- [ ] Test page load speed on mobile network
- [ ] Verify all images load with proper optimization

## Domain Configuration (If Applicable)

If using a custom domain:
- [ ] Add custom domain in Vercel project settings
- [ ] Configure DNS records as instructed by Vercel
- [ ] Wait for DNS propagation (can take up to 48 hours)
- [ ] Verify SSL certificate issued automatically
- [ ] Test site on custom domain
- [ ] Update `NEXT_PUBLIC_SITE_URL` to custom domain

## Rollback Plan

If deployment fails or critical issues are found:

### Option 1: Rollback via Vercel Dashboard
1. Go to Vercel Dashboard > Deployments
2. Find the last working deployment
3. Click "..." menu > "Promote to Production"
4. Wait for deployment to complete
5. Verify site is working

### Option 2: Rollback via Git
1. Identify the last working commit:
   ```bash
   git log --oneline
   ```
2. Revert to that commit:
   ```bash
   git revert HEAD --no-edit
   # or for multiple commits
   git revert <bad-commit-hash> --no-edit
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   ```
4. Vercel will auto-deploy the reverted version
5. Verify site is working

### Option 3: Disable Tina CMS Temporarily
If Tina is causing issues:
1. Go to Vercel > Environment Variables
2. Set `TINA_PUBLIC_IS_LOCAL=true` (temporary workaround)
3. Redeploy
4. This bypasses Tina Cloud but disables admin editing

## Troubleshooting

### Admin Interface Not Loading

**Symptom**: `/admin` shows 404 or blank page

**Solutions**:
1. Verify Tina build completed:
   - Check Vercel build logs for `tinacms build` output
   - Ensure `admin` folder exists in build output
2. Check environment variables:
   - Verify `NEXT_PUBLIC_TINA_CLIENT_ID` is set
   - Verify `TINA_TOKEN` is set
   - Ensure no extra spaces in values
3. Rebuild and redeploy:
   - Trigger manual deployment in Vercel
   - Clear build cache if needed

### Authentication Errors

**Symptom**: "Invalid Client ID" or "Authentication Failed"

**Solutions**:
1. Verify Client ID matches Tina Cloud exactly
2. Regenerate token in Tina Cloud:
   - Go to Tina Dashboard > Tokens
   - Create new token
   - Update `TINA_TOKEN` in Vercel
   - Redeploy
3. Check branch configuration:
   - Verify `NEXT_PUBLIC_TINA_BRANCH` matches git branch
   - Ensure branch exists in Tina project settings

### Content Not Saving

**Symptom**: Save button works but no git commits created

**Solutions**:
1. Check Tina Cloud repository connection:
   - Go to Tina Dashboard > Settings
   - Verify GitHub connection is active
   - Reconnect repository if needed
2. Verify token permissions:
   - Ensure using "Content Token" not "Read-Only Token"
   - Regenerate token with write permissions
3. Check repository permissions:
   - Ensure Tina app has write access to repository
   - Review GitHub app permissions

### Images Not Uploading

**Symptom**: Image upload fails or images don't appear

**Solutions**:
1. Check media configuration in `.tina/config.ts`:
   ```typescript
   media: {
     tina: {
       mediaRoot: "images",
       publicFolder: "public",
     },
   }
   ```
2. Verify `/public/images/` directory exists
3. Check file size (Tina has upload limits)
4. Try different image format (PNG, JPG, WebP)

### Build Failures

**Symptom**: Vercel deployment fails during build

**Solutions**:
1. Check build logs in Vercel dashboard
2. Common issues:
   - TypeScript errors: Run `npm run type-check` locally
   - Missing dependencies: Run `npm install` locally
   - Tina build fails: Verify `.tina/config.ts` is valid
3. Test build locally:
   ```bash
   npm run build
   ```
4. If build succeeds locally but fails in Vercel:
   - Clear Vercel build cache
   - Check Node.js version compatibility

### Git Commits Not Triggering Deployments

**Symptom**: Content saves but site doesn't update

**Solutions**:
1. Check Vercel Git integration:
   - Go to Vercel > Settings > Git
   - Verify auto-deploy is enabled
   - Ensure correct branch is configured
2. Manually trigger deployment:
   - Go to Vercel > Deployments
   - Click "Redeploy"
3. Check deployment logs for errors

### Environment Variables Not Working

**Symptom**: Variables undefined or showing default values

**Solutions**:
1. Verify variables are set in correct environment:
   - Production, Preview, AND Development (if needed)
2. Redeploy after adding variables:
   - Environment changes require new deployment
3. Check variable names:
   - `NEXT_PUBLIC_*` for client-side variables
   - No `NEXT_PUBLIC_` prefix for server-only variables
4. Restart development server if testing locally

## Support Resources

### Documentation
- [Tina CMS Documentation](https://tina.io/docs/)
- [Tina CMS Troubleshooting Guide](https://tina.io/docs/troubleshooting/)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)

### Community Support
- [Tina CMS Discord](https://discord.com/invite/zumN63Ybpf) - Active community support
- [Tina Community Forum](https://community.tinacms.org/) - Q&A and discussions
- [Vercel Support](https://vercel.com/support) - Official support channel

### Project-Specific Files
- `/TINA_CMS_SETUP.md` - Environment variable setup guide
- `/.env.example` - Template for required environment variables
- `/IMPLEMENTATION_SUMMARY.md` - Tina integration overview
- `/README.md` - Project documentation

## Maintenance

### Regular Tasks
- [ ] Monitor Vercel deployment logs weekly
- [ ] Review Tina Cloud usage dashboard monthly
- [ ] Update dependencies quarterly:
  ```bash
  npm update
  npm audit fix
  ```
- [ ] Test admin interface after dependency updates
- [ ] Backup content periodically (git repository serves as backup)

### Security
- [ ] Rotate Tina tokens every 6 months
- [ ] Review GitHub app permissions quarterly
- [ ] Monitor Vercel security advisories
- [ ] Keep Next.js and Tina CMS updated

## Post-Launch Checklist

After successful deployment:
- [ ] Document deployment date and version
- [ ] Train content editors on Tina CMS
- [ ] Create content editing guidelines
- [ ] Set up monitoring/alerting (optional)
- [ ] Schedule first content review
- [ ] Celebrate successful launch!

---

**Last Updated**: February 2026
**Maintainer**: Ruby's Wine Bar Development Team
**Vercel Project**: Ruby's Wine Bar
**Tina Project**: Ruby's Wine Bar CMS
