"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface MarqueeItem {
  id: string | number;
  name: string;
  content: React.ReactNode;
  href?: string;
}

interface MarqueeProps {
  items: MarqueeItem[];
  speed?: number; // Duration in seconds for one full loop (lower = faster)
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  slowOnHover?: boolean; // smooth deceleration instead of a hard stop
  fadeEdges?: boolean;
  gapClassName?: string;
  className?: string;
}

export default function Marquee({
  items,
  speed = 28,
  direction = "left",
  pauseOnHover = false,
  slowOnHover = true,
  fadeEdges = true,
  gapClassName = "gap-16 sm:gap-24 lg:gap-32",
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    const ctx = gsap.context(() => {
      const isRight = direction === "right";

      // Set initial position for seamless bidirectional looping
      gsap.set(track, {
        xPercent: isRight ? -50 : 0,
        force3D: true,
      });

      tweenRef.current = gsap.to(track, {
        xPercent: isRight ? 0 : -50,
        duration: speed,
        ease: "none",
        repeat: -1,
        force3D: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items, speed, direction]);

  const handleMouseEnter = () => {
    if (!tweenRef.current) return;
    if (pauseOnHover) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6, ease: "power3.out" });
    } else if (slowOnHover) {
      gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.6, ease: "power3.out" });
    }
  };

  const handleMouseLeave = () => {
    if (!tweenRef.current) return;
    if (pauseOnHover || slowOnHover) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.out" });
    }
  };

  // Render two identical tracks side-by-side for a 0ms seam reset at -50%
  const renderTrackGroup = (isDuplicate = false) => (
    <div
      aria-hidden={isDuplicate}
      className={`flex shrink-0 items-center justify-around ${gapClassName} pr-16 sm:pr-24 lg:pr-32`}
    >
      {items.map((item) => {
        const inner = (
          <div className="group/item flex items-center justify-center opacity-85 transition-all duration-300 hover:opacity-100 hover:scale-[1.03]">
            {item.content}
          </div>
        );

        return item.href ? (
          <a
            key={`${isDuplicate ? "dup-" : ""}${item.id}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            tabIndex={isDuplicate ? -1 : 0}
            className="focus:outline-none"
          >
            {inner}
          </a>
        ) : (
          <div key={`${isDuplicate ? "dup-" : ""}${item.id}`}>{inner}</div>
        );
      })}
    </div>
  );

  return (
    <section
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Client and partner logos"
      className={`relative w-full overflow-hidden bg-white py-10 sm:py-14 border-y border-neutral-100 select-none ${className}`}
      style={
        fadeEdges
          ? {
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }
          : undefined
      }
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
      >
        {renderTrackGroup(false)}
        {renderTrackGroup(true)}
      </div>
    </section>
  );
}