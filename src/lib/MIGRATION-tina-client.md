# Migration Guide: Using Tina Client in Components

This guide shows how to migrate existing components from using static imports to the Tina CMS client.

## Overview

Currently, components import the static `siteConfig` directly:

```tsx
import { siteConfig } from '@/content/site-config';
```

After migration, they'll fetch data from TinaCMS (with automatic fallback):

```tsx
import { getSiteConfig } from '@/lib/tina-client';

const config = await getSiteConfig();
```

## Migration Steps

### 1. Convert to Async Server Component

Components that use the Tina client must be async server components.

**Before:**
```tsx
export default function Hero() {
  return <div>{siteConfig.hero.headline}</div>;
}
```

**After:**
```tsx
export default async function Hero() {
  const config = await getSiteConfig();
  return <div>{config.hero.headline}</div>;
}
```

### 2. Replace Static Import

**Before:**
```tsx
import { siteConfig } from '@/content/site-config';

export default function Component() {
  return <div>{siteConfig.business.name}</div>;
}
```

**After:**
```tsx
import { getSiteConfig } from '@/lib/tina-client';

export default async function Component() {
  const config = await getSiteConfig();
  return <div>{config.business.name}</div>;
}
```

### 3. Use Section-Specific Helpers

For better performance, use section-specific helpers instead of fetching the entire config.

**Before:**
```tsx
import { siteConfig } from '@/content/site-config';

export default function Hero() {
  return (
    <div>
      <h1>{siteConfig.hero.headline}</h1>
      <p>{siteConfig.hero.subheadline}</p>
    </div>
  );
}
```

**After:**
```tsx
import { getHeroContent } from '@/lib/tina-client';

export default async function Hero() {
  const hero = await getHeroContent();
  return (
    <div>
      <h1>{hero.headline}</h1>
      <p>{hero.subheadline}</p>
    </div>
  );
}
```

## Component-by-Component Migration

### Header Component

**File:** `/src/components/layout/Header.tsx`

**Before:**
```tsx
import { siteConfig } from '@/content/site-config';

export function Header() {
  return (
    <header>
      <h1>{siteConfig.business.name}</h1>
      {/* ... */}
    </header>
  );
}
```

**After:**
```tsx
import { getBusinessInfo } from '@/lib/tina-client';

export async function Header() {
  const business = await getBusinessInfo();
  return (
    <header>
      <h1>{business.name}</h1>
      {/* ... */}
    </header>
  );
}
```

### Hero Section

**File:** `/src/components/sections/Hero.tsx`

**Before:**
```tsx
import { siteConfig } from '@/content/site-config';

export function Hero() {
  const { hero } = siteConfig;
  // ...
}
```

**After:**
```tsx
import { getHeroContent } from '@/lib/tina-client';

export async function Hero() {
  const hero = await getHeroContent();
  // ...
}
```

### About Section

**File:** `/src/components/sections/About.tsx`

**Before:**
```tsx
import { siteConfig } from '@/content/site-config';

export function About() {
  const { about } = siteConfig;
  // ...
}
```

**After:**
```tsx
import { getAboutContent } from '@/lib/tina-client';

export async function About() {
  const about = await getAboutContent();
  // ...
}
```

### Menu Section

**File:** `/src/components/sections/Menu.tsx`

**Before:**
```tsx
import { siteConfig } from '@/content/site-config';

export function Menu() {
  const { menu } = siteConfig;
  // ...
}
```

**After:**
```tsx
import { getMenuContent } from '@/lib/tina-client';

export async function Menu() {
  const menu = await getMenuContent();
  // ...
}
```

### Footer Component

**File:** `/src/components/layout/Footer.tsx`

**Before:**
```tsx
import { siteConfig } from '@/content/site-config';

export function Footer() {
  return (
    <footer>
      <p>{siteConfig.business.contact.email}</p>
      {/* ... */}
    </footer>
  );
}
```

**After:**
```tsx
import { getBusinessInfo } from '@/lib/tina-client';

export async function Footer() {
  const business = await getBusinessInfo();
  return (
    <footer>
      <p>{business.contact.email}</p>
      {/* ... */}
    </footer>
  );
}
```

## Page-Level Migration

### Home Page

**File:** `/src/app/page.tsx`

**Option 1: Fetch at Page Level (Recommended)**

```tsx
import { getSiteConfig } from '@/lib/tina-client';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
// ... other imports

export default async function Home() {
  // Fetch once at page level
  const config = await getSiteConfig();

  return (
    <>
      <Header business={config.business} />
      <main>
        <Hero hero={config.hero} />
        <About about={config.about} />
        {/* ... */}
      </main>
    </>
  );
}
```

**Option 2: Individual Component Fetching**

