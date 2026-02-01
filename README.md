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

### Tina CMS Admin Interface

The site uses **Tina CMS** for visual content editing. To access the admin interface:

1. Start the development server with Tina:

```bash
npm run dev
```

This runs both Next.js and the Tina CMS server.

2. Access the admin at: **[http://localhost:3000/admin](http://localhost:3000/admin)**

The admin interface provides a visual editor for:
- Business information (name, address, hours, contact)
- Menu items (wines by glass, by bottle, snacks)
- Events and what's on
- About section story
- FAQ items
- SEO settings
- Images and media

### Direct Content Editing

Alternatively, you can edit content directly in `src/content/site-config.json`. Changes will be reflected immediately during development.

### Environment Variables for Tina

The `.env.local` file includes Tina CMS configuration:

```env
# Tina CMS - Local Development Mode
TINA_PUBLIC_IS_LOCAL=true
NEXT_PUBLIC_TINA_CLIENT_ID=dummy-client-id
TINA_TOKEN=dummy-token
NEXT_PUBLIC_TINA_BRANCH=main
```

For production with Tina Cloud:
1. Sign up at [tina.io](https://tina.io)
2. Create a new project
3. Replace the dummy values with your actual credentials

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
