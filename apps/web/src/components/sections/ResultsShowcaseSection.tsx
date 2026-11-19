"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface MobileMockupItem {
  id: string;
  imageUrl: string;
  imageAlt: string;
  /** 'left' | 'center' | 'right' */
  slot: "left" | "center" | "right";
}

export interface TestimonialData {
  quote: string;
  author: string;
  company: string;
}

export interface CaseStudyData {
  id: string;
  brandName: string;
  brandLogoUrl?: string;
  metricValue: string;
  metricLabel: string;
  summary: string;
  ctaLabel?: string;
  ctaHref: string;
  testimonial: TestimonialData;
  mockups: MobileMockupItem[];
}

export interface ResultsShowcaseProps {
  sectionTitle?: string;
  caseStudy?: CaseStudyData;
  className?: string;
}

const DEFAULT_CASE_STUDY: CaseStudyData = {
  id: "blackbird-case-study",
  brandName: "BLACKBIRD",
  metricValue: "400%",
  metricLabel: "Revenue growth",
  summary:
    "Blackbird, an AIM-listed SaaS developer, achieved 400% revenue growth and $3.9M ARR through brand, web, and inbound marketing, generating 1,000+ MQLs, $1.8M pipeline and 650% growth in web traffic.",
  ctaLabel: "View Work",
  ctaHref: "#work-blackbird",
  testimonial: {
    quote:
      "“We’ve worked with Marino for 5 years. Their digital marketing expertise has consistently driven awareness, interest, and leads.”",
    author: "Adrian Lambert:",
    company: "Blackbird",
  },
  mockups: [
    {
      id: "mock-left",
      slot: "left",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Blackbird mobile workflow screen preview",
    },
    {
      id: "mock-center",
      slot: "center",
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
      imageAlt: "Blackbird plc cloud video technology mobile experience",
    },
    {
      id: "mock-right",
      slot: "right",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
      imageAlt: "Blackbird cloud efficiency mobile comparison screen",
    },
  ],
};

