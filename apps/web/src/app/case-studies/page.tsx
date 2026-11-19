"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkDetailModal from "@/components/sections/WorkDetailModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WorkProject {
  id: string;
  client: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  /** Controls desktop 12-column span: 'third' = 4 cols, 'two-thirds' = 8 cols */
  span?: "third" | "two-thirds";
}

export interface WorksHeroData {
  brandText?: string;
  eyebrowLabel?: string;
  title?: string;
  leftBadgeLabel?: string;
  leadBold?: string;
  leadBody?: string;
  mediaBadgeLabel?: string;
  mediaImageUrl?: string;
  mediaImageAlt?: string;
  email?: string;
  phone?: string;
}

export interface WorksPageProps {
  hero?: WorksHeroData;
  projects?: WorkProject[];
  className?: string;
}

const DEFAULT_HERO: Required<WorksHeroData> = {
  brandText: "PAKHARSANGVE",
  eyebrowLabel: "Work",
  title: "Case Studies",
  leftBadgeLabel: "Trusted by World Wide brands",
  leadBold: "Indian-born, globally trusted",
  leadBody:
    " – we've generated £100M+ in client revenue and manage £250K in monthly ad spend, backed by a world-class team built to improve the bottom line.",
  mediaBadgeLabel: "Full-service agency",
  mediaImageUrl: "/images/img1.jpg",
  mediaImageAlt: "Pakharsangve agency team collaborating around laptops in Manchester",
  email: "hello@pakharsangve.com",
  phone: "0161 660 6263",
};

const DEFAULT_PROJECTS: WorkProject[] = [
  {
    id: "wr-partners",
    client: "WR Partners",
    href: "#work-wr-partners",
    imageUrl: "/images/img2.jpg",
    imageAlt: "WR Partners modern glass corporate office exterior",
    tags: ["Branding", "Web Design", "SEO", "PPC", "Video"],
    span: "third",
  },
  {
    id: "office-insight",
    client: "Office Insight",
    href: "#work-office-insight",
    imageUrl: "/images/img3.jpg",
    imageAlt: "Office Insight contemporary open workspace interior",
    tags: ["Web Design", "SEO", "PPC"],
    span: "third",
  },
  {
    id: "latakoo",
    client: "Latakoo",
    href: "#work-latakoo",
    imageUrl: "/images/img4.jpg",
    imageAlt: "Latakoo broadcast camera operator and journalist on location",
    tags: ["Branding", "Web Design", "SEO", "PPC"],
    span: "third",
  },
  {
    id: "vislink",
    client: "Vislink",
    href: "#work-vislink",
    imageUrl: "/images/img5.jpg",
    imageAlt: "Vislink live stadium broadcast camera tracking football action",
    tags: ["Branding", "Web Design", "SEO", "PPC", "Video"],
    span: "two-thirds",
  },
  {
    id: "eventotron",
    client: "Eventotron",
    href: "#work-eventotron",
    imageUrl: "/images/img6.jpg",
    imageAlt: "Eventotron live festival stage lighting and crowd atmosphere",
    tags: ["Branding"],
    span: "third",
  },
  {
    id: "portswigger",
    client: "PortSwigger",
    href: "#work-portswigger",
    imageUrl: "/images/img7.jpg",
    imageAlt: "PortSwigger architectural headquarters building exterior",
    tags: ["Web Design", "SEO"],
    span: "third",
  },
  {
    id: "evalart",
    client: "Evalart",
    href: "#work-evalart",
    imageUrl: "/images/img8.jpg",
    imageAlt: "Evalart specialist working at laptop in warm studio",
    tags: ["Branding", "Web Design", "SEO", "Video"],
    span: "third",
  },
  {
    id: "blackbird",
    client: "Blackbird",
    href: "#work-blackbird",
    imageUrl: "/images/img9.jpg",
    imageAlt: "Blackbird live Premier League football broadcast action",
    tags: ["Branding", "Web Design", "SEO", "PPC", "Video"],
    span: "third",
  },
];

