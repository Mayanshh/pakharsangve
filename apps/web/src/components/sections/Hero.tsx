"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Marquee, { MarqueeItem } from "@/components/ui/Marquee";
import PortraitHeroSlide from "@/components/sections/hero-slides/PortraitHeroSlide";
import EditorialHeroSlide from "@/components/sections/hero-slides/EditorialHeroSlide";
import VslHeroSlide from "@/components/sections/hero-slides/VslHeroSlide";

const CLIENT_LOGOS: MarqueeItem[] = [
  {
    id: "leonardo",
    name: "Leonardo Hotels",
    content: (
      <div className="flex flex-col items-center leading-none text-neutral-900">
        <span className="text-lg sm:text-xl font-medium tracking-[0.22em] uppercase">
          LEONARDO
        </span>
        <span className="mt-1 font-serif italic text-base sm:text-lg tracking-wide text-neutral-700">
          Hotels
        </span>
      </div>
    ),
  },
  {
    id: "hitachi",
    name: "Hitachi",
    content: (
      <span className="text-xl sm:text-2xl font-black tracking-[0.12em] uppercase text-black">
        HITACHI
      </span>
    ),
  },
  {
    id: "haines-watts",
    name: "Haines Watts",
    content: (
      <span className="text-lg sm:text-xl font-bold tracking-tight text-black">
        Haines<span className="font-extrabold ml-0.5">Watts</span>
      </span>
    ),
  },
  {
    id: "vislink",
    name: "Vislink",
    content: (
      <div className="flex items-center gap-2.5 text-black">
        <svg
          className="h-6 w-6 sm:h-7 sm:w-7"
          viewBox="0 0 32 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M2 3L16 25L30 3" />
          <path d="M9 3L16 14L23 3" />
        </svg>
        <span className="text-lg sm:text-xl font-semibold tracking-[0.18em] uppercase">
          VISLINK
        </span>
      </div>
    ),
  },
  {
    id: "applied-nutrition",
    name: "Applied Nutrition",
    content: (
      <div className="flex flex-col leading-[0.9] font-black uppercase tracking-tighter text-black text-base sm:text-lg">
        <span>APPLIED</span>
        <span>NUTRITION</span>
      </div>
    ),
  },
  {
    id: "global",
    name: "Global",
    content: (
      <span className="text-xl sm:text-2xl font-extrabold tracking-[0.08em] uppercase text-black">
        GLOBAL
      </span>
    ),
  },
];

const SLIDE_TABS = [
  { id: 0, label: "Portrait" },
  { id: 1, label: "Ads Hero" },
  { id: 2, label: "VSL" },
] as const;

const SLIDE_DURATION_MS = 6500;

export default function Hero() {
  // 0 = Portrait Hero, 1 = Current Ads Hero, 2 = VSL Hero
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isWatchingVsl, setIsWatchingVsl] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Auto-slides gently for visitors who don't click; pauses when reading/hovering/watching VSL/scrolled away
  const isPaused = isHovered || !isInView || isWatchingVsl;

  const goToSlide = useCallback((index: number) => {
    const normalized = (index + 3) % 3;
    setActiveSlide(normalized);
    setTimerProgress(0);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      { threshold: [0, 0.35, 0.7] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const stepMs = 50;
    const interval = window.setInterval(() => {
      setTimerProgress((prev) => {
        const next = prev + (stepMs / SLIDE_DURATION_MS) * 100;
        if (next >= 100) {
          setActiveSlide((curr) => (curr + 1) % 3);
          return 0;
        }
        return next;
      });
    }, stepMs);

    return () => window.clearInterval(interval);
  }, [isPaused, activeSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return;
      if (e.key === "ArrowRight") goToSlide(activeSlide + 1);
      if (e.key === "ArrowLeft") goToSlide(activeSlide - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide, goToSlide, isInView]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 48) {
      goToSlide(deltaX < 0 ? activeSlide + 1 : activeSlide - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="h-fit w-full box-border flex flex-col items-start px-5 py-6 sm:px-8 sm:py-8 md:px-12 lg:px-20 lg:py-10"
    >
      <div className="w-full flex items-center justify-between mb-4 lg:mb-5">
        <h1 className="text-black text-3xl tracking-tight h-fit font-semibold">
          Pakharsangave<span className="text-(--primary-clr) text-5xl">.</span>
        </h1>
      </div>

      {/* Locked Identical Dimensions Across All 3 Slides — Zero Layout Shift */}
      <main className="relative w-full h-[82vh] min-h-[580px] max-h-[840px] rounded-3xl overflow-hidden shadow-sm">
        <div
          className="flex w-full h-full will-change-transform"
          style={{
            transform: `translate3d(-${activeSlide * 100}%, 0, 0)`,
            transition: "transform 850ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="w-full h-full shrink-0">
            <PortraitHeroSlide onExploreNext={() => goToSlide(1)} />
          </div>

          <div className="w-full h-full shrink-0">
            <EditorialHeroSlide />
          </div>

          <div className="w-full h-full shrink-0">
            <VslHeroSlide
              isActive={activeSlide === 2}
              onWatchStateChange={setIsWatchingVsl}
              onVideoEnded={() => goToSlide(0)}
            />
          </div>
        </div>

        {/* Floating Dock Scoped Strictly Inside Hero */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex justify-center pointer-events-auto">
          <nav
            aria-label="Hero showcase slides"
            className="inline-flex items-center gap-1 p-1.5 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-white/15 shadow-2xl"
          >
            {SLIDE_TABS.map((tab) => {
              const isCurrent = activeSlide === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => goToSlide(tab.id)}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`relative overflow-hidden px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-tight transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? "bg-white text-black shadow-sm"
                      : "text-neutral-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-neutral-500">
                      0{tab.id + 1}
                    </span>
                    <span>{tab.label}</span>
                  </span>

                  {isCurrent && !isPaused && (
                    <span
                      className="absolute bottom-0 left-0 h-[2.5px] bg-(--primary-clr) transition-[width] duration-75 ease-linear"
                      style={{ width: `${timerProgress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </main>

      {/* Client Logo Marquee */}
      <div className="w-full mt-6 lg:mt-8 overflow-hidden lg:overflow-visible">
        <Marquee
          items={CLIENT_LOGOS}
          speed={24}
          direction="left"
          slowOnHover={true}
          fadeEdges={true}
        />
      </div>
    </section>
  );
}