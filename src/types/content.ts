/* eslint-disable @typescript-eslint/no-explicit-any */
// Content type definitions for Ruby's Wine Bar
// These match the structure in site-config.ts

// Base content types
export interface HeaderContent {
  logo: string;
  navigation: {
    name: string;
    href: string;
  }[];
  ctaText: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  address: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    instagram: string;
  };
  hours: {
    [key: string]: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctas: {
    primary: {
      text: string;
      action: 'modal' | 'scroll';
      target?: string;
    };
    secondary: {
      text: string;
      action: 'modal' | 'scroll';
      target?: string;
    };
  };
  images: {
    desktop: string;
    mobile: string;
    alt: string;
  };
}

export interface AboutContent {
  heading: string;
  story: string[];
  image: {
    src: string;
    alt: string;
  };
}

export interface WineItem {
  name: string;
  region?: string;
  producer?: string;
  price: string;
  description?: string;
  glassPrice?: string;
  bottlePrice?: string;
}

export interface MenuContent {
  heading: string;
  byTheGlass: {
    heading: string;
    items: WineItem[];
  };
  byTheBottle: {
    heading: string;
    categories: {
      name: string;
      items: WineItem[];
    }[];
  };
  snacks: {
    heading: string;
    items: {
      name: string;
      description?: string;
      price: string;
    }[];
  };
}

export interface HungryContent {
  heading: string;
  description: string[];
  partnerName: string;
  partnerLink?: string;
  image?: {
    src: string;
    alt: string;
  };
}

export interface Event {
  title: string;
  date: string;
  time?: string;
  description: string;
  recurring?: boolean;
}

