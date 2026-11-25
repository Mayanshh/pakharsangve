import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ServiceSection from "@/components/sections/ServicesSection";
import FloatingTextSection from "@/components/sections/FloatingTextSection";
import WhatsHappeningSection from "@/components/sections/WhatsHappeningSection";
import ResultsShowcaseSection from "@/components/sections/ResultsShowcaseSection";
import FaqSection from "@/components/sections/FaqSection";
import { FloatingVideo } from "@/components/ui/FloatingVideo";
import PortraitHeroSlide from "@/components/sections/PortraitHero";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-(--bg) flex flex-col items-center justify-center overflow-x-hidden">
      <PortraitHeroSlide />
      <Hero />
      <FloatingVideo
        src="/videos/p3.mp4"
        poster="/images/img1.jpg"
        title="Watch our story"
        position="bottom-right"
      />
      <About />
      <ServiceSection />
      <FloatingTextSection
        marqueeText="Decade of experience • Global impact • Trusted scale •"
        marqueeConfig={{
          pixelsPerSecond: 220, // Crank up for faster scroll, lower (e.g., 80) for slower
          direction: "left",    // "left" or "right"
          gap: "1rem",          // Spacing between repeated text loops
        }}
      />
      <WhatsHappeningSection />
      <ResultsShowcaseSection />
      <FaqSection />
    </main>
  );
}