function BrandMark({ brandName, logoUrl }: { brandName: string; logoUrl?: string }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${brandName} logo`}
        className="h-6 w-auto object-contain"
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5 text-[#111315]">
      <svg
        aria-hidden="true"
        viewBox="0 0 28 20"
        fill="currentColor"
        className="h-4 w-6 shrink-0"
      >
        <path d="M26.8 2.2c-2.6 1.2-5.1 2.8-7.4 4.8L12.7 13c-1.8 1.6-3.9 2.9-6.3 3.7L1.2 18.4c2.4-2.8 4.6-6.3 6.5-10.5C9.4 4 11.4 1.6 14.1.8c2.2-.7 4.4-.2 6.3 1.1 2.1.2 4.3.2 6.4.3z" />
      </svg>
      <span className="text-[13px] font-semibold tracking-[0.22em] uppercase">
        {brandName}
      </span>
    </div>
  );
}

function PhoneFrame({
  mockup,
  brandName,
  className = "",
}: {
  mockup: MobileMockupItem;
  brandName: string;
  className?: string;
}) {
  const isCenter = mockup.slot === "center";
  const domainSlug = brandName.toLowerCase().replace(/\s+/g, "");

  return (
    <div
      data-phone-slot={mockup.slot}
      className={`relative shrink-0 rounded-[28px] sm:rounded-[34px] bg-[#090A0C] p-1.5 sm:p-2 shadow-[0_24px_60px_rgba(15,23,42,0.22)] ring-1 ring-black/15 will-change-transform ${className}`}
    >
      {/* Screen Container */}
      <div className="relative h-full w-full overflow-hidden rounded-[22px] sm:rounded-[27px] bg-[#0D0F12] text-white flex flex-col justify-between">
        {/* Background Media */}
        <img
          src={mockup.imageUrl}
          alt={mockup.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
        />

        {/* Dark Readability Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-black/80 via-black/45 to-black/90"
        />

        {/* Top Status & App Bar */}
        <div className="relative z-10 px-3.5 pt-2.5 pb-2">
          <div className="flex items-center justify-between text-[9px] font-medium text-white/85">
            <span>10:33</span>
            <div className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
              <span className="inline-block h-1.5 w-2.5 rounded-xs border border-white/80" />
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[8px] font-semibold tracking-[0.16em] uppercase text-white/95 truncate">
              {brandName}
            </span>

            {isCenter ? (
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-[#F59E0B] px-2 py-0.5 text-[7px] font-semibold uppercase tracking-wider text-black">
                  DEMO
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/35 text-[8px]">
                  ☰
                </span>
              </div>
            ) : (
              <span className="rounded-full bg-[#F59E0B] px-1.5 py-0.5 text-[6.5px] font-semibold uppercase text-black">
                DEMO
              </span>
            )}
          </div>
        </div>

        {/* Center / Bottom UI Overlay */}
        <div className="relative z-10 px-3.5 pb-3.5 pt-6 flex flex-col justify-end">
          {isCenter ? (
            <>
              <p className="text-[11px] sm:text-xs font-medium tracking-tight text-white">
                {brandName} <span className="font-light text-white/75">plc</span>
              </p>
              <p className="mt-2 text-[8.5px] sm:text-[9.5px] leading-[1.35] text-white/80 line-clamp-3">
                Quoted on the London Stock Exchange Alternative Investment Market,
                Blackbird plc is a leader in cloud-native video technology.
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-block rounded-full bg-[#F59E0B] px-2.5 py-1 text-[7px] font-semibold uppercase tracking-wider text-black">
                  LEARN MORE
                </span>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-1.5 text-[7px] text-white/60">
                <span className="truncate">{domainSlug}.video — Private</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/80 border border-white/20 text-white text-[8px]">
                  💬
                </span>
              </div>
            </>
          ) : (
            <>
              <p className="text-[9px] font-medium leading-tight text-white/90">
                {mockup.slot === "left"
                  ? "Create more content, faster, for less"
                  : "Built for the cloud - driving massive efficiencies"}
              </p>
              <span className="mt-2 inline-block w-fit rounded-full bg-[#F59E0B] px-2 py-0.5 text-[6.5px] font-semibold uppercase text-black">
                {mockup.slot === "left" ? "OUR SOLUTION" : "LEARN MORE"}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultsShowcaseSection({
  sectionTitle = "Pakharsangve: The results driven agency",
  caseStudy = DEFAULT_CASE_STUDY,
  className = "",
}: ResultsShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const phonesWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rda-reveal", {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });

      const centerPhone = phonesWrapRef.current?.querySelector(
        '[data-phone-slot="center"]'
      );
      const sidePhones = phonesWrapRef.current?.querySelectorAll(
        '[data-phone-slot="left"], [data-phone-slot="right"]'
      );

      if (centerPhone) {
        gsap.fromTo(
          centerPhone,
          { y: -8 },
          {
            y: -26,
            ease: "none",
            scrollTrigger: {
              trigger: phonesWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      if (sidePhones && sidePhones.length > 0) {
        gsap.fromTo(
          sidePhones,
          { y: 12 },
          {
            y: 28,
            ease: "none",
            scrollTrigger: {
              trigger: phonesWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.id]);

  const leftMockup =
    caseStudy.mockups.find((m) => m.slot === "left") ?? caseStudy.mockups[0];
  const centerMockup =
    caseStudy.mockups.find((m) => m.slot === "center") ?? caseStudy.mockups[1];
  const rightMockup =
    caseStudy.mockups.find((m) => m.slot === "right") ?? caseStudy.mockups[2];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="results-driven-heading"
      className={`w-full bg-(--bg) text-[#111315] py-14 sm:py-20 overflow-hidden ${className}`}
    >
      {/* Top Section Heading */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-10 sm:pb-14 text-center">
        <h2
          id="results-driven-heading"
          className="rda-reveal text-xl sm:text-2xl lg:text-[2.75rem] font-normal tracking-tight text-(--primary-clr)"
        >
          {sectionTitle}
        </h2>
      </div>

      {/* Main White Case Study Container */}
      <div className="mx-auto max-w-345 px-3 sm:px-6 lg:px-8">
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-white px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Metric, Copy, CTA & Testimonial */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="rda-reveal">
                <BrandMark
                  brandName={caseStudy.brandName}
                  logoUrl={caseStudy.brandLogoUrl}
                />
              </div>

              <div className="rda-reveal mt-7 sm:mt-8">
                <div className="text-5xl sm:text-6xl lg:text-[4.25rem] font-normal tracking-[-0.035em] leading-none text-[#111315]">
                  {caseStudy.metricValue}
                </div>
                <p className="mt-2.5 text-2xl sm:text-3xl lg:text-[2.1rem] font-normal tracking-[-0.02em] leading-[1.15] text-[#111315]">
                  {caseStudy.metricLabel}
                </p>
              </div>

              <p className="rda-reveal mt-5 max-w-124 text-sm sm:text-[15px] leading-[1.6] text-[#4B5563]">
                {caseStudy.summary}
              </p>

              {caseStudy.ctaLabel && (
                <div className="rda-reveal mt-6">
                  <a
                    href={caseStudy.ctaHref}
                    className="inline-flex items-center justify-center rounded-full bg-(--primary-clr) hover:bg-orange-400 active:scale-[0.98] px-7 py-3 text-xs sm:text-sm font-medium text-black transition-all duration-200"
                  >
                    {caseStudy.ctaLabel}
                  </a>
                </div>
              )}

              {/* Testimonial Block with Mint Accent Bar */}
              <blockquote className="rda-reveal mt-10 sm:mt-12 relative pl-5 sm:pl-6 max-w-116">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 bottom-1 w-0.75 rounded-full bg-(--primary-clr)"
                />
                <p className="text-lg sm:text-xl lg:text-[1.45rem] font-normal leading-[1.32] tracking-[-0.015em] text-[#111315]">
                  {caseStudy.testimonial.quote}
                </p>
                <footer className="mt-4 text-xs sm:text-sm text-[#374151]">
                  <span>{caseStudy.testimonial.author}</span>{" "}
                  <strong className="font-semibold text-[#111315]">
                    {caseStudy.testimonial.company}
                  </strong>
                </footer>
              </blockquote>
            </div>

            {/* Right Column: Layered Triple Mobile Mockups */}
            <div
              ref={phonesWrapRef}
              className="rda-reveal lg:col-span-6 relative flex items-center justify-center min-h-90 sm:min-h-107.5 lg:min-h-117.5"
            >
              <div className="relative flex items-center justify-center w-full max-w-135">
                {/* Left Flanking Phone */}
                {leftMockup && (
                  <PhoneFrame
                    mockup={leftMockup}
                    brandName={caseStudy.brandName}
                    className="relative z-10 -mr-10 sm:-mr-14 w-33 h-62.5 sm:w-43.75 sm:h-81.25 lg:w-47.5 lg:h-88.75"
                  />
                )}

                {/* Center Elevated Hero Phone */}
                {centerMockup && (
                  <PhoneFrame
                    mockup={centerMockup}
                    brandName={caseStudy.brandName}
                    className="relative z-20 w-41 h-78.75 sm:w-54.5 sm:h-101.25 lg:w-59.5 lg:h-110"
                  />
                )}

                {/* Right Flanking Phone */}
                {rightMockup && (
                  <PhoneFrame
                    mockup={rightMockup}
                    brandName={caseStudy.brandName}
                    className="relative z-10 -ml-10 sm:-ml-14 w-33 h-62.5 sm:w-43.75 sm:h-81.25 lg:w-47.5 lg:h-88.75"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}