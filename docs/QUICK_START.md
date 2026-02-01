# Tina CMS Quick Start Guide

## Getting Started in 3 Steps

### 1. Start the Development Server

```bash
npm run dev
```

This starts both Next.js and Tina CMS.

### 2. Access the Admin Interface

Open your browser to:

**http://localhost:3000/admin**

### 3. Edit Content

- Click "Site Configuration" in the sidebar
- Edit any field
- Click "Save" to persist changes
- Changes appear immediately on the site

## Common Tasks

### Update Business Hours

1. Go to http://localhost:3000/admin
2. Click "Site Configuration"
3. Expand "Business Information"
4. Expand "Business Hours"
5. Update hours for each day
6. Click "Save"

### Add a New Wine

1. Go to admin
2. Navigate to "Menu Section" → "By the Glass" or "By the Bottle"
3. Click "+ Add item" or "+ Add category"
4. Fill in wine details
5. Click "Save"

### Update an Event

1. Go to admin
2. Navigate to "What's On Section"
3. Find the event in the list
4. Edit details
5. Click "Save"

### Change Images

1. Go to admin
2. Find the image field (e.g., Hero Section → Hero Images)
3. Click "Change"
4. Upload new image or select from media library
5. Click "Save"

## Quick Commands

```bash
# Start development server with Tina
npm run dev

# Start Next.js only (no admin)
npm run dev:next

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check
```

## URLs

- **Website**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- **Tina Server**: http://localhost:4001 (internal)
- **Datalayer**: http://localhost:9000 (internal)

## File Locations

- **Content**: `/src/content/site-config.json`
- **Config**: `/.tina/config.ts`
- **Images**: `/public/images/`

## Need Help?

See `/docs/TINA_CMS_SETUP.md` for detailed documentation.
