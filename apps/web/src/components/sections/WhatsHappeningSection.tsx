"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface ArticleItem {
  id: string;
  dateLabel: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  tags: string[];
}

export interface WhatsHappeningProps {
  heading?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  articles?: ArticleItem[];
  className?: string;
}

const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: "elevate-chromebook-uk",
    dateLabel: "October. 2026",
    title: "elevate.io joins Google Chromebook Perks in the UK",
    imageUrl:
      "/images/img6.jpg",
    imageAlt: "Video editing and creative workflow dashboard interface",
    href: "#article-elevate-chromebook",
    tags: ["SEO", "PPC"],
  },
  {
    id: "marino-muse-seo",
    dateLabel: "July. 2026",
    title: "Marino appointed as SEO agency for MUSE",
    imageUrl:
      "/images/img7.jpg",
    imageAlt: "Editorial outdoor portrait by natural water in greenery",
    href: "#article-marino-muse",
    tags: ["SEO"],
  },
  {
    id: "global-search-architecture",
    dateLabel: "June. 2026",
    title: "Scaling organic search authority across multi-region markets",
    imageUrl:
      "/images/img8.jpg",
    imageAlt: "Evening stadium lights and live broadcast production",
    href: "#article-global-search",
    tags: ["SEO", "CONTENT"],
  },
  {
    id: "paid-media-precision",
    dateLabel: "May. 2026",
    title: "High-intent acquisition systems built for measurable ROAS",
    imageUrl:
      "/images/img9.jpg",
    imageAlt: "Analytics workspace and performance metrics display",
    href: "#article-paid-media",
    tags: ["PPC", "ANALYTICS"],
  },
];

/** `lg` (1024px+) keeps the original carousel maths exactly; below it we use phone/tablet maths. */
const isDesktopViewport = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

/*
 * RESPONSIVE STRATEGY
 * -------------------
 * - Every `lg:` class is the ORIGINAL desktop value; >= 1024px is unchanged.
 * - Below lg the section sizes to its content (a 100vh box clipped the cards
 *   on short / landscape phones).
 * - Phones previously had NO way to reach cards 2-4 (the Next button is
 *   hidden under 640px and the track isn't natively scrollable). Added:
 *     * touch swipe with snap + rubber-band (touch/pen only, mouse is untouched)
 *     * a prev / counter / next row under the carousel on phones
 * - Below lg, snapping keeps the left padding instead of going edge-flush.
 */
