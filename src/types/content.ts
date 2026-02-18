export type Maybe<T> = T | null | undefined;
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
    phone?: string;
    email?: string;
    instagram?: string;
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
    description?: string;
    items: WineItem[];
  };
  byTheBottle: {
    heading: string;
    description?: string;
    categories: {
      name: string;
      items: WineItem[];
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
  image?: {
    src: string;
    alt: string;
  };
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

// Media library metadata
export interface ImageMetadata {
  filename: string;
  path: string;
  alt?: string;
  caption?: string;
  folder?: string;
  uploadedAt: string;
  size: number;
}

export interface MediaLibrary {
  images: ImageMetadata[];
}

// Section configuration for visibility and theming
export type ColorScheme = 'light' | 'dark' | 'terracotta' | 'cream';

export interface SectionConfig {
  enabled: boolean;
  order: number;
  colorScheme?: ColorScheme;
}

export interface SectionSettings {
  hero: SectionConfig;
  about: SectionConfig;
  menu: SectionConfig;
  hungry: SectionConfig;
  whatsOn: SectionConfig;
  faq: SectionConfig;
  findUs: SectionConfig;
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
  media?: MediaLibrary; // Optional - image metadata
  forms?: import('@/types/form-builder').FormsConfig; // Optional - custom forms
  sectionSettings?: SectionSettings; // Optional for backwards compatibility
}

// CMS utility types
// These help transform CMS responses to our application types

/**
 * Utility type to unwrap Maybe wrapper
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

