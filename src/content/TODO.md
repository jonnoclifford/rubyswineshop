# Ruby's Wine Bar - Asset Checklist

## Required for Launch

### Images
- [ ] **Hero Images**
  - [ ] Desktop: `/public/images/hero-desktop.jpg` (1920x1080px, WebP format)
  - [ ] Mobile: `/public/images/hero-mobile.jpg` (750x1334px, WebP format)
  - Alt text: "Ruby's Wine Bar interior with warm lighting and wine bottles"

- [ ] **About Section**
  - [ ] Ruby Portrait: `/public/images/ruby-portrait.jpg` (800x800px, WebP format)
  - Alt text: "Portrait of Ruby, founder of Ruby's Wine Bar"

- [ ] **Branding**
  - [ ] Logo: `/public/logo.svg` (vector SVG preferred)
  - [ ] Favicon: `/public/favicon.ico` (512x512px, multi-size ICO)
  - [ ] OG Image: `/public/images/og-image.jpg` (1200x630px for social sharing)

### Content Verification
- [ ] **Business Information** (in `src/content/site-config.ts`)
  - [ ] Verify street address
  - [ ] Verify phone number
  - [ ] Verify email address
  - [ ] Verify Instagram handle
  - [ ] Confirm business hours
  - [ ] Update coordinates (lat/lng) for accurate map

- [ ] **Menu**
  - [ ] Finalize "By the Glass" wine list
  - [ ] Finalize "By the Bottle" wine list
  - [ ] Confirm current prices
  - [ ] Verify snacks menu
  - [ ] Add any seasonal specials

- [ ] **About Section**
  - [ ] Review Ruby's story
  - [ ] Confirm biographical details
  - [ ] Proofread for tone and accuracy

- [ ] **Olive Thyme Partnership**
  - [ ] Verify partnership details
  - [ ] Confirm partner link URL
  - [ ] Review food pairing description

- [ ] **Events**
  - [ ] Confirm recurring events (Sunday Sessions, tastings)
  - [ ] Add any upcoming special events
  - [ ] Verify event times

- [ ] **FAQ**
  - [ ] Review walk-in policy wording
  - [ ] Confirm parking information
  - [ ] Verify dog-friendly policy
  - [ ] Check private hire email address

### Technical Setup
- [ ] **Domain & Hosting**
  - [ ] Register domain name (e.g., rubyswinebar.com.au)
  - [ ] Configure DNS settings
  - [ ] Deploy to Vercel (or hosting platform)
  - [ ] Enable HTTPS/SSL certificate

- [ ] **Environment Variables**
  - [ ] Update `NEXT_PUBLIC_SITE_URL` in `.env.local`
  - [ ] Add Google Maps API key (optional, for advanced maps)

- [ ] **SEO**
  - [ ] Submit sitemap to Google Search Console
  - [ ] Verify meta descriptions
  - [ ] Test Open Graph tags in social preview tools
  - [ ] Add Google Analytics (optional)

### Testing Checklist
- [ ] **Performance**
  - [ ] Run Lighthouse audit (target: 95+ score)
  - [ ] Optimize all images (WebP format, proper sizing)
  - [ ] Test page load speed

- [ ] **Responsive Design**
  - [ ] Test on iPhone SE (375px)
  - [ ] Test on iPhone 14 Pro (393px)
  - [ ] Test on iPad (768px)
  - [ ] Test on Desktop (1440px+)

- [ ] **Accessibility**
  - [ ] Keyboard navigation test
  - [ ] Screen reader test (VoiceOver/NVDA)
  - [ ] Color contrast check (WCAG AA)
  - [ ] Alt text on all images

- [ ] **Cross-Browser**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Mobile Safari
  - [ ] Mobile Chrome

- [ ] **Functional Testing**
  - [ ] "Visit Us" modal opens and closes
  - [ ] Smooth scroll navigation works
  - [ ] FAQ accordions expand/collapse
  - [ ] All external links open correctly
  - [ ] Mobile menu works
  - [ ] Google Maps embed loads

### Nice to Have (Post-Launch)
- [ ] Newsletter signup form
- [ ] Instagram feed integration
- [ ] Customer testimonials section
- [ ] Blog for wine education
- [ ] Online merchandise store
- [ ] Gift vouchers

## Notes
- All images should be optimized for web (WebP format preferred)
- Content in `site-config.ts` can be updated anytime without touching code
- Remember to update wine list seasonally
- Keep event information current

## Launch Day
- [ ] Final content proofread
- [ ] All placeholder images replaced
- [ ] Production build tested locally (`npm run build`)
- [ ] Deploy to production
- [ ] Test live site thoroughly
- [ ] Announce on social media
