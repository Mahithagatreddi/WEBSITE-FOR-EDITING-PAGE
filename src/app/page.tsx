import { MediaUnlockProvider } from "@/components/MediaUnlock";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ApplicationsUse } from "@/components/ApplicationsUse";
import { CalendarSection } from "@/components/CalendarSection";

export default function Home() {
  return (
    <MediaUnlockProvider>
    <SmoothScroll>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <ApplicationsUse />
        <Process />
        <CalendarSection />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </SmoothScroll>
    </MediaUnlockProvider>
  );
}
