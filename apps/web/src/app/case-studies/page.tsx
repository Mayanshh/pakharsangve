import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/data/CaseStudies";

interface BentoPattern {
  span: string;
  aspect: string;
  variant: "light" | "dark" | "accent";
}

const BENTO_PATTERNS: BentoPattern[] = [
  { span: "md:col-span-7 lg:col-span-7", aspect: "aspect-16/10", variant: "dark" },
  { span: "md:col-span-5 lg:col-span-5", aspect: "aspect-4/3", variant: "light" },
  { span: "md:col-span-4 lg:col-span-4", aspect: "aspect-4/3", variant: "light" },
  { span: "md:col-span-8 lg:col-span-8", aspect: "aspect-21/10", variant: "accent" },
  { span: "md:col-span-6 lg:col-span-5", aspect: "aspect-4/3", variant: "dark" },
  { span: "md:col-span-6 lg:col-span-7", aspect: "aspect-16/9", variant: "light" },
  { span: "md:col-span-8 lg:col-span-8", aspect: "aspect-21/10", variant: "light" },
  { span: "md:col-span-4 lg:col-span-4", aspect: "aspect-4/3", variant: "dark" },
];

function BentoCard({
  study,
  pattern,
  index,
}: {
  study: CaseStudy;
  pattern: BentoPattern;
  index: number;
}) {
  const isDark = pattern.variant === "dark";
  const isAccent = pattern.variant === "accent";
  const primaryMetric = study.metrics[0];

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`${pattern.span} group relative rounded-4xl overflow-hidden border transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between ${
        isDark
          ? "bg-[#121212] text-white border-neutral-800 hover:border-neutral-600 shadow-xl"
          : isAccent
          ? "bg-neutral-900 text-white border-neutral-800 hover:border-lime-300/60 shadow-xl"
          : "bg-white text-neutral-900 border-neutral-200/90 hover:border-neutral-400 shadow-sm hover:shadow-xl"
      }`}
    >
      {/* Media Container */}
      <div className={`relative w-full ${pattern.aspect} overflow-hidden bg-neutral-950`}>
        <Image
          src={study.heroImage}
          alt={study.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark || isAccent
              ? "bg-linear-to-t from-black/75 via-black/20 to-transparent"
              : "bg-linear-to-t from-black/45 via-transparent to-transparent opacity-70 group-hover:opacity-90"
          }`}
        />

        {/* Top Floating Pills */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
          <span className="px-5 py-4 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/50 backdrop-blur-md text-black border border-white/15">
            {String(index + 1).padStart(2, "0")} • {study.category}
          </span>

          {primaryMetric && (
            <span className="px-5 py-4 rounded-full text-xs font-semibold tracking-tight bg-lime-300/60 backdrop-blur-md text-neutral-950 shadow-md">
              {primaryMetric.value} {primaryMetric.label}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-5">
        <div className="flex flex-col gap-2.5">


          <h2
            className={`text-2xl max-w-5xl h-fit sm:text-5xl font-medium tracking-tighter leading-tighter ${
              isDark || isAccent ? "text-white" : "text-neutral-900"
            }`}
          >
            {study.title}
          </h2>


            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest opacity-65">
            <span>{study.client}</span>
            <span>{study.year}</span>
          </div>
                    <p
            className={`text-sm mt-5 sm:text-base leading-relaxed line-clamp-2 ${
              isDark || isAccent ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            {study.tagline}
          </p>
        </div>

        <div
          className={`pt-4 border-t flex items-center justify-between text-xs font-semibold uppercase tracking-widest ${
            isDark || isAccent
              ? "border-neutral-800 text-lime-300"
              : "border-neutral-100 text-neutral-900"
          }`}
        >
          <span>Explore Case Study</span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CaseStudiesIndexPage() {
  return (
    <main className="min-h-screen w-full bg-(--bg) text-neutral-900 px-6 sm:px-12 lg:px-20 py-14 sm:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 sm:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-neutral-500 hover:text-black transition-colors w-fit"
            >
              ← Back to Home
            </Link>
            <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] text-(--primary-clr) font-semibold tracking-tighter leading-none">
              Selected Case Studies
            </h1>
          </div>

          <p className="text-base sm:text-lg text-neutral-600 max-w-md leading-relaxed">
            Fourteen commercial transformations across commerce, spatial design,
            enterprise platforms, and brand systems—each engineered for clarity and measurable growth.
          </p>
        </div>

        {/* Asymmetric 12-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-flow-dense gap-6 sm:gap-8">
          {CASE_STUDIES.map((study, index) => {
            const pattern = BENTO_PATTERNS[index % BENTO_PATTERNS.length];
            return (
              <BentoCard
                key={study.slug}
                study={study}
                pattern={pattern}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}