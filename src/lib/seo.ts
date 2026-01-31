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
    openingHoursSpecification: Object.entries(business.hours)
      .filter(([, hours]) => hours !== 'Closed')
      .map(([day, hours]) => {
        const [open, close] = hours.split(' - ').map(time => {
          const [hourMin, period] = time.split(' ');
          const [hour, min] = hourMin.split(':');
          let hour24 = parseInt(hour);
          if (period === 'PM' && hour24 !== 12) hour24 += 12;
          if (period === 'AM' && hour24 === 12) hour24 = 0;
          return `${hour24.toString().padStart(2, '0')}:${min}`;
        });

        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: day,
          opens: open,
          closes: close,
        };
      }),
    sameAs: [
      `https://instagram.com/${business.contact.instagram.replace('@', '')}`,
    ],
  };
}
