"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CapsuleButton from "@/components/ui/Button";
import {
  FREE_RESOURCES,
  type FreeResourceCategory,
} from "@/data/FreeResources";

import { FloatingVideo } from "@/components/ui/FloatingVideo";

const CATEGORIES: FreeResourceCategory[] = [
  "All",
  "Starter Kits",
  "Checklists",
  "Guides",
  "Templates",
];

export default function FreeResourcesPage() {
  const [activeCategory, setActiveCategory] =
    useState<FreeResourceCategory>("All");

  const featuredResource = useMemo(
    () => FREE_RESOURCES.find((item) => item.featured) ?? FREE_RESOURCES[0],
    []
  );

  const filteredResources = useMemo(() => {
    if (activeCategory === "All") return FREE_RESOURCES;
    return FREE_RESOURCES.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const showFeatured =
    Boolean(featuredResource) && activeCategory === "All";

  return (
    <main className="min-h-screen w-full max-lg:overflow-x-clip bg-(--bg) text-neutral-900 selection:bg-lime-300 selection:text-black">
      <FloatingVideo
        src="/videos/p3.mp4"
        poster="/images/img1.jpg"
        title="Watch our story"
        position="bottom-left"
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-20 pt-10 sm:pt-16 pb-16 sm:pb-24 flex flex-col gap-10 sm:gap-18">
        {/* 1. EDITORIAL HEADER */}
        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-neutral-500 hover:text-black transition-colors w-fit"
            >
              ← Back to Learn & Resources
            </Link>

            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-800 transition-colors"
            >
              Paid Courses & Kits →
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8">
            <div className="flex flex-col gap-4 max-w-3xl min-w-0">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
                Open Access Library
              </span>
              <h1 className="text-5xl mt-2 sm:text-7xl lg:text-[6.5rem] text-(--primary-clr) font-bold tracking-tight leading-[0.95] lg:leading-[0.85] break-words">
                Free Resources
              </h1>
            </div>

            <p className="text-base sm:text-lg text-neutral-600 max-w-md leading-relaxed">
              Starter repos, launch checklists, wireframes, and studio notes you
              can open and use right away.
            </p>
          </div>
        </header>

        {/* 2. FEATURED FLAGSHIP SPOTLIGHT */}
        {showFeatured && featuredResource && (
          <Link
            href={`/learn/free-resources/${featuredResource.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 rounded-4xl bg-[#121212] text-white border border-neutral-800 hover:border-neutral-600 overflow-hidden shadow-2xl transition-all duration-500"
          >
            <div className="relative lg:col-span-6 aspect-16/10 lg:aspect-auto min-h-56 sm:min-h-96 bg-neutral-950 overflow-hidden">
              <Image
                src={featuredResource.heroImage}
                alt={featuredResource.title}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {featuredResource.badge && (
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3.5 py-2 lg:px-4.5 lg:py-3 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-lime-300/70 backdrop-blur-md text-neutral-950 shadow-md">
                  {featuredResource.badge}
                </span>
              )}
            </div>

            <div className="lg:col-span-6 min-w-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono uppercase tracking-widest text-neutral-400">
                  <span className="text-lime-300">
                    {featuredResource.category}
                  </span>
                  <span>•</span>
                  <span>{featuredResource.deliveryFormat}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-normal tracking-tight leading-tight text-white break-words">
                  {featuredResource.title}
                </h2>

                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                  {featuredResource.subtitle}
                </p>

                <ul className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-neutral-300">
                  {featuredResource.highlights.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime-300 shrink-0" />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                    {featuredResource.accessLabel}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    {featuredResource.durationOrSize}
                  </span>
                </div>

                <span className="inline-flex items-center justify-center max-sm:w-full gap-2 px-6 py-4 lg:py-5 rounded-full hover:bg-lime-400 bg-lime-300 text-neutral-950 text-xs font-semibold uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-1">
                  Inspect Resource →
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* 3. CATEGORY FILTER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 lg:gap-y-4 border-y border-neutral-200 py-4 sm:py-5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2.5 lg:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950 text-white shadow-sm"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-950"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Showing {filteredResources.length}{" "}
            {filteredResources.length === 1 ? "Resource" : "Resources"}
          </span>
        </div>

        {/* 4. FREE RESOURCES GRID */}
        <section
          aria-label="Free resources catalog"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredResources.map((resource, idx) => (
            <Link
              key={resource.slug}
              href={`/learn/free-resources/${resource.slug}`}
              className="group min-w-0 rounded-4xl bg-white border border-neutral-200/90 hover:border-neutral-400 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div>
                <div className="relative w-full aspect-16/10 bg-neutral-950 overflow-hidden">
                  <Image
                    src={resource.heroImage}
                    alt={resource.title}
                    fill
                    priority={!showFeatured && idx < 3}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 right-3 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between gap-2">
                    <span className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/60 text-black backdrop-blur-md">
                      {resource.category}
                    </span>
                    {resource.badge && (
                      <span className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-lime-300/60 backdrop-blur-md text-neutral-950">
                        {resource.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 sm:p-7 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3 text-xs font-mono text-neutral-500">
                    <span>{resource.level}</span>
                    <span>{resource.durationOrSize}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-medium text-neutral-950 tracking-tight leading-snug break-words">
                    {resource.title}
                  </h2>

                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                    {resource.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-7 pb-5 sm:pb-7 pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                <span className="text-2xl font-semibold tracking-tight text-neutral-950">
                  {resource.accessLabel}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-900 group-hover:underline">
                  View Details
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>

      {/* 5. BOTTOM BANNER */}
      <section className="py-16 sm:py-24 px-5 sm:px-12 lg:px-20 bg-(--bg) text-neutral-800 text-left rounded-t-[3rem] lg:rounded-t-[4rem]">
        <div className="max-w-8xl flex flex-col items-start gap-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-(--primary-clr)">
            Full Systems & Coaching
          </span>
          <h2 className="text-4xl uppercase lg:mt-8 max-w-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-none break-words">
            Ready for production templates or 1:1 guidance?
          </h2>
          <div className="flex flex-col items-start gap-6 w-full lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:w-6xl lg:mt-12">
            <p className="text-base sm:text-lg text-left text-neutral-700 max-w-xl">
              Explore full Next.js & Figma systems, structured courses, or
              mentorship over on the main Learn hub.
            </p>
            <div>
              <CapsuleButton text="Explore All Resources" href="/learn" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}