```tsx
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
// ... other imports

export default async function Home() {
  // Each component fetches its own data
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        {/* ... */}
      </main>
    </>
  );
}
```

**Option 3: Parallel Fetching (Best Performance)**

```tsx
import {
  getBusinessInfo,
  getHeroContent,
  getAboutContent,
  getMenuContent,
  getWhatsOnContent,
  getFAQContent,
  getFindUsContent,
} from '@/lib/tina-client';

export default async function Home() {
  // Fetch all sections in parallel
  const [business, hero, about, menu, whatsOn, faq, findUs] = await Promise.all([
    getBusinessInfo(),
    getHeroContent(),
    getAboutContent(),
    getMenuContent(),
    getWhatsOnContent(),
    getFAQContent(),
    getFindUsContent(),
  ]);

  return (
    <>
      <Header business={business} />
      <main>
        <Hero hero={hero} />
        <About about={about} />
        <Menu menu={menu} />
        <WhatsOn whatsOn={whatsOn} />
        <FAQ faq={faq} />
        <FindUs findUs={findUs} business={business} />
      </main>
    </>
  );
}
```

## Metadata Migration

### SEO Metadata

**Before:**
```tsx
import { siteConfig } from '@/content/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  // ...
};
```

**After:**
```tsx
import { getSEOMetadata } from '@/lib/tina-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata();

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
    },
  };
}
```

## Client Components

If you need to use Tina data in a client component (with `"use client"`), fetch the data in a server component and pass it as props.

**Before:**
```tsx
'use client';

import { siteConfig } from '@/content/site-config';

export function ClientComponent() {
  return <div>{siteConfig.business.name}</div>;
}
```

**After:**

Parent server component:
```tsx
import { getBusinessInfo } from '@/lib/tina-client';
import { ClientComponent } from './ClientComponent';

export async function ServerWrapper() {
  const business = await getBusinessInfo();
  return <ClientComponent business={business} />;
}
```

Client component:
```tsx
'use client';

import type { BusinessInfo } from '@/types/content';

export function ClientComponent({ business }: { business: BusinessInfo }) {
  return <div>{business.name}</div>;
}
```

## Common Patterns

### Conditional Rendering

**Before:**
```tsx
{siteConfig.whatsOn.events.length > 0 && (
  <EventsList events={siteConfig.whatsOn.events} />
)}
```

**After:**
```tsx
import { getWhatsOnContent } from '@/lib/tina-client';

export async function WhatsOn() {
  const whatsOn = await getWhatsOnContent();

  return (
    <>
      {whatsOn.events.length > 0 && (
        <EventsList events={whatsOn.events} />
      )}
    </>
  );
}
```

### Mapping Over Data

**Before:**
```tsx
{siteConfig.menu.byTheGlass.items.map((wine, index) => (
  <WineCard key={index} wine={wine} />
))}
```

**After:**
```tsx
import { getMenuContent } from '@/lib/tina-client';

export async function WineList() {
  const menu = await getMenuContent();

  return (
    <>
      {menu.byTheGlass.items.map((wine, index) => (
        <WineCard key={index} wine={wine} />
      ))}
    </>
  );
}
```

## Testing During Migration

### Test with Fallback

The client automatically uses fallback data if Tina is unavailable, so you can test migrations without running the Tina dev server:

1. Migrate component to use Tina client
2. Test without Tina server running (uses fallback)
3. Start Tina server and verify it fetches from CMS

### Verify Data Source

Add temporary logging to verify which data source is being used:

```tsx
export async function Component() {
  const config = await getSiteConfig();
  console.log('Data source:', config); // Check in dev tools
  return <div>...</div>;
}
```

## Rollback Plan

If you need to rollback a component:

1. Remove the `async` keyword
2. Change import from `@/lib/tina-client` back to `@/content/site-config`
3. Remove `await` calls
4. Revert variable names if needed

## Performance Considerations

### Caching

Next.js 15 automatically caches server component data. The same Tina query will only run once per build/request.

### Parallel Fetching

Fetch multiple sections in parallel for best performance:

```tsx
const [hero, about, menu] = await Promise.all([
  getHeroContent(),
  getAboutContent(),
  getMenuContent(),
]);
```

### Minimize Fetches

Fetch at the page level and pass props down to avoid redundant fetches:

```tsx
// ✓ Good: Fetch once
const config = await getSiteConfig();
<Header business={config.business} />
<Footer business={config.business} />

// ✗ Avoid: Fetching twice
<Header /> // fetches internally
<Footer /> // fetches again
```

## Next Steps

1. Start with one section (e.g., Hero)
2. Test thoroughly
3. Migrate remaining sections
4. Update metadata generation
5. Remove old static imports once all migrations are complete
