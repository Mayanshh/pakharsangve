"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  INDUSTRY_UPDATES,
  type IndustryUpdateCategory,
  type IndustryUpdateItem,
} from "@/data/Updates";

const CATEGORIES: IndustryUpdateCategory[] = [
  "All",
  "Frontend & Motion",
  "AI & Tooling",
  "Systems & Cloud",
  "Design & Culture",
];

function UpdateMediaFrame({
  media,
  index,
}: {
  media: IndustryUpdateItem["media"];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const showVideo = media.type === "video" && !videoFailed;

  return (
    <figure className="min-w-0 flex flex-col gap-3">
      <div className="relative w-full aspect-16/10 rounded-3xl overflow-hidden bg-[#121212] border border-neutral-800/80 shadow-lg group">
        {showVideo ? (
          <>
            <video
              ref={videoRef}
              src={media.src}
              poster={media.poster}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setVideoFailed(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="px-3.5 py-2 rounded-full bg-neutral-950/85 hover:bg-neutral-950 text-lime-300 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="px-3 py-2 rounded-full bg-neutral-950/85 hover:bg-neutral-950 text-white backdrop-blur-md text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer"
              >
                {isMuted ? "Muted" : "Sound"}
              </button>
            </div>
          </>
        ) : (
          <Image
            src={media.poster ?? media.src}
            alt={media.alt}
            fill
            priority={index < 2}
            sizes="(max-width: 1023px) 100vw, 48vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

        <span className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full bg-neutral-950/80 text-lime-300 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest">
          {showVideo ? "Video Brief" : "Visual Note"}
        </span>
      </div>

      <figcaption className="text-xs font-mono text-neutral-500 leading-relaxed">
        {media.caption}
      </figcaption>
    </figure>
  );
}

export default function UpdatesPage() {
  const [activeCategory, setActiveCategory] =
    useState<IndustryUpdateCategory>("All");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "ind-nov-01": true,
  });

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return INDUSTRY_UPDATES;
    return INDUSTRY_UPDATES.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const toggleDetails = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="min-h-screen w-full max-lg:overflow-x-clip bg-(--bg) text-neutral-900 selection:bg-lime-300 selection:text-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-20 pt-10 sm:pt-16 pb-20 sm:pb-28 flex flex-col gap-12 sm:gap-16">
        {/* TOP NAV & MINIMALIST NOVEMBER 2026 HEADER */}
        <header className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
            <Link
              href="/"
              className="hover:text-neutral-950 transition-colors"
            >
              ← Home
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/learn/free-resources"
                className="hover:text-neutral-950 transition-colors"
              >
                Free Resources
              </Link>
              <span>/</span>
              <Link
                href="/learn"
                className="hover:text-neutral-950 transition-colors"
              >
                Learn
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-300/90 pb-8 sm:pb-10">
            <div className="flex flex-col gap-3 min-w-0">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
                Industry Pulse • November 2026
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-bold tracking-tight leading-[0.9] text-(--primary-clr) break-words">
                Updates
              </h1>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
              Key shifts across frontend engineering, AI workflows, cloud
              delivery, and visual craft this month—with motion reels, stills,
              and notes.
            </p>
          </div>

          {/* CATEGORY FILTER BAR */}
          <div
            role="tablist"
            aria-label="Filter November 2026 industry updates"
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((category) => {
                const selected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                      selected
                        ? "bg-[#121212] text-lime-300"
                        : "bg-white/80 hover:bg-white text-neutral-700 border border-neutral-200"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              Nov 2026 • {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "Dispatch" : "Dispatches"}
            </span>
          </div>
        </header>

        {/* CREATIVE EDITORIAL DISPATCH STREAM */}
        <section
          aria-label="November 2026 industry dispatches"
          className="flex flex-col divide-y divide-neutral-300/90"
        >
          {filteredItems.map((item, idx) => {
            const isExpanded = Boolean(expandedIds[item.id]);
            const mediaFirstOnDesktop = idx % 2 === 1;

            return (
              <article
                key={item.id}
                className="py-12 sm:py-16 first:pt-2 last:pb-2 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* NUMBER + META COLUMN */}
                <div className="lg:col-span-2 min-w-0 flex lg:flex-col items-baseline lg:items-start justify-between gap-2">
                  <span className="text-3xl sm:text-5xl font-mono font-light tracking-tighter text-neutral-400">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex lg:flex-col items-center lg:items-start gap-2.5 text-xs font-mono text-neutral-500">
                    <span>{item.date}</span>
                    <span className="hidden lg:inline text-neutral-400">
                      {item.readTime}
                    </span>
                  </div>
                </div>

                {/* CONTENT + EXPANDABLE DETAILS */}
                <div
                  className={`lg:col-span-5 min-w-0 flex flex-col gap-4 ${
                    mediaFirstOnDesktop ? "lg:order-3" : "lg:order-2"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-950 text-lime-300 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-neutral-500">{item.source}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-normal tracking-tight leading-[1.12] text-neutral-950 break-words">
                    {item.title}
                  </h2>

                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                    {item.headlineNote}
                  </p>

                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {item.excerpt}
                  </p>

                  {/* TAKEAWAY PILLS */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.keyTakeaways.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs px-3 py-1.5 rounded-full bg-white/85 border border-neutral-200 text-neutral-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* TOGGLE FULL DETAILS */}
                  <div className="pt-2 flex flex-wrap items-center gap-5">
                    <button
                      type="button"
                      onClick={() => toggleDetails(item.id)}
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-950 hover:underline cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Details" : "Read Details"}</span>
                      <span className="text-base leading-none">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>

                    {item.externalUrl && (
                      <Link
                        href={item.externalUrl}
                        className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-neutral-950 transition-colors"
                      >
                        Related Resource →
                      </Link>
                    )}
                  </div>

                  {/* FULL DETAILS PANEL */}
                  {isExpanded && (
                    <div className="mt-2 p-5 rounded-2xl bg-white border border-neutral-200/90 flex flex-col gap-3">
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                        Detailed Notes
                      </span>
                      {item.details.map((paragraph, dIdx) => (
                        <p
                          key={dIdx}
                          className="text-sm text-neutral-700 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* IMAGE / VIDEO FRAME (ALTERNATING SIDE ON DESKTOP FOR RHYTHM) */}
                <div
                  className={`lg:col-span-5 min-w-0 ${
                    mediaFirstOnDesktop ? "lg:order-2" : "lg:order-3"
                  }`}
                >
                  <UpdateMediaFrame media={item.media} index={idx} />
                </div>
              </article>
            );
          })}
        </section>

        {/* MINIMALIST BOTTOM STRIP */}
        <footer className="rounded-4xl bg-[#121212] text-white border border-neutral-800 p-7 sm:p-11 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5 min-w-0">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-lime-300">
              November 2026 Edition
            </span>
            <p className="text-lg sm:text-2xl font-normal tracking-tight">
              Want hands-on templates and checklists from these workflows?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/learn/free-resources"
              className="px-6 py-3.5 rounded-full bg-lime-300 hover:bg-lime-400 text-neutral-950 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              Free Resources →
            </Link>
            <Link
              href="/learn"
              className="px-6 py-3.5 rounded-full border border-neutral-700 hover:border-neutral-500 text-white text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              All Courses
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}