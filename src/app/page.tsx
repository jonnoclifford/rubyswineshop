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
import { ensureConfigVersion } from '@/lib/migrate-config';

// Revalidate every 10 seconds - picks up content changes from admin quickly
export const revalidate = 10;

export default async function Home() {
  const rawConfig = await getSiteConfig();
  const siteConfig = ensureConfigVersion(rawConfig);

  // Get section settings with defaults
  const sectionSettings = siteConfig.sectionSettings || {
    hero: { enabled: true, order: 0, colorScheme: 'dark' },
    about: { enabled: true, order: 1, colorScheme: 'light' },
    menu: { enabled: true, order: 2, colorScheme: 'cream' },
    hungry: { enabled: true, order: 3, colorScheme: 'light' },
    whatsOn: { enabled: true, order: 4, colorScheme: 'terracotta' },
    faq: { enabled: true, order: 5, colorScheme: 'light' },
    findUs: { enabled: true, order: 6, colorScheme: 'cream' },
  };

  // Create ordered list of section keys
  type SectionKey = keyof typeof sectionSettings;
  const allSectionKeys: SectionKey[] = ['hero', 'about', 'menu', 'hungry', 'whatsOn', 'faq', 'findUs'];

  // Sort by order and filter enabled
  const orderedSectionKeys = allSectionKeys
    .filter(key => sectionSettings[key].enabled)
    .sort((a, b) => sectionSettings[a].order - sectionSettings[b].order);

  // Helper function to render a section
  const renderSection = (key: SectionKey) => {
    const colorScheme = sectionSettings[key].colorScheme;

    switch (key) {
      case 'hero':
        return <Hero hero={siteConfig.hero} colorScheme={colorScheme} />;
      case 'about':
        return <About about={siteConfig.about} colorScheme={colorScheme} />;
      case 'menu':
        return <Menu menu={siteConfig.menu} colorScheme={colorScheme} />;
      case 'hungry':
        return <Hungry hungry={siteConfig.hungry} colorScheme={colorScheme} />;
      case 'whatsOn':
        return <WhatsOn whatsOn={siteConfig.whatsOn} colorScheme={colorScheme} />;
      case 'faq':
        return <FAQ faq={siteConfig.faq} colorScheme={colorScheme} />;
      case 'findUs':
        return <FindUs findUs={siteConfig.findUs} business={siteConfig.business} colorScheme={colorScheme} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header header={siteConfig.header} business={siteConfig.business} />
      <main>
        {orderedSectionKeys.map((sectionKey, index) => (
          <div key={sectionKey}>
            {renderSection(sectionKey)}
            {/* Add decorative glasses between sections where appropriate */}
            {index === 1 && (
              <>
                <TiltingGlass side="left" />
                <TiltingGlass side="right" desktop={true} />
              </>
            )}
            {sectionKey === 'menu' && (
              <TiltingGlass side="right" marginTop="-mt-[80px]" marginBottom="mb-0" />
            )}
          </div>
        ))}
      </main>
      <Footer business={siteConfig.business} />
    </>
  );
}
