import type { Metadata } from "next";
import { Plus_Jakarta_Sans , Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import SmoothHashNavigator from "@/components/motion/SmoothHashNavigator";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pakharsangve — Creative Studio",
  description: "Awwwards-grade animated digital experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-zinc-100 antialiased selection:bg-white selection:text-black">
        <SmoothHashNavigator
          headerOffset={32}
          duration={1.2}
          ease="power4.inOut"
          highlightTarget={true}
          routeTransitionVeil={true}
        />
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <FooterSection />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}