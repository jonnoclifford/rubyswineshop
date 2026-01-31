# Deployment Guide - Ruby's Wine Bar

## Pre-Deployment Checklist

### 1. Content Review
- [ ] Review and update all content in `src/content/site-config.ts`
- [ ] Verify business hours are correct
- [ ] Confirm phone number and email address
- [ ] Verify Instagram handle
- [ ] Update wine menu with current offerings
- [ ] Check events are up to date

### 2. Assets
- [ ] Replace placeholder images in `/public/images/`:
  - `hero-desktop.jpg` (1920x1080px, WebP)
  - `hero-mobile.jpg` (750x1334px, WebP)
  - `ruby-portrait.jpg` (800x800px, WebP)
  - `og-image.jpg` (1200x630px for social sharing)
- [ ] Add custom logo to `/public/logo.svg`
- [ ] Add custom favicon to `/public/favicon.ico`

### 3. Environment Variables
Update `.env.local` with production values:
```env
NEXT_PUBLIC_SITE_URL=https://rubyswinebar.com.au
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key
```

### 4. Testing
Run these commands locally:

```bash
# Install dependencies
npm install

# Run linter
npm run lint

# Build for production
npm run build

# Test production build locally
npm run start
```

Visit http://localhost:3000 and test:
- [ ] All navigation links work
- [ ] "Visit Us" modal opens and closes
- [ ] Smooth scroll navigation
- [ ] Mobile menu works
- [ ] All sections display correctly
- [ ] FAQ accordions expand/collapse
- [ ] All external links work
- [ ] Forms submit (if any)

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit - Ruby's Wine Bar website"
git branch -M main
git remote add origin https://github.com/yourusername/rubys-wine-bar.git
git push -u origin main
```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Configure Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SITE_URL`: `https://rubyswinebar.com.au`
     - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Visit the provided URL to verify

### Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add your custom domain: `rubyswinebar.com.au`
   - Follow DNS configuration instructions

2. **DNS Configuration** (at your domain registrar):

   **For Apex Domain** (rubyswinebar.com.au):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For WWW Subdomain**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates
   - Wait for DNS propagation (up to 48 hours)
   - Verify HTTPS is working

## Post-Deployment

### 1. SEO Setup

**Google Search Console**:
1. Go to https://search.google.com/search-console
2. Add property: `https://rubyswinebar.com.au`
3. Verify ownership (Vercel makes this easy)
4. Submit sitemap: `https://rubyswinebar.com.au/sitemap.xml`

**Test Structured Data**:
1. Visit https://search.google.com/test/rich-results
2. Enter your site URL
3. Verify LocalBusiness schema is detected

### 2. Performance Testing

**Lighthouse Audit**:
```bash
# Install Lighthouse CLI
npm install -g @lhci/cli

# Run audit
lhci autorun --upload.target=temporary-public-storage
```

Or use Chrome DevTools:
1. Open site in Chrome
2. Open DevTools (F12)
3. Go to Lighthouse tab
4. Run audit
5. Target: 95+ on all metrics

### 3. Browser Testing

Test on:
- [ ] Chrome (desktop & mobile)
- [ ] Firefox
- [ ] Safari (desktop & iOS)
- [ ] Edge

### 4. Analytics (Optional)

**Google Analytics 4**:
1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `src/app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### 5. Social Media

Share on:
- [ ] Instagram (@rubyswinebar)
- [ ] Facebook (if applicable)
- [ ] Local business directories

Test Open Graph preview:
- https://www.opengraph.xyz/
- Paste your site URL
- Verify image and description

## Continuous Deployment

Once connected to GitHub, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

### Updating Content

To update wine menu, hours, or other content:

1. Edit `src/content/site-config.ts`
2. Commit and push to GitHub:
```bash
git add src/content/site-config.ts
git commit -m "Update wine menu"
git push
```
3. Vercel auto-deploys in ~2 minutes

## Rollback

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click ⋯ → Promote to Production

## Monitoring

**Check site health**:
- Vercel Analytics: Built-in, no setup needed
- Vercel Speed Insights: Shows Core Web Vitals
- Uptime monitoring: Use Vercel's built-in or UptimeRobot

## Support

**Common Issues**:

1. **Build fails**: Check build logs in Vercel dashboard
2. **Images not loading**: Verify image paths and sizes
3. **Styles not applying**: Clear cache, check CSS imports
4. **Slow performance**: Run Lighthouse, optimize images

**Get Help**:
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Create issue in repository

## Maintenance

**Monthly Tasks**:
- [ ] Update wine menu
- [ ] Add/update events
- [ ] Check and renew SSL cert (Vercel auto-renews)
- [ ] Review analytics
- [ ] Test all functionality

**Quarterly Tasks**:
- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Performance audit with Lighthouse
- [ ] Backup content and database (if added)

## Emergency Contacts

- Hosting: Vercel Support
- Domain Registrar: [Your registrar]
- Developer: [Your contact]
