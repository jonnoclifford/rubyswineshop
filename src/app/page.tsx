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

// Revalidate every 10 seconds - picks up content changes from admin quickly
export const revalidate = 10;

export default async function Home() {
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
