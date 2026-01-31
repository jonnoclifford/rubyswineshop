# Quick Start Guide - Ruby's Wine Bar

This guide will get you up and running in under 5 minutes.

## Prerequisites

Make sure you have installed:
- Node.js 20.x or higher ([Download here](https://nodejs.org/))
- A code editor (VS Code recommended)

## Installation

1. **Navigate to the project directory**:
```bash
cd "/Users/jonno/Work/Web Dev/2026/Ruby's Wine Bar/RubySite"
```

2. **Install dependencies** (if not already done):
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Visit [http://localhost:3000](http://localhost:3000)

You should see the Ruby's Wine Bar website running locally!

## Making Changes

### Update Business Information

1. Open `src/content/site-config.ts`
2. Find the section you want to edit:
   - `business` - Hours, address, phone, email
   - `hero` - Homepage headline and buttons
   - `about` - Ruby's story
   - `menu` - Wine list and snacks
   - `whatsOn` - Events and tastings
   - `faq` - Frequently asked questions

3. Make your changes
4. Save the file
5. The website updates automatically in your browser!

### Example: Update Business Hours

```typescript
// In src/content/site-config.ts
business: {
  hours: {
    Monday: "Closed",
    Tuesday: "Closed",
    Wednesday: "4:00 PM - 10:00 PM",  // ← Change this
    Thursday: "4:00 PM - 10:00 PM",
    Friday: "4:00 PM - 11:00 PM",
    Saturday: "2:00 PM - 11:00 PM",
    Sunday: "2:00 PM - 9:00 PM",
  }
}
```

### Example: Add a New Wine

```typescript
// In src/content/site-config.ts → menu → byTheGlass → items
{
  name: "Pinot Grigio",              // Wine name
  producer: "Small Batch Wines",     // Producer
  region: "Adelaide Hills, SA",      // Region
  price: "$14",                      // Price
  description: "Crisp and refreshing" // Tasting notes
}
```

### Example: Add a New Event

```typescript
// In src/content/site-config.ts → whatsOn → events
{
  title: "Wine & Cheese Night",
  date: "First Friday of the month",
  time: "6:00 PM - 9:00 PM",
  description: "Curated wine and cheese pairings",
  recurring: true
}
```

## Replace Placeholder Images

Currently the site uses placeholder images. Replace them with real photos:

1. **Prepare your images**:
   - Hero Desktop: 1920x1080px (WebP format)
   - Hero Mobile: 750x1334px (WebP format)
   - Ruby Portrait: 800x800px (WebP format)
   - OG Image: 1200x630px (for social media)

2. **Place images in `/public/images/`**:
   ```
   public/images/hero-desktop.jpg
   public/images/hero-mobile.jpg
   public/images/ruby-portrait.jpg
   public/images/og-image.jpg
   ```

3. **Add logo and favicon**:
   ```
   public/logo.svg
   public/favicon.ico
   ```

## Test Your Changes

Build the production version to test:

```bash
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to see the production build.

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Check for code issues
npm run lint

# Check TypeScript types
npm run type-check
```

## Ready to Deploy?

Once you're happy with your changes:

1. Review `DEPLOYMENT.md` for detailed deployment instructions
2. Push to GitHub
3. Deploy to Vercel (free hosting)
4. Configure your custom domain

## Need Help?

- **Content updates**: Edit `src/content/site-config.ts`
- **Images**: Replace files in `/public/images/`
- **Deployment**: See `DEPLOYMENT.md`
- **Full documentation**: See `README.md`
- **Implementation details**: See `IMPLEMENTATION-SUMMARY.md`

## What's Next?

1. ✅ Update content in `site-config.ts`
2. ✅ Add real images
3. ✅ Test locally
4. ✅ Deploy to Vercel
5. ✅ Configure custom domain
6. ✅ Launch! 🎉

---

**Questions?** Check the other documentation files:
- `README.md` - Full project overview
- `DEPLOYMENT.md` - Deployment guide
- `IMPLEMENTATION-SUMMARY.md` - Technical details
- `src/content/TODO.md` - Launch checklist
