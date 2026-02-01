import type { Metadata } from 'next';
import { Prata, DM_Sans } from 'next/font/google';
import './globals.css';
import { getSiteConfig } from '@/lib/tina-client';

const prata = Prata({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-prata',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    keywords: siteConfig.seo.keywords,
    openGraph: {
      title: siteConfig.seo.title,
      description: siteConfig.seo.description,
      url: process.env.NEXT_PUBLIC_SITE_URL || '',
      siteName: siteConfig.business.name,
      images: [
        {
          url: siteConfig.seo.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.business.name,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.seo.title,
      description: siteConfig.seo.description,
      images: [siteConfig.seo.ogImage],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();

  // Generate schema using data from Tina
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: siteConfig.business.name,
    description: siteConfig.seo.description,
    image: siteConfig.seo.ogImage,
    '@id': process.env.NEXT_PUBLIC_SITE_URL || '',
    url: process.env.NEXT_PUBLIC_SITE_URL || '',
    telephone: siteConfig.business.contact.phone,
    email: siteConfig.business.contact.email,
    priceRange: '$$',
    servesCuisine: 'Wine Bar',
    acceptsReservations: false,
    hasMenu: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.business.address.street,
      addressLocality: siteConfig.business.address.suburb,
      addressRegion: siteConfig.business.address.state,
      postalCode: siteConfig.business.address.postcode,
      addressCountry: siteConfig.business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.business.coordinates.lat,
      longitude: siteConfig.business.coordinates.lng,
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
      `https://instagram.com/${siteConfig.business.contact.instagram.replace('@', '')}`,
    ],
  };

  return (
    <html lang="en" className={`${prata.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