function WorkCard({
  project,
  onSelect,
}: {
  project: WorkProject;
  onSelect: (project: WorkProject) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const colSpanClass =
    project.span === "two-thirds"
      ? "md:col-span-2 lg:col-span-8"
      : "lg:col-span-4";

  const handleHover = (entering: boolean) => {
    const card = cardRef.current;
    if (!card) return;

    const img = card.querySelector<HTMLImageElement>("[data-work-media]");
    const arrow = card.querySelector<HTMLElement>("[data-work-arrow]");

    if (img) {
      gsap.to(img, {
        scale: entering ? 1.045 : 1,
        duration: 0.65,
        ease: "power2.out",
        force3D: true,
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: entering ? 6 : 0,
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className={`work-card-reveal group relative h-96 sm:h-112 lg:h-124 rounded-3xl overflow-hidden bg-[#111315] select-none ${colSpanClass}`}
    >
      {/* Background Cover Image */}
      <img
        src={project.imageUrl}
        alt={project.imageAlt}
        data-work-media
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-center will-change-transform"
      />

      {/* Bottom Readability Gradient Scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/88 via-black/28 to-black/5"
      />

      {/* Full-Card Accessible Trigger */}
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.client} case study`}
        className="absolute inset-0 z-10 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 rounded-3xl"
      />

      {/* Bottom-Aligned Card Content */}
      <div className="pointer-events-none relative z-20 flex h-full w-full flex-col justify-end p-6 sm:p-8 lg:p-9">
        <h2 className="text-2xl sm:text-[1.75rem] lg:text-[2rem] font-normal tracking-[-0.02em] leading-[1.15] text-white">
          {project.client}
        </h2>

        <div className="mt-2.5 inline-flex items-center gap-3 text-xs sm:text-[13px] font-normal text-white/90">
          <span>View work</span>
          <span
            data-work-arrow
            aria-hidden="true"
            className="inline-flex items-center text-white/80"
          >
            <svg
              viewBox="0 0 28 10"
              fill="none"
              className="h-2.5 w-7 stroke-current"
            >
              <path
                d="M1 5H26.5M26.5 5L22.5 1.5M26.5 5L22.5 8.5"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Discipline Pill Badges */}
        {project.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-black/25 backdrop-blur-xs px-3.5 py-1 text-[10px] sm:text-[11px] font-normal tracking-[0.02em] text-white/95"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function WorksPage({
  hero = {},
  projects = DEFAULT_PROJECTS,
  className = "",
}: WorksPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(
    null
  );
  const mergedHero = { ...DEFAULT_HERO, ...hero };
  const sanitizedPhone = mergedHero.phone.replace(/\s+/g, "");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-hero-reveal", {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.from(".work-card-reveal", {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: "[data-works-grid]",
          start: "top 86%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className={`min-h-screen w-full bg-[#F5F5F4] text-[#111315] pb-20 sm:pb-28 ${className}`}
    >
      {/* Top Editorial Hero (Navbar intentionally omitted) */}
      <header className="mx-auto max-w-360 px-5 sm:px-10 lg:px-14 pt-8 sm:pt-12 pb-12 sm:pb-16">
        {/* Top Wordmark */}
        <div className="work-hero-reveal">
          <a
            href="/"
            className="inline-block text-lg sm:text-xl font-medium tracking-[0.28em] uppercase text-[#111315]"
          >
            {mergedHero.brandText}
          </a>
        </div>

        {/* Main Hero Split Layout */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column: Pill Tag, Display Heading & Proof Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* White Eyebrow Pill */}
            {/* <div className="work-hero-reveal inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 10"
                fill="none"
                className="h-2.5 w-6 stroke-[#111315]"
              >
                <path
                  d="M1 5H22.5M22.5 5L18.5 1.5M22.5 5L18.5 8.5"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs sm:text-[13px] font-normal text-[#18181B]">
                {mergedHero.eyebrowLabel}
              </span>
            </div> */}

            {/* Oversized Headline */}
            <h1 className="work-hero-reveal mt-5 sm:mt-6 text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[8.25rem] font-medium tracking-[-0.035em] leading-[0.98] text-[#18181B]">
              {mergedHero.title}
            </h1>

            {/* Bottom Sub-Row: Mint Pill + Agency Statement */}
            <div className="work-hero-reveal mt-8 sm:mt-11 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-9">
              <span className="inline-flex animate-smooth-float w-fit shrink-0 items-center justify-center rounded-full bg-lime-300 px-7 py-3.5 text-xs sm:text-sm font-medium text-[#111315]">
                {mergedHero.leftBadgeLabel}
              </span>

              <p className="max-w-108 text-xs sm:text-[13.5px] leading-[1.6] text-[#3F3F46]">
                <strong className="font-semibold text-[#111315]">
                  {mergedHero.leadBold}
                </strong>
                {mergedHero.leadBody}
              </p>
            </div>
          </div>

          {/* Right Column: Studio Photo with Floating Mint Pill, Ambient Glow & Contact Links */}
          <div className="work-hero-reveal lg:col-span-5 flex flex-col items-start lg:items-end lg:pt-6">
            <div className="relative w-full max-w-104">
              {/* Soft Mint Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -right-4 h-44 w-44 rounded-full bg-[#7BF1C0]/45 blur-3xl"
              />

              {/* Overlapping Top-Left Mint Pill */}
              <div className="relative animate-smooth-float z-20 -mb-6 sm:-ml-16 inline-flex items-center justify-center rounded-full bg-lime-300 px-7 py-3.5 text-xs sm:text-sm font-medium text-[#111315] shadow-[0_8px_24px_rgba(123,241,192,0.28)]">
                {mergedHero.mediaBadgeLabel}
              </div>

              {/* Rounded Studio Photo Frame */}
              <div className="relative z-10 aspect-16/10 w-full overflow-hidden rounded-2xl bg-[#18181B] shadow-[0_14px_34px_rgba(0,0,0,0.08)]">
                <img
                  src={mergedHero.mediaImageUrl}
                  alt={mergedHero.mediaImageAlt}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Contact Line Aligned Below Image */}
              <div className="mt-5 flex flex-wrap items-center justify-start lg:justify-end gap-4 text-xs sm:text-[13px]">
                <a
                  href={`mailto:${mergedHero.email}`}
                  className="font-semibold text-[#111315] hover:opacity-70 transition-opacity"
                >
                  {mergedHero.email}
                </a>
                <a
                  href={`tel:${sanitizedPhone}`}
                  className="font-normal text-[#3F3F46] hover:text-[#111315] transition-colors"
                >
                  {mergedHero.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Portfolio Bento Grid */}
      <main
        data-works-grid
        className="mx-auto max-w-360 px-5 sm:px-10 lg:px-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {projects.map((project) => (
            <WorkCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </main>

      {/* Full-Screen Single-Page Detail View */}
      <WorkDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}