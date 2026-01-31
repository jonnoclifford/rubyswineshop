import type { Metadata } from 'next';
import { Libre_Caslon_Display, DM_Sans, Titan_One } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/content/site-config';
import { generateLocalBusinessSchema } from '@/lib/seo';

const libreCaslon = Libre_Caslon_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-libre-caslon',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const titanOne = Titan_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-titan-one',
  display: 'swap',
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={`${libreCaslon.variable} ${dmSans.variable} ${titanOne.variable}`}>
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
