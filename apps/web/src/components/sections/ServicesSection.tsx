"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  subItems: string[];
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "branding",
    title: "Branding",
    description: "Distinctive brands built with clarity, character, and lasting commercial impact.",
    subItems: ["Brand Strategy", "Visual Identity", "Guidelines", "Messaging"],
    imageSrc: "/images/img1.jpg",
    imageAlt: "Branding preview",
    href: "/services/branding",
  },
  {
    id: "web-design",
    title: "Web Design",
    description: "Beautifully built websites designed to engage, convert, and perform at scale.",
    subItems: ["UX & UI Design", "Conversion-Focused Design", "Landing Pages", "Website Development"],
    imageSrc: "/images/img2.jpg",
    imageAlt: "Web Design preview",
    href: "/services/web-design",
  },
  {
    id: "seo",
    title: "SEO & Growth",
    description: "Data-driven organic search strategies engineered to capture high-intent traffic.",
    subItems: ["Technical SEO", "Content Architecture", "Keyword Strategy", "Performance Audits"],
    imageSrc: "/images/img3.jpg",
    imageAlt: "SEO preview",
    href: "/services/seo",
  },
  {
    id: "ppc",
    title: "PPC Advertising",
    description: "High-ROI paid acquisition campaigns meticulously managed to maximize profitable scale.",
    subItems: ["Google Ads", "Meta Ads", "Retargeting Funnels", "Conversion Tracking"],
    imageSrc: "/images/img4.jpg",
    imageAlt: "PPC preview",
    href: "/services/ppc",
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>("web-design");

  return (
    <section id="services" className="scroll-mt-5 relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-var(--bg) text-black select-none">
      
      {/* Top Pill Tag Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-neutral-300 bg-white/60 backdrop-blur-md shadow-xs">
          <svg className="w-10 h-3" viewBox="0 0 40 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="0" y1="6" x2="37" y2="6" />
            <polyline points="33 2 38 6 33 10" />
          </svg>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase">Our Services</span>
        </div>
      </div>

      {/* Services List Container */}
      <div className="flex flex-col w-full">
        {SERVICES_DATA.map((service) => {
          const isActive = activeId === service.id;

          return (
            <Link
              id={service.id}
              key={service.id}
              href={service.href}
              onMouseEnter={() => setActiveId(service.id)}
              className="group relative block w-full border-b border-neutral-300 py-10 sm:py-14 transition-colors duration-500 cursor-pointer"
            >
              {/* Row Layout */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
                
                {/* Left Side: Title + Accent Dot */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <h3 className="text-4xl sm:text-6xl lg:text-[5rem] font-normal tracking-tight leading-none text-neutral-900 group-hover:text-black transition-colors">
                    {service.title}
                  </h3>
                  {/* Lavender/Purple Accent Dot */}
                  <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-(--primary-clr) shrink-0 mt-2 lg:mt-4" />
                </div>

                {/* Right Side: Arrow Icon */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-3 text-neutral-900">
                    <span className="text-xs sm:text-sm font-medium uppercase tracking-wider opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                      More Info
                    </span>
                    <svg
                      className="w-14 sm:w-20 h-5 overflow-visible transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3"
                      viewBox="0 0 64 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <line x1="0" y1="8" x2="60" y2="8" />
                      <polyline points="54 2 62 8 54 14" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* ACCORDION EXPANSION: Description + Sub-items + Image */}
              <div
                className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? "grid-rows-[1fr] opacity-100 mt-8 sm:mt-10" : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-2">
                    
                    {/* Left: Thumbnail Preview Image */}
                    <div className="relative w-full sm:w-85 lg:w-95 aspect-16/10 rounded-2xl overflow-hidden bg-neutral-200 shrink-0 shadow-md">
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        sizes="380px"
                        className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    </div>

                    {/* Center/Right: Description & Bullet Sub-Items */}
                    <div className="flex-1 max-w-2xl flex flex-col gap-6">
                      <p className="text-lg sm:text-xl lg:text-2xl text-neutral-700 font-normal leading-relaxed">
                        {service.description}
                      </p>

                      {/* Bulleted Sub-items List */}
                      <div className="flex flex-wrap items-center gap-y-3 gap-x-4 text-sm sm:text-base text-neutral-900 font-medium">
                        {service.subItems.map((sub, idx) => (
                          <div key={sub} className="inline-flex items-center gap-4">
                            <span>{sub}</span>
                            {idx < service.subItems.length - 1 && (
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </Link>
          );
        })}
      </div>

    </section>
  );
}