export interface WhatsOnContent {
  heading: string;
  events: Event[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  heading: string;
  items: FAQItem[];
  image?: {
    src: string;
    alt: string;
  };
}

export interface WalkInModalContent {
  heading: string;
  message: string[];
  hoursHeading: string;
  ctaText: string;
}

export interface FindUsContent {
  heading: string;
  mapEmbedUrl: string;
  contactHeading: string;
  image?: {
    src: string;
    alt: string;
  };
}

export interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface SiteConfig {
  header: HeaderContent;
  business: BusinessInfo;
  hero: HeroContent;
  about: AboutContent;
  menu: MenuContent;
  hungry: HungryContent;
  whatsOn: WhatsOnContent;
  faq: FAQContent;
  walkInModal: WalkInModalContent;
  findUs: FindUsContent;
  seo: SEOContent;
}

// Tina CMS utility types
// These help transform Tina's GraphQL responses to our application types

/**
 * Utility type to unwrap Tina's Maybe wrapper
 */
export type Unwrap<T> = T extends Maybe<infer U> ? U : T;

/**
 * Utility type to unwrap arrays of Maybe types
 */
export type UnwrapArray<T> = T extends Maybe<Array<Maybe<infer U>>>
  ? U[]
  : T extends Array<Maybe<infer U>>
  ? U[]
  : T extends Maybe<infer U>
  ? U
  : T;

/**
 * Type guard to check if a value is not null or undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Filter out null/undefined from arrays and narrow the type
 */
export function filterDefined<T>(array: (T | null | undefined)[]): T[] {
  return array.filter(isDefined);
}

/**
 * Transform Tina CMS response to application SiteConfig type
 * This function handles all the Maybe<> types from Tina's GraphQL schema
 */
export function transformTinaConfig(tinaConfig: TinaSiteConfig): SiteConfig {
  // Handle header
  const header: HeaderContent = {
    logo: tinaConfig.header?.logo || '',
    navigation: filterDefined(tinaConfig.header?.navigation || []).map((nav: any) => ({
      name: nav.name as string,
      href: nav.href as string,
    })),
    ctaText: tinaConfig.header?.ctaText || '',
  };

  // Handle business info
  const business: BusinessInfo = {
    name: tinaConfig.business?.name || '',
    tagline: tinaConfig.business?.tagline || '',
    address: {
      street: tinaConfig.business?.address?.street || '',
      suburb: tinaConfig.business?.address?.suburb || '',
      state: tinaConfig.business?.address?.state || '',
      postcode: tinaConfig.business?.address?.postcode || '',
      country: tinaConfig.business?.address?.country || '',
    },
    contact: {
      phone: tinaConfig.business?.contact?.phone || '',
      email: tinaConfig.business?.contact?.email || '',
      instagram: tinaConfig.business?.contact?.instagram || '',
    },
    hours: {
      Monday: tinaConfig.business?.hours?.Monday || '',
      Tuesday: tinaConfig.business?.hours?.Tuesday || '',
      Wednesday: tinaConfig.business?.hours?.Wednesday || '',
      Thursday: tinaConfig.business?.hours?.Thursday || '',
      Friday: tinaConfig.business?.hours?.Friday || '',
      Saturday: tinaConfig.business?.hours?.Saturday || '',
      Sunday: tinaConfig.business?.hours?.Sunday || '',
    },
    coordinates: {
      lat: tinaConfig.business?.coordinates?.lat || 0,
      lng: tinaConfig.business?.coordinates?.lng || 0,
    },
  };

  // Handle hero section
  const hero: HeroContent = {
    headline: tinaConfig.hero?.headline || '',
    subheadline: tinaConfig.hero?.subheadline || '',
    ctas: {
      primary: {
        text: tinaConfig.hero?.ctas?.primary?.text || '',
        action: (tinaConfig.hero?.ctas?.primary?.action as 'modal' | 'scroll') || 'modal',
        target: tinaConfig.hero?.ctas?.primary?.target || undefined,
      },
      secondary: {
        text: tinaConfig.hero?.ctas?.secondary?.text || '',
        action: (tinaConfig.hero?.ctas?.secondary?.action as 'modal' | 'scroll') || 'scroll',
        target: tinaConfig.hero?.ctas?.secondary?.target || undefined,
      },
    },
    images: {
      desktop: tinaConfig.hero?.images?.desktop || '',
      mobile: tinaConfig.hero?.images?.mobile || '',
      alt: tinaConfig.hero?.images?.alt || '',
    },
  };

  // Handle about section
  const about: AboutContent = {
    heading: tinaConfig.about?.heading || '',
    story: tinaConfig.about?.story || [],
    image: {
      src: tinaConfig.about?.image?.src || '',
      alt: tinaConfig.about?.image?.alt || '',
    },
  };

  // Handle menu section
  const menu: MenuContent = {
    heading: tinaConfig.menu?.heading || '',
    byTheGlass: {
      heading: tinaConfig.menu?.byTheGlass?.heading || '',
      items: filterDefined(tinaConfig.menu?.byTheGlass?.items || []).map((item: any) => ({
        name: item.name as string,
        producer: (item.producer as string | undefined) || undefined,
        region: (item.region as string | undefined) || undefined,
        price: item.price as string,
        description: (item.description as string | undefined) || undefined,
      })),
    },
    byTheBottle: {
      heading: tinaConfig.menu?.byTheBottle?.heading || '',
      categories: filterDefined(tinaConfig.menu?.byTheBottle?.categories || []).map((cat: any) => ({
        name: cat.name as string,
        items: filterDefined(cat.items || []).map((item: any) => ({
          name: item.name as string,
          producer: (item.producer as string | undefined) || undefined,
          region: (item.region as string | undefined) || undefined,
          price: item.price as string,
          description: (item.description as string | undefined) || undefined,
        })),
      })),
    },
    snacks: {
      heading: tinaConfig.menu?.snacks?.heading || '',
      items: filterDefined(tinaConfig.menu?.snacks?.items || []).map((item: any) => ({
        name: item.name as string,
        description: (item.description as string | undefined) || undefined,
        price: item.price as string,
      })),
    },
  };

  // Handle hungry section
  const hungry: HungryContent = {
    heading: tinaConfig.hungry?.heading || '',
    description: tinaConfig.hungry?.description || [],
    partnerName: tinaConfig.hungry?.partnerName || '',
    partnerLink: tinaConfig.hungry?.partnerLink || undefined,
    image: tinaConfig.hungry?.image
      ? {
          src: tinaConfig.hungry.image.src,
          alt: tinaConfig.hungry.image.alt,
        }
      : undefined,
  };

  // Handle what's on section
  const whatsOn: WhatsOnContent = {
    heading: tinaConfig.whatsOn?.heading || '',
    events: filterDefined(tinaConfig.whatsOn?.events || []).map((event: any) => ({
      title: event.title as string,
      date: event.date as string,
      time: (event.time as string | undefined) || undefined,
      description: event.description as string,
      recurring: (event.recurring as boolean | undefined) || undefined,
    })),
  };

  // Handle FAQ section
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tinaConfigAny = tinaConfig as any;
  const faq: FAQContent = {
    heading: tinaConfig.faq?.heading || '',
    items: filterDefined(tinaConfig.faq?.items || []).map((item: any) => ({
      question: item.question as string,
      answer: item.answer as string,
    })),
    image: tinaConfigAny.faq?.image
      ? {
          src: tinaConfigAny.faq.image.src,
          alt: tinaConfigAny.faq.image.alt,
        }
      : undefined,
  };

  // Handle walk-in modal
  const walkInModal: WalkInModalContent = {
    heading: tinaConfig.walkInModal?.heading || '',
    message: tinaConfig.walkInModal?.message || [],
    hoursHeading: tinaConfig.walkInModal?.hoursHeading || '',
    ctaText: tinaConfig.walkInModal?.ctaText || '',
  };

  // Handle find us section
  const findUs: FindUsContent = {
    heading: tinaConfig.findUs?.heading || '',
    mapEmbedUrl: tinaConfig.findUs?.mapEmbedUrl || '',
    contactHeading: tinaConfig.findUs?.contactHeading || '',
    image: tinaConfigAny.findUs?.image
      ? {
          src: tinaConfigAny.findUs.image.src,
          alt: tinaConfigAny.findUs.image.alt,
        }
      : undefined,
  };

  // Handle SEO section
  const seo: SEOContent = {
    title: tinaConfig.seo?.title || '',
    description: tinaConfig.seo?.description || '',
    keywords: filterDefined(tinaConfig.seo?.keywords || []),
    ogImage: tinaConfig.seo?.ogImage || '',
  };

  return {
    header,
    business,
    hero,
    about,
    menu,
    hungry,
    whatsOn,
    faq,
    walkInModal,
    findUs,
    seo,
  };
}

// Re-export Tina types for convenience
export type { TinaSiteConfig, Maybe };
