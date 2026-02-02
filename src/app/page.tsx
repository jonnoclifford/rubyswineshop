import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { TiltingGlass } from '@/components/shared/TiltingGlass';
import { Menu } from '@/components/sections/Menu';
import { Hungry } from '@/components/sections/Hungry';
import { WhatsOn } from '@/components/sections/WhatsOn';
import { FAQ } from '@/components/sections/FAQ';
import { FindUs } from '@/components/sections/FindUs';
import { getSiteConfig } from '@/lib/cms';

/**
 * Home Page Component
 *
 * This is the main landing page for Ruby's Wine Bar.
 * It fetches content from the CMS at build time using Next.js 15 App Router
 * server-side rendering capabilities.
 *
 * The page uses static generation for optimal performance, with content
 * being managed through Decap CMS.
 */
export default async function Home() {
  // Fetch site configuration from CMS
  // This happens at build time for static generation
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header header={siteConfig.header} business={siteConfig.business} />
      <main>
        <Hero hero={siteConfig.hero} />
        <About about={siteConfig.about} />
        <TiltingGlass side="left" />
        <TiltingGlass side="right" desktop={true} />
        <Menu menu={siteConfig.menu} />
        <TiltingGlass side="right" marginTop="-mt-[80px]" marginBottom="mb-0" />
        <Hungry hungry={siteConfig.hungry} />
        <WhatsOn whatsOn={siteConfig.whatsOn} />
        <FAQ faq={siteConfig.faq} />
        <FindUs
          findUs={siteConfig.findUs}
          business={siteConfig.business}
        />
      </main>
      <Footer business={siteConfig.business} />
    </>
  );
}
