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
}

export interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface SiteConfig {
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
