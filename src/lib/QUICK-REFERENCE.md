# Tina Client Quick Reference

## Import

```typescript
import { getSiteConfig, getHeroContent, /* ... */ } from '@/lib/tina-client';
```

## All Helper Functions

```typescript
// Complete config
getSiteConfig() → SiteConfig

// Sections
getBusinessInfo() → BusinessInfo
getHeroContent() → HeroContent
getAboutContent() → AboutContent
getMenuContent() → MenuContent
getHungryContent() → HungryContent
getWhatsOnContent() → WhatsOnContent
getFAQContent() → FAQContent
getWalkInModalContent() → WalkInModalContent
getFindUsContent() → FindUsContent
getSEOMetadata() → SEOContent

// Advanced
getTinaRawClient() → TinaClient
```

## Basic Usage

```typescript
// Server Component (async)
export default async function Component() {
  const config = await getSiteConfig();
  return <div>{config.business.name}</div>;
}
```

## Common Patterns

### Single Section
```typescript
const hero = await getHeroContent();
```

### Multiple Sections (Parallel)
```typescript
const [hero, about, menu] = await Promise.all([
  getHeroContent(),
  getAboutContent(),
  getMenuContent(),
]);
```

### With TypeScript
```typescript
import type { SiteConfig } from '@/lib/tina-client';

const config: SiteConfig = await getSiteConfig();
```

### SEO Metadata
```typescript
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata();
  return { title: seo.title, description: seo.description };
}
```

### Pass to Client Component
```typescript
// Server Component
const business = await getBusinessInfo();
return <ClientComponent business={business} />;

// Client Component
'use client';
export function ClientComponent({ business }: { business: BusinessInfo }) {
  return <div>{business.name}</div>;
}
```

## Environment Variables

```env
# Development
TINA_PUBLIC_IS_LOCAL=true

# Production
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_tina_token
```

## Commands

```bash
# Start dev server with Tina
npm run dev

# Build Tina types
npx tinacms build

# Type check
npm run type-check
```

## Error Handling

Automatic fallback to `/src/content/site-config.ts` if Tina is unavailable.

No try/catch needed in normal use:
```typescript
// This never throws in production
const config = await getSiteConfig();
```

## Data Structure

```typescript
SiteConfig {
  business: BusinessInfo
  hero: HeroContent
  about: AboutContent
  menu: MenuContent
  hungry: HungryContent
  whatsOn: WhatsOnContent
  faq: FAQContent
  walkInModal: WalkInModalContent
  findUs: FindUsContent
  seo: SEOContent
}
```

## Full Documentation

- **README**: `/src/lib/README-tina-client.md`
- **Examples**: `/src/lib/tina-client.examples.md`
- **Migration**: `/src/lib/MIGRATION-tina-client.md`
