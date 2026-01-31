import { siteConfig } from '@/content/site-config';

export function generateLocalBusinessSchema() {
  const { business, seo } = siteConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: business.name,
    description: seo.description,
    image: seo.ogImage,
    '@id': process.env.NEXT_PUBLIC_SITE_URL || '',
    url: process.env.NEXT_PUBLIC_SITE_URL || '',
    telephone: business.contact.phone,
    email: business.contact.email,
    priceRange: '$$',
    servesCuisine: 'Wine Bar',
    acceptsReservations: false,
    hasMenu: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.suburb,
      addressRegion: business.address.state,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Wednesday',
        opens: '16:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Thursday',
        opens: '16:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '16:00',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '14:00',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '14:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      `https://instagram.com/${business.contact.instagram.replace('@', '')}`,
    ],
  };
}
