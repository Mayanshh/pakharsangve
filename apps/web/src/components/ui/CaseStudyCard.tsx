"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface CaseStudyCardProps {
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
  imageAlt?: string;
  href?: string;
  ctaLabel?: string;
  /** Brand color overlay on hover (e.g. "#1cb5f6" or "#bef264") */
  hoverColor?: string;
  /** Text/border color on hover ("#0a0a0a" for bright accents, "#ffffff" for dark) */
  hoverTextColor?: string;
  /** Enable vertical scroll parallax on the background image */
  enableScrollParallax?: boolean;
  /** Scroll parallax travel distance in pixels */
  parallaxAmount?: number;
  /** Enable subtle mouse-tracking parallax on hover */
  enableCursorParallax?: boolean;
  /** Aspect ratio class (defaults to aspect-16/10) */
  aspectClassName?: string;
  className?: string;
  onClick?: () => void;
}

export default function CaseStudyCard({
  title,
  description,
  tags,
  imageSrc,
  imageAlt,
  href,
  ctaLabel = "View work",
  hoverColor = "#1cb5f6",
  hoverTextColor = "#0a0a0a",
  enableScrollParallax = true,
  parallaxAmount = 36,
  enableCursorParallax = true,
  aspectClassName = "aspect-16/10",
  className = "",
  onClick,
}: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const cursorLayerRef = useRef<HTMLDivElement>(null);

  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const imageWrapper = imageWrapperRef.current;
    const cursorLayer = cursorLayerRef.current;
    if (!card || !imageWrapper) return;

    const ctx = gsap.context(() => {
      // 1. Scroll-triggered vertical parallax (GPU-accelerated translateY)
      if (enableScrollParallax) {
        gsap.fromTo(
          imageWrapper,
          { y: -parallaxAmount },
          {
            y: parallaxAmount,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 2. Smooth 60/120fps mouse parallax via gsap.quickTo
      if (enableCursorParallax && cursorLayer) {
        quickX.current = gsap.quickTo(cursorLayer, "x", {
          duration: 0.7,
          ease: "power3.out",
        });
        quickY.current = gsap.quickTo(cursorLayer, "y", {
          duration: 0.7,
          ease: "power3.out",
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [enableScrollParallax, parallaxAmount, enableCursorParallax]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableCursorParallax || !cardRef.current || !quickX.current || !quickY.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    quickX.current(relX * -18);
    quickY.current(relY * -18);
  };

  const handleMouseLeave = () => {
    if (quickX.current && quickY.current) {
      quickX.current(0);
      quickY.current(0);
    }
  };

  const content = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={
        {
          "--hover-bg": hoverColor,
          "--hover-fg": hoverTextColor,
        } as React.CSSProperties
      }
      className={`group relative w-full ${aspectClassName} min-h-85 sm:min-h-105 bg-neutral-950 rounded-3xl lg:rounded-4xl overflow-hidden select-none cursor-pointer isolate ${className}`}
    >
      {/* Parallax Image Layer (oversized slightly to prevent edge gaps during translate) */}
      <div
        ref={imageWrapperRef}
        className="absolute -inset-y-12 inset-x-0 will-change-transform"
      >
        <div
          ref={cursorLayerRef}
          className="relative w-full h-full scale-[1.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.11] will-change-transform"
        >
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-[filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale group-hover:contrast-125"
          />
        </div>
      </div>

      {/* UNHOVERED STATE: Bottom Black Vignette Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/95 via-black/45 to-transparent opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0"
      />

      {/* HOVERED STATE: Duotone Brand Color Wash */}
      <div
        aria-hidden="true"
        style={{ backgroundColor: "var(--hover-bg)" }}
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-85"
      />
      <div
        aria-hidden="true"
        style={{ backgroundColor: "var(--hover-bg)" }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-65"
      />

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end p-6 sm:p-10 lg:p-12 text-white transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-(--hover-fg)">
        {/* Title */}
        <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-none">
          {title}
        </h3>

        {/* "View work ———>" Row */}
        <div className="mt-3 sm:mt-4 inline-flex items-center gap-3 text-base sm:text-lg font-normal">
          <span>{ctaLabel}</span>
          <svg
            className="w-12 sm:w-14 h-4 overflow-visible transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
            viewBox="0 0 56 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <line x1="0" y1="6" x2="53" y2="6" />
            <polyline points="48 1.5 53.5 6 48 10.5" />
          </svg>
        </div>

        {/* HOVERED STATE: Smooth Accordion Description Reveal */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <p className="pt-4 sm:pt-5 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
              {description}
            </p>
          </div>
        </div>

        {/* Service Tags */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/75 px-4 py-1.5 text-xs sm:text-sm font-medium tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-(--hover-fg)/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block w-full focus:outline-none">
        {content}
      </a>
    );
  }

  return content;
}