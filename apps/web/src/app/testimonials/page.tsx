"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  TESTIMONIALS,
  getTestimonialsByTrack,
  getTrackTags,
  type Testimonial,
  type TestimonialTrack,
} from "@/data/Testimonials";

const FALLBACK_IMAGE = "/images/img1.jpg";

function SafeImage({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      onError={() => {
        if (imgSrc !== FALLBACK_IMAGE) {
          setImgSrc(FALLBACK_IMAGE);
        }
      }}
      className={className}
    />
  );
}

export default function TestimonialsPage() {
  const [activeTrack, setActiveTrack] = useState<TestimonialTrack>("growth");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleTrackChange = (nextTrack: TestimonialTrack) => {
    setActiveTrack(nextTrack);
    setSelectedTag("All");
    setExpandedId(null);
  };

  const trackItems = useMemo(
    () => getTestimonialsByTrack(activeTrack),
    [activeTrack]
  );

  const availableTags = useMemo(
    () => getTrackTags(activeTrack),
    [activeTrack]
  );

  const filteredItems = useMemo(() => {
    if (selectedTag === "All") return trackItems;
    return trackItems.filter((item) => item.tag === selectedTag);
  }, [trackItems, selectedTag]);

  const featuredItem: Testimonial | undefined = useMemo(() => {
    if (selectedTag === "All") {
      return trackItems.find((item) => item.featured) ?? trackItems[0];
    }
    return undefined;
  }, [trackItems, selectedTag]);

  const gridItems = useMemo(() => {
    if (!featuredItem) return filteredItems;
    return filteredItems.filter((item) => item.id !== featuredItem.id);
  }, [filteredItems, featuredItem]);

  const trackSummary = useMemo(() => {
    const growthCount = TESTIMONIALS.filter((t) => t.track === "growth").length;
    const mentorshipCount = TESTIMONIALS.filter(
      (t) => t.track === "mentorship"
    ).length;
    return { growthCount, mentorshipCount };
  }, []);

  return (
    <main className="min-h-screen w-full max-lg:overflow-x-clip bg-(--bg) text-neutral-900 selection:bg-black selection:text-white">
      {/* 1. HEADER & SEGMENTED TRACK TOGGLE */}
      <section className="px-5 sm:px-12 lg:px-20 pt-24 sm:pt-32 pb-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-10">
          <div className="flex flex-col gap-4 max-w-3xl min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-neutral-500 hover:text-black transition-colors w-fit"
            >
              ← Back to Home
            </Link>
            <h1 className="text-5xl sm:text-7xl lg:text-[6.25rem] text-(--primary-clr) font-semibold tracking-tighter leading-[0.98] break-words">
              Proof in Practice
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed">
              {activeTrack === "growth"
                ? "Measurable outcomes from founders and teams we partnered with to scale conversion, speed, and organic demand."
                : "Results from designers, developers, and independent builders sharpening their craft, pricing, and client systems."}
            </p>
          </div>

          {/* Track Switcher */}
          <div
            role="tablist"
            aria-label="Testimonial track"
            className="inline-flex items-center p-1.5 rounded-full bg-white border border-neutral-200/90 shadow-sm w-fit self-start lg:self-end shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTrack === "growth"}
              onClick={() => handleTrackChange("growth")}
              className={`rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activeTrack === "growth"
                  ? "bg-[#121212] text-lime-300 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              Growth ({trackSummary.growthCount})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTrack === "mentorship"}
              onClick={() => handleTrackChange("mentorship")}
              className={`rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activeTrack === "mentorship"
                  ? "bg-[#121212] text-lime-300 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              Mentorship ({trackSummary.mentorshipCount})
            </button>
          </div>
        </div>

        {/* Dynamic Tag Filter Strip + Live Count */}
        <div className="mt-8 pt-6 border-t border-neutral-200/90 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950 text-white"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-950"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Showing {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "Story" : "Stories"}
          </span>
        </div>
      </section>

      {/* 2. FEATURED SPOTLIGHT CARD */}
      {featuredItem && (
        <section className="px-5 sm:px-12 lg:px-20 pb-10 sm:pb-12 max-w-7xl mx-auto">
          <article className="rounded-4xl bg-[#121212] text-white border border-neutral-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            <div className="relative lg:col-span-5 aspect-4/3 lg:aspect-auto min-h-72 bg-neutral-950 overflow-hidden">
              <SafeImage
                src={featuredItem.showcaseImage}
                alt={`${featuredItem.company} showcase`}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/15">
                  {featuredItem.tag}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-lime-300 text-neutral-950 font-semibold">
                  {featuredItem.timeframe}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-between gap-8 sm:gap-10">
              <div className="flex flex-col gap-5 sm:gap-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-lime-300">
                    {featuredItem.metricValue}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {featuredItem.metricLabel}
                  </span>
                </div>

                <blockquote className="text-xl sm:text-3xl lg:text-[2.1rem] font-normal tracking-tight leading-snug text-neutral-100 break-words">
                  “{featuredItem.quote}”
                </blockquote>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {featuredItem.outcomeSummary}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0">
                    <SafeImage
                      src={featuredItem.avatar}
                      alt={featuredItem.name}
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-medium text-white truncate">
                      {featuredItem.name}
                    </p>
                    <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 truncate">
                      {featuredItem.role} · {featuredItem.company} ·{" "}
                      {featuredItem.location}
                    </p>
                  </div>
                </div>

                <Sparkles className="h-5 w-5 text-lime-300/80 hidden sm:block shrink-0" />
              </div>
            </div>
          </article>
        </section>
      )}

      {/* 3. RESPONSIVE EDITORIAL GRID */}
      <section className="px-5 sm:px-12 lg:px-20 pb-20 sm:pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <article
                key={item.id}
                className="group min-w-0 rounded-3xl bg-white border border-neutral-200/90 hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
                    <SafeImage
                      src={item.showcaseImage}
                      alt={`${item.company} visual`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-3.5 left-3.5 px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/85 backdrop-blur-md text-neutral-900">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col gap-4">
                    <div className="flex items-baseline justify-between gap-2 pb-4 border-b border-neutral-100">
                      <span className="text-3xl font-semibold tracking-tight text-neutral-950">
                        {item.metricValue}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 text-right">
                        {item.metricLabel}
                      </span>
                    </div>

                    <p className="text-base text-neutral-700 leading-relaxed break-words">
                      “{item.quote}”
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : item.id)
                      }
                      aria-expanded={isExpanded}
                      className="w-fit text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
                    >
                      {isExpanded ? "− Hide Scope" : "+ Scope & Timeline"}
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 rounded-2xl bg-neutral-100/90 border border-neutral-200/80 text-xs text-neutral-700 leading-relaxed flex flex-col gap-1">
                        <span className="font-mono uppercase tracking-wider text-neutral-500">
                          {item.timeframe}
                        </span>
                        <p>{item.outcomeSummary}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 flex items-center gap-3.5">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                    <SafeImage
                      src={item.avatar}
                      alt={item.name}
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-950 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. NEXT-STEP STRIP */}
      <section className="px-5 sm:px-12 lg:px-20 pb-20 max-w-7xl mx-auto">
        <div className="rounded-4xl bg-white border border-neutral-200 p-7 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-400">
              {activeTrack === "growth" ? "Partner With Us" : "Learn With Us"}
            </p>
            <h2 className="mt-2 text-2xl sm:text-4xl font-medium tracking-tight text-neutral-950 break-words">
              {activeTrack === "growth"
                ? "Ready to build your next growth chapter?"
                : "Want direct feedback on your craft or agency?"}
            </h2>
          </div>

          <Link
            href={activeTrack === "growth" ? "/#contact" : "/learn"}
            className="inline-flex items-center gap-2.5 rounded-full bg-(--primary-clr) hover:bg-black hover:text-(--primary-clr) px-7 py-4 text-sm font-medium text-zinc-900 transition-colors duration-200 w-fit shrink-0"
          >
            <span>
              {activeTrack === "growth" ? "Start a Project" : "Explore Playbooks"}
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}