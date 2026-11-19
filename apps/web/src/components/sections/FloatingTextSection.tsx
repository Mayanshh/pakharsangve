"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

export interface FloatingItem {
  id: string;
  type: "video" | "pill";
  content?: string;
  videoSrc?: string;

  positionClassName: string;
  style?: React.CSSProperties;
}

export interface MarqueeConfig {
  /** Speed in pixels per second (Higher = faster. Default: 120) */
  pixelsPerSecond?: number;
  /** Scroll direction (Default: "left") */
  direction?: "left" | "right";
  /** Gap between repeated text phrases (Default: "3rem") */
  gap?: string;
}

interface FloatingTextProps {
  marqueeText?: string;
  marqueeConfig?: MarqueeConfig;
  floatingItems?: FloatingItem[];
}

const DEFAULT_FLOATING_ITEMS: FloatingItem[] = [
  {
    id: "float-1",
    type: "video",
    videoSrc: "/videos/p.mp4",
    positionClassName: "top-30 left-[6%] sm:left-[10%] w-44 sm:w-58 aspect-[16/10]",
  },
  {
    id: "float-2",
    type: "pill",
    content: "Decades of experience",
    positionClassName: "top-35 left-[32%] sm:left-[35%] px-6 py-3",
  },
  {
    id: "float-3",
    type: "video",
    videoSrc: "/videos/p2.mp4",
    positionClassName: "top-38 right-[15%] sm:right-[14%] w-40 sm:w-52 aspect-[16/10]",
  },
  {
    id: "float-4",
    type: "pill",
    content: "Clients in 30 countries",
    positionClassName: "bottom-55 right-[15%] sm:right-[16%] px-6 py-3",
  },
  {
    id: "float-5",
    type: "video",
    videoSrc: "/videos/p3.mp4",
    positionClassName: "bottom-18 left-[20%] sm:left-[35%] w-40 sm:w-58 aspect-[16/10]",
  },
];

const DEFAULT_MARQUEE_CONFIG: Required<MarqueeConfig> = {
  pixelsPerSecond: 120,
  direction: "left",
  gap: "3rem",
};

export default function FloatingTextSection({
  marqueeText = "Decade of experience • Global impact • Trusted scale •",
  marqueeConfig = {},
  floatingItems = DEFAULT_FLOATING_ITEMS,
}: FloatingTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pillItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [repeatCount, setRepeatCount] = useState(3);
  // Whole-pixel width of one marquee group (text + gap). 0 = not measured yet.
  const [groupWidth, setGroupWidth] = useState(0);

  const pixelsPerSecond =
    marqueeConfig.pixelsPerSecond ?? DEFAULT_MARQUEE_CONFIG.pixelsPerSecond;
  const direction = marqueeConfig.direction ?? DEFAULT_MARQUEE_CONFIG.direction;
  const gap = marqueeConfig.gap ?? DEFAULT_MARQUEE_CONFIG.gap;

  /* ------------------------------------------------------------------ */
  /* 1. Measure one group, snap it to a whole pixel, and work out how    */
  /*    many copies are needed to cover the viewport.                    */
  /* ------------------------------------------------------------------ */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;

    const groups = Array.from(track.children) as HTMLElement[];

    groups.forEach((g) => (g.style.minWidth = ""));
    const natural = groups[0].getBoundingClientRect().width;
    if (natural <= 0) return;

    const snapped = Math.ceil(natural);
    groups.forEach((g) => (g.style.minWidth = `${snapped}px`));

    const vw = window.innerWidth;
    const needed = Math.max(2, Math.ceil(vw / snapped) + 1);

    setGroupWidth((prev) => (prev === snapped ? prev : snapped));
    setRepeatCount((prev) => (prev === needed ? prev : needed));
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, marqueeText, gap, repeatCount]);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!cancelled) measure();
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(schedule);
    }

    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", schedule);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [measure]);

  /* ------------------------------------------------------------------ */
  /* 2. Marquee tween                                                    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || groupWidth <= 0) return;

    const startX = direction === "left" ? 0 : -groupWidth;
    const endX = direction === "left" ? -groupWidth : 0;
    const duration = Math.max(groupWidth / pixelsPerSecond, 0.5);

    const tween = gsap.fromTo(
      track,
      { x: startX },
      {
        x: endX,
        duration,
        ease: "none",
        repeat: -1,
        force3D: true,
      }
    );

    return () => {
      tween.kill();
      gsap.set(track, { clearProps: "transform" });
    };
  }, [groupWidth, repeatCount, direction, pixelsPerSecond]);

  /* ------------------------------------------------------------------ */
  /* 3. Floating motion ONLY for pills (Videos remain static)            */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      pillItemsRef.current.forEach((el, index) => {
        if (!el) return;

        const amplitudeY = 14 + (index % 3) * 6;
        const amplitudeX = (index % 2 === 0 ? 1 : -1) * (8 + (index % 3) * 3);
        const rotate = index % 2 === 0 ? 2 : -2;
        const duration = 3 + (index % 3) * 0.9;

        gsap.fromTo(
          el,
          { x: -amplitudeX, y: -amplitudeY, rotation: -rotate },
          {
            x: amplitudeX,
            y: amplitudeY,
            rotation: rotate,
            duration,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: -index * 0.7,
            force3D: true,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [floatingItems]);

  const setupVideo = (el: HTMLVideoElement | null) => {
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const p = el.play();
    if (p) p.catch(() => {});
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[70vh] sm:min-h-[80vh] h-screen flex items-center justify-center overflow-hidden bg-(--bg) select-none py-28"
    >
      {/* Floating foreground elements */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {floatingItems.map((item, idx) => {
          if (item.type === "video") {
            return (
              <div
                key={item.id}
                style={item.style}
                className={`absolute ${item.positionClassName} pointer-events-auto`}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden bg-neutral-200 border border-lime-300/60 shadow-[0_0_40px_rgba(190,242,100,0.55)] transition-transform duration-500 hover:scale-105">
                  <video
                    ref={setupVideo}
                    src={item.videoSrc || ""}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            );
          }

          if (item.type === "pill") {
            return (
              <div
                key={item.id}
                ref={(el) => {
                  pillItemsRef.current[idx] = el;
                }}
                style={item.style}
                className={`absolute ${item.positionClassName} z-30 will-change-transform pointer-events-auto`}
              >
                <div className="rounded-full bg-lime-300 text-neutral-950 font-medium text-sm sm:text-base tracking-tight whitespace-nowrap px-6 py-3 flex items-center justify-center shadow-[0_0_35px_rgba(190,242,100,0.7)] transition-transform duration-300 hover:scale-105">
                  <span>{item.content}</span>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Moving giant text marquee track */}
      <div ref={trackRef} className="flex w-max will-change-transform z-10">
        {Array.from({ length: repeatCount }).map((_, index) => (
          <div
            key={index}
            aria-hidden={index > 0}
            style={{ paddingRight: gap }}
            className="flex shrink-0 items-center whitespace-nowrap"
          >
            <span className="text-[14vw] sm:text-[16vw] lg:text-[12rem] font-semibold tracking-tighter uppercase text-neutral-950 leading-none">
              {marqueeText}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}