# Tina CMS Client Wrapper

A simplified, type-safe wrapper for fetching content from TinaCMS in Next.js 15 App Router server components.

## Overview

The Tina client wrapper provides an easy-to-use interface for accessing CMS content with:
- Full TypeScript type safety
- Automatic error handling with fallback to static content
- Server component optimization
- Helper functions for common queries

## Files

- `/src/lib/tina-client.ts` - Main client wrapper with helper functions
- `/src/lib/tina-client.examples.md` - Comprehensive usage examples
- `/src/types/content.ts` - TypeScript type definitions
- `/src/content/site-config.ts` - Fallback static configuration

## Quick Start

### Basic Usage

```tsx
import { getSiteConfig } from '@/lib/tina-client';

export default async function Page() {
  const config = await getSiteConfig();

  return (
    <div>
      <h1>{config.business.name}</h1>
      <p>{config.business.tagline}</p>
    </div>
  );
}
```

### Section-Specific Helpers

Instead of fetching the entire config, you can fetch specific sections:

```tsx
import { getHeroContent } from '@/lib/tina-client';

export default async function Hero() {
  const hero = await getHeroContent();

  return (
    <section>
      <h1>{hero.headline}</h1>
      <p>{hero.subheadline}</p>
    </section>
  );
}
```

## Available Helper Functions

### Content Fetchers

- `getSiteConfig()` - Complete site configuration
- `getBusinessInfo()` - Business details (name, address, contact, hours)
- `getHeroContent()` - Hero section content
- `getAboutContent()` - About section content
- `getMenuContent()` - Menu items (wines, snacks)
- `getHungryContent()` - Partner/food information
- `getWhatsOnContent()` - Events and what's on
- `getFAQContent()` - FAQ items
- `getWalkInModalContent()` - Walk-in modal content
- `getFindUsContent()` - Contact and location information
- `getSEOMetadata()` - SEO metadata for pages

### Advanced Access

- `getTinaRawClient()` - Access the raw Tina client for custom queries

## Type Safety

All functions return properly typed data using TypeScript interfaces from `/src/types/content.ts`:

```tsx
import type { SiteConfig, BusinessInfo, MenuContent } from '@/lib/tina-client';

const config: SiteConfig = await getSiteConfig();
const business: BusinessInfo = await getBusinessInfo();
const menu: MenuContent = await getMenuContent();
```

## Error Handling

The client includes automatic error handling:

1. **Fallback Mode (Default)**: If TinaCMS is unavailable, the client automatically returns static fallback data from `/src/content/site-config.ts`

2. **Development Logging**: In development mode, errors are logged to the console for debugging

3. **Production Resilience**: In production, failures gracefully fallback without breaking the site

### Configuration

You can modify error handling behavior in the `TINA_CONFIG` object:

```typescript
const TINA_CONFIG = {
  siteConfigPath: 'site-config.json',
  useFallback: true,  // Enable/disable fallback
  logErrors: process.env.NODE_ENV === 'development',  // Log errors
};
```

## Environment Setup

### Required Environment Variables

```env
# For local development
TINA_PUBLIC_IS_LOCAL=true

# For production (Tina Cloud)
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_tina_token
NEXT_PUBLIC_TINA_BRANCH=main
```

### Local Development

When `TINA_PUBLIC_IS_LOCAL=true`, the client connects to the local Tina dev server at `http://localhost:4001/graphql`.

Run the dev server with:
```bash
npm run dev
```

### Production Deployment

In production, set:
- `NEXT_PUBLIC_TINA_CLIENT_ID` - From Tina Cloud dashboard
- `TINA_TOKEN` - From Tina Cloud dashboard (server-side only)

The client will automatically connect to Tina Cloud.

## How It Works

### Architecture

1. **Dynamic Import**: The client uses dynamic imports to avoid build-time issues with generated Tina files
2. **Lazy Loading**: The Tina client is only loaded when needed
3. **Fallback System**: If Tina is unavailable, static content is served
4. **Type Stripping**: Tina metadata (`_sys`, `_values`, `__typename`) is removed from responses

### Data Flow

```
Component Request
    ↓
Helper Function (e.g., getSiteConfig)
    ↓
getTinaClient() - Dynamically load client
    ↓
client.queries.siteConfig() - GraphQL query
    ↓
Clean response (remove metadata)
    ↓
Return typed data
    ↓
Component renders

If error occurs at any step → Return fallback data
```

## Updating Content

### Via Tina CMS Admin

1. Start the dev server: `npm run dev`
2. Navigate to `/admin`
3. Log in and edit content
4. Changes are saved to `/src/content/site-config.json` (in local mode)

### Via Code

Update the fallback configuration in `/src/content/site-config.ts` directly.

## Best Practices

1. **Use Section Helpers**: Prefer `getHeroContent()` over `getSiteConfig()` when you only need part of the config
2. **Fetch at Page Level**: Fetch data at the page/layout level and pass it down to components
3. **Parallel Fetching**: Use `Promise.all()` to fetch multiple sections in parallel
4. **Keep Fallback Updated**: Ensure `/src/content/site-config.ts` matches your CMS structure
5. **Type Safety**: Always use TypeScript for compile-time safety

## Troubleshooting

### "Tina client not available"

- Check that Tina files are generated: `npx tinacms build`
- Verify environment variables are set correctly
- Ensure dev server is running in local mode

### Type Errors

- Run `npm run type-check` to verify types
- Regenerate Tina types: `npx tinacms build`
- Ensure `/src/types/content.ts` matches CMS schema

### Fallback Always Used

- Check console logs (development mode) for error details
- Verify Tina dev server is running: `http://localhost:4001/graphql`
- Check environment variables

## Further Reading

- [Detailed Examples](/src/lib/tina-client.examples.md)
- [TinaCMS Documentation](https://tina.io/docs)
- [Next.js 15 App Router](https://nextjs.org/docs/app)

## Support

For issues or questions:
1. Check the examples file: `/src/lib/tina-client.examples.md`
2. Review TinaCMS docs: https://tina.io/docs
3. Check console logs in development mode
