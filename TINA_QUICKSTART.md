# Tina CMS Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
This starts both Next.js and Tina CMS together.

### 3. Access the CMS
Open in your browser:
```
http://localhost:3000/admin/index.html
```

## Common Tasks

### Edit Content
1. Navigate to `/admin/index.html`
2. Click on "Site Configuration"
3. Edit any field
4. Click "Save"
5. Changes are written to `src/content/site-config.json`

### Update Menu Items
1. Go to Admin → Site Configuration
2. Scroll to "Menu Section"
3. Add/edit wines in "By the Glass" or "By the Bottle"
4. Update prices, descriptions, regions
5. Save changes

### Add/Edit Events
1. Go to Admin → Site Configuration
2. Find "What's On Section"
3. Click "Add Events" or edit existing
4. Set recurring flag for regular events
5. Save

### Update Business Hours
1. Go to Admin → Site Configuration
2. Find "Business Information"
3. Update hours for each day
4. Save

## File Locations

### Content Files
- **Editable via CMS**: `src/content/site-config.json`
- **Original TypeScript**: `src/content/site-config.ts` (keep for reference)

### Configuration
- **Tina Schema**: `.tina/config.ts`
- **Generated Types**: `.tina/__generated__/types.ts`
- **Database Client**: `src/lib/tina.ts`

### Environment Variables
```bash
# .env.local
TINA_PUBLIC_IS_LOCAL=true           # Use local filesystem
NEXT_PUBLIC_TINA_CLIENT_ID=         # From tina.io (for production)
TINA_TOKEN=                         # From tina.io (for production)
NEXT_PUBLIC_TINA_BRANCH=main        # Git branch
```

## Development Workflows

### Local Development (Current Setup)
- Content stored in JSON files
- No external API required
- Changes saved directly to filesystem
- Perfect for development and testing

### Production (When Ready)
1. Create account at https://app.tina.io
2. Create new project
3. Copy Client ID and Token
4. Update `.env.local`:
   ```bash
   TINA_PUBLIC_IS_LOCAL=false
   NEXT_PUBLIC_TINA_CLIENT_ID=your_id
   TINA_TOKEN=your_token
   ```
5. Content syncs via Git through Tina Cloud

## npm Scripts

```bash
npm run dev        # Start Next.js with Tina CMS
npm run dev:next   # Start Next.js only (without Tina)
npm run build      # Build Tina + Next.js for production
npm run start      # Start production server
```

## Regenerating Types

After modifying `.tina/config.ts`:
```bash
npx @tinacms/cli build --skip-cloud-checks
```

## Troubleshooting

### Admin UI Won't Load
```bash
# Rebuild Tina admin
npx @tinacms/cli build --skip-cloud-checks

# Then restart dev server
npm run dev
```

### Port Already in Use
```bash
# Kill Tina processes
lsof -ti:9000 | xargs kill -9
lsof -ti:4001 | xargs kill -9

# Restart
npm run dev
```

### Changes Not Saving
1. Check file permissions on `src/content/site-config.json`
2. Verify `TINA_PUBLIC_IS_LOCAL=true` in `.env.local`
3. Check browser console for errors

## Content Schema Overview

The CMS manages all site content in one configuration:

- **Business Info**: Name, address, contact, hours, coordinates
- **Hero**: Headlines, CTAs, images
- **About**: Story paragraphs and image
- **Menu**: Wines by glass/bottle, snacks
- **Hungry**: Partner restaurant info
- **What's On**: Events and programming
- **FAQ**: Questions and answers
- **Walk-In Modal**: Custom messaging
- **Find Us**: Map and contact section
- **SEO**: Meta tags and OG image

## Tips

### Good Practices
- Always save changes before navigating away
- Test content changes on dev server before deploying
- Keep image file sizes optimized (< 500KB)
- Use descriptive alt text for all images
- Maintain consistent formatting in descriptions

### Content Guidelines
- Wine prices: Use format "$XX" or "$XX - $XX"
- Times: Use format "H:MM AM/PM - H:MM AM/PM"
- Descriptions: Keep wine descriptions under 100 characters
- Images: Upload to `/public/images/` before referencing

## Next Steps

Once comfortable with local editing:
1. Set up Tina Cloud for production
2. Enable visual editing on the live site
3. Configure branch-based content workflows
4. Add team members to collaborate on content
5. Set up content preview for draft changes

## Support

- [Tina CMS Docs](https://tina.io/docs/)
- [Community Discord](https://discord.com/invite/zumN63Ybpf)
- [GitHub Issues](https://github.com/tinacms/tinacms/issues)
