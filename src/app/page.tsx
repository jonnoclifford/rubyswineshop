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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <TiltingGlass side="left" />
        <Menu />
        <TiltingGlass side="right" marginTop="-mt-[52px]" marginBottom="mb-0" />
        <Hungry />
        <WhatsOn />
        <FAQ />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