export default function WhatsHappeningSection({
  heading = "What’s happening?",
  viewAllLabel = "View all articles",
  viewAllHref = "/articles",
  articles = DEFAULT_ARTICLES,
  className = "",
}: WhatsHappeningProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const activeIndexRef = useRef(0);
  const currentOffsetRef = useRef(0);
  const maxOffsetRef = useRef(0);

  // Touch-swipe state
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startOffset: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    axis: null as "x" | "y" | null,
  });
  const suppressClickRef = useRef(false);

  const commitIndex = useCallback((idx: number) => {
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  }, []);

  const computeBounds = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // Desktop: original formula. Below lg: the last card stops at the right
    // padding (instead of touching the screen edge).
    let visibleWidth = viewport.clientWidth;
    if (!isDesktopViewport()) {
      const cs = getComputedStyle(viewport);
      visibleWidth -=
        (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    }

    const maxScroll = Math.max(0, track.scrollWidth - visibleWidth);
    maxOffsetRef.current = maxScroll;

    const clamped = Math.min(Math.max(currentOffsetRef.current, -maxScroll), 0);
    currentOffsetRef.current = clamped;

    gsap.set(track, { x: clamped, force3D: true });
    setCanScrollNext(Math.abs(clamped) < maxScroll - 4);
  }, []);

  /** Track offset that brings `card` into its resting position. */
  const getSnapOffset = useCallback((card: HTMLElement) => {
    const track = trackRef.current;
    if (isDesktopViewport() || !track) return -card.offsetLeft; // original behaviour
    // Phones / tablets: measure from the track itself so the card lands
    // against the left padding. Both rects carry the same translation, so
    // the difference is independent of the current scroll position.
    return -(card.getBoundingClientRect().left - track.getBoundingClientRect().left);
  }, []);

  const animateTrackTo = useCallback((targetX: number) => {
    const track = trackRef.current;
    if (!track) return;

    const clampedTarget = Math.min(Math.max(targetX, -maxOffsetRef.current), 0);
    currentOffsetRef.current = clampedTarget;

    gsap.to(track, {
      x: clampedTarget,
      duration: 0.72,
      ease: "power3.out",
      force3D: true,
      overwrite: "auto",
      onComplete: () => {
        setCanScrollNext(Math.abs(clampedTarget) < maxOffsetRef.current - 4);
      },
    });
  }, []);

  const handleNext = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;

    const nextIdx = (activeIndexRef.current + 1) % cards.length;
    const targetCard = cards[nextIdx];

    // If we're already at the end and wrap around, reset smoothly to start
    if (Math.abs(currentOffsetRef.current) >= maxOffsetRef.current - 4 && nextIdx === 0) {
      commitIndex(0);
      animateTrackTo(0);
      return;
    }

    const nextOffset = targetCard
      ? getSnapOffset(targetCard)
      : currentOffsetRef.current - 520;
    commitIndex(nextIdx);
    animateTrackTo(nextOffset);
  }, [animateTrackTo, commitIndex, getSnapOffset]);

  const handlePrev = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;

    const prevIdx =
      activeIndexRef.current === 0 ? cards.length - 1 : activeIndexRef.current - 1;
    commitIndex(prevIdx);
    animateTrackTo(getSnapOffset(cards[prevIdx]));
  }, [animateTrackTo, commitIndex, getSnapOffset]);

  /* ---------------------- touch swipe ---------------------- */

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Mouse behaviour is deliberately untouched (desktop stays button-driven).
    if (e.pointerType === "mouse") return;
    const d = dragRef.current;
    d.pointerId = e.pointerId;
    d.startX = e.clientX;
    d.startY = e.clientY;
    d.axis = null;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    const track = trackRef.current;
    if (!track || e.pointerType === "mouse" || e.pointerId !== d.pointerId) return;

    // Decide whether this gesture is horizontal (ours) or vertical (page scroll)
    if (d.axis === null) {
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;

      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (d.axis === "x") {
        gsap.killTweensOf(track);
        d.startX = e.clientX;
        d.startOffset = Number(gsap.getProperty(track, "x")) || 0;
        d.lastX = e.clientX;
        d.lastT = e.timeStamp;
        d.velocity = 0;
        suppressClickRef.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      return;
    }

    if (d.axis !== "x") return;

    const raw = d.startOffset + (e.clientX - d.startX);
    const max = maxOffsetRef.current;
    let next = raw;
    if (raw > 0) next = raw * 0.35; // rubber-band past the first card
    else if (raw < -max) next = -max + (raw + max) * 0.35; // ...and past the last

    gsap.set(track, { x: next, force3D: true });

    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt; // px per ms
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    const track = trackRef.current;
    if (e.pointerId !== d.pointerId) return;

    const wasHorizontal = d.axis === "x";
    d.pointerId = -1;
    d.axis = null;

    if (!wasHorizontal || !track) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;

    const current = Number(gsap.getProperty(track, "x")) || 0;
    const recent = e.timeStamp - d.lastT < 100;
    const projected = current + (recent ? d.velocity * 200 : 0);

    const targets = cards.map((card) =>
      Math.min(0, Math.max(-maxOffsetRef.current, getSnapOffset(card)))
    );

    let best = 0;
    let bestDist = Infinity;
    targets.forEach((t, i) => {
      const dist = Math.abs(t - projected);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });

    // A deliberate short flick should still move one card
    const dragged = e.clientX - d.startX;
    if (best === activeIndexRef.current && Math.abs(dragged) > 40) {
      best = Math.min(cards.length - 1, Math.max(0, best + (dragged < 0 ? 1 : -1)));
    }

    commitIndex(best);
    animateTrackTo(targets[best]);

    // Swallow the click that follows a swipe so it doesn't open an article
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 60);
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    computeBounds();

    const ctx = gsap.context(() => {
      gsap.from(".wh-header-reveal", {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.from(".wh-card-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
      });
    }, sectionRef);

    const resizeObserver = new ResizeObserver(() => {
      computeBounds();
    });

    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    return () => {
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, [computeBounds, articles.length]);

  const handleCardHover = (index: number, entering: boolean) => {
    // Touch screens emulate mouseenter on tap, which would leave cards stuck zoomed
    if (!window.matchMedia("(hover: hover)").matches) return;

    const card = cardRefs.current[index];
    if (!card) return;
    const img = card.querySelector<HTMLImageElement>("[data-card-media]");
    const arrow = card.querySelector<HTMLElement>("[data-read-arrow]");

    if (img) {
      gsap.to(img, {
        scale: entering ? 1.04 : 1,
        duration: 0.65,
        ease: "power2.out",
        force3D: true,
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: entering ? 5 : 0,
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    }
  };

  return (
    <section
      id="whatshappening"
      ref={sectionRef}
      aria-labelledby="whats-happening-heading"
      className={`relative w-full h-auto lg:h-screen bg-[#070808] text-white py-14 sm:py-20 overflow-hidden select-none ${className}`}
    >
      {/* Header Container */}
      <div className="mx-auto w-full px-5 sm:px-10 lg:px-14 mb-8 sm:mb-10">
        <div className="wh-header-reveal flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="inline-block h-3.5 w-3.5 rounded-full bg-white shrink-0"
          />
          <h2
            id="whats-happening-heading"
            className="text-2xl sm:text-3xl lg:text-[2.1rem] font-normal tracking-tight text-white leading-tight"
          >
            {heading}
          </h2>
        </div>

        <div className="wh-header-reveal mt-3 pl-7">
          <a
            href={viewAllHref}
            className="group inline-flex items-center gap-2.5 text-sm sm:text-[15px] font-medium text-lime-300 hover:text-lime-600 transition-colors duration-200"
          >
            <span>{viewAllLabel}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 12"
              fill="none"
              className="w-6 h-3 stroke-current transition-transform duration-300 group-hover:translate-x-1.5"
            >
              <path
                d="M1 6H22.5M22.5 6L17.5 1.5M22.5 6L17.5 10.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Carousel Viewport + Floating Next Control */}
      <div className="relative w-full">
        <div
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onClickCapture={handleClickCapture}
          className="w-full overflow-hidden touch-pan-y touch-pinch-zoom pl-5 sm:pl-10 lg:pl-14 pr-5 sm:pr-10"
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-4 sm:gap-5 will-change-transform"
          >
            {articles.map((article, idx) => (
              <article
                key={article.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onMouseEnter={() => handleCardHover(idx, true)}
                onMouseLeave={() => handleCardHover(idx, false)}
                className="wh-card-reveal group relative shrink-0 w-[86vw] sm:w-[48vw] lg:w-[46.5vw] aspect-4/5 sm:aspect-16/10 rounded-[20px] sm:rounded-3xl overflow-hidden bg-[#111315] border border-white/6"
              >
                {/* Background Image */}
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  data-card-media
                  loading={idx < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover object-center will-change-transform"
                />

                {/* Editorial Readability Scrims */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/55 via-black/15 to-black/85"
                />

                {/* Card Content Overlay */}
                <div className="relative z-10 flex h-full w-full flex-col justify-between p-5 sm:p-7 lg:p-8">
                  {/* Top Timestamp */}
                  <div className="flex items-center justify-between">
                    <time className="text-xs sm:text-[13px] font-normal tracking-wide text-white/90">
                      {article.dateLabel}
                    </time>
                  </div>

                  {/* Bottom Headline, Read Link & Tag Pills */}
                  <div className="flex flex-col items-start">
                    <a
                      href={article.href}
                      className="block max-w-136 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 rounded-sm"
                    >
                      <h3 className="text-xl sm:text-2xl lg:text-[2rem] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                        {article.title}
                      </h3>
                    </a>

                    <a
                      href={article.href}
                      className="mt-3 inline-flex items-center gap-2.5 text-xs sm:text-sm font-normal text-white/85 hover:text-white transition-colors"
                    >
                      <span>Read article</span>
                      <span
                        data-read-arrow
                        aria-hidden="true"
                        className="inline-flex items-center"
                      >
                        <svg
                          viewBox="0 0 24 12"
                          fill="none"
                          className="w-6 h-3 stroke-current"
                        >
                          <path
                            d="M1 6H22.5M22.5 6L17.5 1.5M22.5 6L17.5 10.5"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </a>

                    {/* Category Pills */}
                    {article.tags.length > 0 && (
                      <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/35 backdrop-blur-xs px-3.5 py-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.08em] text-white/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Floating Mint-Green Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next article"
          data-can-scroll={canScrollNext}
          className="hidden sm:flex items-center justify-center absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 lg:h-12 lg:w-12 rounded-full bg-lime-300 hover:bg-lime-600 active:scale-95 text-[#070808] shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="w-5 h-5 stroke-current"
          >
            <path
              d="M4.5 10H15.5M15.5 10L11 5.5M15.5 10L11 14.5"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Phone-only controls (hidden from 640px up, where the floating button takes over) */}
      <div className="mt-6 flex items-center gap-4 px-5 sm:hidden">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous article"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-300 text-[#070808] active:scale-95 transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="w-5 h-5 stroke-current rotate-180"
          >
            <path
              d="M4.5 10H15.5M15.5 10L11 5.5M15.5 10L11 14.5"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span
          aria-live="polite"
          className="min-w-[3ch] text-center text-base font-medium tracking-wider text-white"
        >
          {activeIndex + 1}/{articles.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next article"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-300 text-[#070808] active:scale-95 transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="w-5 h-5 stroke-current"
          >
            <path
              d="M4.5 10H15.5M15.5 10L11 5.5M15.5 10L11 14.5"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
