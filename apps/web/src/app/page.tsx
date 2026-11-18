import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ServiceSection from "@/components/sections/ServicesSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-(--bg) flex flex-col items-center justify-center overflow-x-hidden">
      <Hero />
      <About />
      <ServiceSection />
    </main>
  );
}