# Ruby's Wine Bar - Website

A production-ready, high-end website for Ruby's Wine Bar in Albion, Brisbane. Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui.

## Features

- 🎨 **Custom Design System**: Terracotta/cream/navy palette with sophisticated motion design
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- ⚡ **Performance Optimized**: Lighthouse score 95+ target
- ♿ **Accessible**: WCAG AA compliant
- 🔍 **SEO Ready**: JSON-LD structured data, Open Graph tags
- 🎭 **Smooth Animations**: Framer Motion scroll reveals and transitions
- 📝 **Easy Content Management**: Centralized site-config.ts for all content

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Components**: shadcn/ui
- **Fonts**: Libre Caslon Display (serif), DM Sans (sans-serif)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://rubyswinebar.com.au
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Content Management

All website content is centralized in `src/content/site-config.ts`. You can update:

- Business information (name, address, hours, contact)
- Menu items (wines by glass, by bottle, snacks)
- Events and what's on
- About section story
- FAQ items
- And more!

No code changes required - just update the content file and redeploy.

## Asset Checklist

See `src/content/TODO.md` for a comprehensive list of required assets before launch:

- Hero images (desktop & mobile)
- Ruby portrait image
- Logo and favicon
- Open Graph image
- Final content verification

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── layout.tsx        # Root layout with fonts and SEO
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles
│   ├── not-found.tsx     # 404 page
│   └── error.tsx         # Error boundary
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Page sections (Hero, About, Menu, etc.)
│   ├── shared/           # Reusable components (WineCard, EventCard, etc.)
│   └── ui/               # shadcn/ui components
├── content/
│   ├── site-config.ts    # All website content (EDIT THIS!)
│   └── TODO.md           # Launch checklist
├── lib/
│   ├── animations.ts     # Framer Motion variants
│   ├── seo.ts            # JSON-LD schema generator
│   └── utils.ts          # Utility functions
└── types/
    └── content.ts        # TypeScript interfaces
```

## Performance

Target metrics:
- Lighthouse Performance: 95+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 95+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private - All rights reserved to Ruby's Wine Bar

## Support

For technical issues or questions, contact the development team.
