import { MediaUnlockProvider } from "@/components/MediaUnlock";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

export default function Home() {
  return (
    <MediaUnlockProvider>
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </SmoothScroll>
    </MediaUnlockProvider>
  );
}
