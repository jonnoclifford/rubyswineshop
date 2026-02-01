# Tina Client Usage Examples

This document provides examples of how to use the Tina CMS client wrapper in your Next.js 15 App Router components.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Server Components](#server-components)
- [Section-Specific Helpers](#section-specific-helpers)
- [Error Handling](#error-handling)
- [Advanced Usage](#advanced-usage)

## Basic Usage

### Fetching Complete Site Configuration

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

## Server Components

All helper functions are designed to work seamlessly with Next.js 15 Server Components.

### Hero Section

```tsx
import { getHeroContent } from '@/lib/tina-client';

export default async function HeroSection() {
  const hero = await getHeroContent();

  return (
    <section>
      <h1>{hero.headline}</h1>
      <p>{hero.subheadline}</p>
      <button>{hero.ctas.primary.text}</button>
    </section>
  );
}
```

### About Section

```tsx
import { getAboutContent } from '@/lib/tina-client';

export default async function AboutSection() {
  const about = await getAboutContent();

  return (
    <section>
      <h2>{about.heading}</h2>
      {about.story.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <img src={about.image.src} alt={about.image.alt} />
    </section>
  );
}
```

### Menu Section

```tsx
import { getMenuContent } from '@/lib/tina-client';

export default async function MenuSection() {
  const menu = await getMenuContent();

  return (
    <section>
      <h2>{menu.heading}</h2>

      <div>
        <h3>{menu.byTheGlass.heading}</h3>
        {menu.byTheGlass.items.map((wine, index) => (
          <div key={index}>
            <h4>{wine.name}</h4>
            <p>{wine.producer} - {wine.region}</p>
            <p>{wine.price}</p>
            {wine.description && <p>{wine.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
```

## Section-Specific Helpers

### Business Information

```tsx
import { getBusinessInfo } from '@/lib/tina-client';

export default async function ContactInfo() {
  const business = await getBusinessInfo();

  return (
    <div>
      <address>
        {business.address.street}<br />
        {business.address.suburb}, {business.address.state} {business.address.postcode}
      </address>
      <a href={`tel:${business.contact.phone}`}>{business.contact.phone}</a>
      <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>
    </div>
  );
}
```

### Business Hours

```tsx
import { getBusinessInfo } from '@/lib/tina-client';

export default async function Hours() {
  const business = await getBusinessInfo();

  return (
    <dl>
      {Object.entries(business.hours).map(([day, hours]) => (
        <div key={day}>
          <dt>{day}</dt>
          <dd>{hours}</dd>
        </div>
      ))}
    </dl>
  );
}
```

### Events / What's On

```tsx
import { getWhatsOnContent } from '@/lib/tina-client';

export default async function EventsSection() {
  const whatsOn = await getWhatsOnContent();

  return (
    <section>
      <h2>{whatsOn.heading}</h2>
      {whatsOn.events.map((event, index) => (
        <article key={index}>
          <h3>{event.title}</h3>
          <time>{event.date} {event.time && `at ${event.time}`}</time>
          <p>{event.description}</p>
          {event.recurring && <span>Recurring Event</span>}
        </article>
      ))}
    </section>
  );
}
```

### FAQ

```tsx
import { getFAQContent } from '@/lib/tina-client';

export default async function FAQSection() {
  const faq = await getFAQContent();

  return (
    <section>
      <h2>{faq.heading}</h2>
      {faq.items.map((item, index) => (
        <details key={index}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
```

### SEO Metadata

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

## Error Handling

The Tina client includes automatic error handling with fallback to the static configuration file.

### Default Behavior

By default, if Tina CMS is unavailable, the client will:
1. Log an error to the console (in development)
2. Return the fallback configuration from `@/content/site-config.ts`
3. Continue rendering without throwing an error

This ensures your site remains functional even if:
- Tina Cloud is down
- Network issues occur
- Environment variables are misconfigured

### Custom Error Handling

If you need custom error handling, you can catch errors manually:

```tsx
import { getSiteConfig } from '@/lib/tina-client';

export default async function Page() {
  try {
    const config = await getSiteConfig();
    return <div>{config.business.name}</div>;
  } catch (error) {
    // Custom error handling
    console.error('Failed to load content:', error);
    return <div>Unable to load content</div>;
  }
}
```

## Advanced Usage

### Direct Client Access

For advanced use cases not covered by the helper functions, you can use the raw Tina client:

```tsx
import { tinaClient } from '@/lib/tina-client';

export default async function CustomQuery() {
  const result = await tinaClient.queries.siteConfig({
    relativePath: 'site-config.json'
  });

  // Access raw response
  console.log(result.data);
  console.log(result.errors);

  return <div>Custom query result</div>;
}
```

### Type Safety

All helper functions are fully typed using TypeScript interfaces from `@/types/content`:

```tsx
import { getMenuContent } from '@/lib/tina-client';
import type { MenuContent } from '@/types/content';

export default async function TypedMenu() {
  // menuContent is fully typed as MenuContent
  const menuContent: MenuContent = await getMenuContent();

  // TypeScript will provide autocomplete and type checking
  menuContent.byTheGlass.items.forEach(wine => {
    console.log(wine.name); // ✓ Type-safe
    console.log(wine.invalidProp); // ✗ TypeScript error
  });

  return <div>Menu</div>;
}
```

### Parallel Data Fetching

Fetch multiple content sections in parallel for better performance:

```tsx
import {
  getHeroContent,
  getAboutContent,
  getMenuContent
} from '@/lib/tina-client';

export default async function Page() {
  // Fetch all content in parallel
  const [hero, about, menu] = await Promise.all([
    getHeroContent(),
    getAboutContent(),
    getMenuContent(),
  ]);

  return (
    <main>
      <HeroSection data={hero} />
      <AboutSection data={about} />
      <MenuSection data={menu} />
    </main>
  );
}
```

## Production vs Development

The client automatically handles different environments:

- **Development**: Uses local file system via `createLocalDatabase()`
- **Production**: Uses Tina Cloud via `createDatabase()`

Environment variables required:
- `NEXT_PUBLIC_TINA_CLIENT_ID` - Your Tina Cloud client ID
- `TINA_TOKEN` - Your Tina Cloud token (server-side only)
- `TINA_PUBLIC_IS_LOCAL` - Set to `"true"` for local development

## Caching

Next.js 15 automatically caches fetch requests in Server Components. The Tina client respects this caching behavior:

```tsx
// This data will be cached and reused across requests
const config = await getSiteConfig();
```

To opt out of caching for specific sections:

```tsx
export const dynamic = 'force-dynamic'; // Disable caching for this route

export default async function AlwaysFreshPage() {
  const config = await getSiteConfig(); // Always fresh data
  return <div>{config.business.name}</div>;
}
```

## Best Practices

1. **Use section-specific helpers** when you only need part of the configuration
2. **Fetch data at the highest level** possible to minimize API calls
3. **Leverage parallel fetching** with `Promise.all()` when fetching multiple sections
4. **Keep fallback data updated** in `@/content/site-config.ts`
5. **Use TypeScript** to catch content structure issues at compile time
