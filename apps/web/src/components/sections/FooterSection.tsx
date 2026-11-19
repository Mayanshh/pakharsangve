"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CapsuleButton from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface InlineServiceLink {
  label: string;
  href: string;
}

export interface FooterNavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  links: FooterNavLink[];
}

export interface FooterConfig {
  introPrefix?: string;
  introMiddle?: string;
  serviceLinks?: InlineServiceLink[];
  displayHeading?: string;
  email?: string;
  phone?: string;
  address?: string;
  ctaLabel?: string;
  ctaHref?: string;
  columns?: FooterColumn[];
  brandMarkText?: string;
  brandLogoUrl?: string;
  legalMeta?: string;
}

export interface FooterSectionProps {
  config?: FooterConfig;
  className?: string;
}

const DEFAULT_FOOTER_CONFIG: Required<FooterConfig> = {
  introPrefix: "Pakharsangve is a Indian based digital marketing agency helping brands grow with",
  introMiddle: "smart, results-focused",
  serviceLinks: [
    { label: "Branding", href: "#services-branding" },
    { label: "Web Design", href: "#services-web-design" },
    { label: "SEO", href: "#services-seo" },
    { label: "PPC", href: "#services-ppc" },
    { label: "Video", href: "#services-video" },
  ],
  displayHeading: "Get in Touch",
  email: "hello@pakharsangve.com",
  phone: "0161 660 6263",
  address: "1 St Peter's Sq, Manchester, M2 3DE",
  ctaLabel: "Contact",
  ctaHref: "#contact",
  columns: [
    {
      id: "col-1",
      links: [
        { label: "Services", href: "#services" },
        { label: "Work", href: "#work" },
      ],
    },
    {
      id: "col-2",
      links: [
        { label: "About", href: "#about" },
        { label: "Culture", href: "#culture" },
      ],
    },
    {
      id: "col-3",
      links: [
        { label: "Blog", href: "#blog" },
        { label: "Testimonials", href: "#testimonials" },
      ],
    },
    {
      id: "col-4",
      links: [
        { label: "Privacy Policy", href: "#privacy-policy" },
        { label: "Terms & Conditions", href: "#terms-and-conditions" },
      ],
    },
  ],
  brandMarkText: "PAKHARSANGVE",
  brandLogoUrl: "",
  legalMeta: "Reg No. 11701108. Vat No. 371580590.",
};

function renderServiceSentence(
  prefix: string,
  middle: string,
  links: InlineServiceLink[]
) {
  return (
    <>
      {prefix} {middle}{" "}
      {links.map((item, idx) => {
        const isLast = idx === links.length - 1;
        const isSecondLast = idx === links.length - 2;

        return (
          <React.Fragment key={item.label}>
            <a
              href={item.href}
              className="underline underline-offset-4 decoration-white/80 hover:text-lime-300 hover:decoration-lime-600 transition-colors duration-200"
            >
              {item.label}
            </a>
            {!isLast && !isSecondLast && ", "}
            {isSecondLast && ", and "}
          </React.Fragment>
        );
      })}
      .
    </>
  );
}

export default function FooterSection({
  config = {},
  className = "",
}: FooterSectionProps) {
  const footerRef = useRef<HTMLElement>(null);
  const merged = {
    ...DEFAULT_FOOTER_CONFIG,
    ...config,
    serviceLinks: config.serviceLinks ?? DEFAULT_FOOTER_CONFIG.serviceLinks,
    columns: config.columns ?? DEFAULT_FOOTER_CONFIG.columns,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ft-reveal", {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 86%",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const sanitizedPhone = merged.phone.replace(/\s+/g, "");

  return (
    <footer
      ref={footerRef}
      className={`w-full bg-[#050606] text-white pt-14 sm:pt-20 pb-10 sm:pb-12 overflow-hidden ${className}`}
    >
      <div className="mx-auto max-w-350 px-5 sm:px-10 lg:px-14">
        {/* Top Centered Agency Statement */}
        <div className="ft-reveal mx-auto max-w-150 text-center">
          <p className="text-xs sm:text-sm lg:text-[15px] leading-[1.65] tracking-[-0.01em] text-white/95">
            {renderServiceSentence(
              merged.introPrefix,
              merged.introMiddle,
              merged.serviceLinks
            )}
          </p>
        </div>

        {/* Monumental Display CTA Title */}
        <div className="ft-reveal mt-8 sm:mt-10 text-center">
          <a
            href={merged.ctaHref}
            className="group inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 rounded-lg"
          >
            <h2 className="text-[3.5rem] sm:text-[6.25rem] md:text-[8.25rem] lg:text-[10.5rem] xl:text-[12rem] font-medium leading-[0.95] tracking-[-0.04em] text-white group-hover:text-white/95 transition-colors">
              {merged.displayHeading}
            </h2>
          </a>
        </div>

        {/* Contact Details Strip & Mint Pill Button */}
        <div className="ft-reveal mt-8 sm:mt-10 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/95">
            <a
              href={`mailto:${merged.email}`}
              className="underline underline-offset-4 decoration-white/75 hover:text-lime-300 hover:decoration-lime-400 transition-colors"
            >
              {merged.email}
            </a>
            <a
              href={`tel:${sanitizedPhone}`}
              className="underline underline-offset-4 decoration-white/75 hover:text-lime-300 hover:decoration-lime-400 transition-colors"
            >
              {merged.phone}
            </a>
            <span className="text-white/90">{merged.address}</span>
          </div>

          <div className="mt-6 sm:mt-12">
            <CapsuleButton text="Contact us" href="/contact"  />
          </div>
        </div>

        {/* 4-Column Navigation Links with Mint Arrows */}
        <nav
          aria-label="Footer navigation"
          className="ft-reveal mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8"
        >
          {merged.columns.map((col) => (
            <ul key={col.id} className="flex flex-col gap-3 sm:gap-3.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 text-sm sm:text-[15px] font-normal text-white/90 hover:text-white transition-colors duration-200"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 12"
                      fill="none"
                      className="h-3 w-4 shrink-0 text-lime-300 stroke-current transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M1 6H14.5M14.5 6L10.5 2M14.5 6L10.5 10"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        {/* Bottom Brand Mark & Legal Registration Strip */}
        <div className="ft-reveal mt-16 sm:mt-20 pt-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            {merged.brandLogoUrl ? (
              <img
                src={merged.brandLogoUrl}
                alt={`${merged.brandMarkText} logo`}
                className="h-5 sm:h-6 w-auto object-contain"
              />
            ) : (
              <span className="block text-base sm:text-lg font-medium tracking-[0.28em] uppercase text-white leading-none">
                {merged.brandMarkText}
              </span>
            )}
          </div>

          <p className="text-[11px] sm:text-xs text-white/75 tracking-[-0.01em]">
            {merged.legalMeta}
          </p>
        </div>
      </div>
    </footer>
  );
}