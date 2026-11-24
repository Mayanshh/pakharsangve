"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/data/CaseStudies";

interface TemplateProps {
  caseStudy: CaseStudy;
}

export default function TemplateOneEditorial({ caseStudy }: TemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const otherCaseStudies = CASE_STUDIES.filter(
    (item) => item.slug !== caseStudy.slug
  ).slice(0, 3);

  return (
    <main className="relative min-h-screen w-full bg-(--bg) text-neutral-900 selection:bg-black selection:text-white">
      {/* 1. TOP NAVIGATION / BACK BAR */}
      <div className="w-full px-6 sm:px-12 lg:px-20 pt-10 pb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-neutral-600 hover:text-black transition-colors"
        >
          <svg
            className="w-5 h-4 transition-transform duration-300 group-hover:-translate-x-1.5"
            viewBox="0 0 24 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 8H5M12 15l-7-7 7-7"
            />
          </svg>
          <span>Back to Case Studies</span>
        </Link>

        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <span>{caseStudy.client}</span>
          <span>•</span>
          <span>{caseStudy.year}</span>
        </div>
      </div>

      {/* 2. EDITORIAL HERO SECTION */}
      <section className="px-6 sm:px-12 lg:px-20 pt-6 pb-20">
        <div className="flex flex-col gap-6 max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            {caseStudy.category}
          </span>

          <h1 className="text-5xl sm:text-7xl lg:text-[7rem] text-(--primary-clr) font-normal tracking-tight leading-[1.05]">
            {caseStudy.title}
          </h1>

          <p className="text-xl sm:text-3xl text-neutral-600 font-normal leading-snug max-w-4xl">
            {caseStudy.tagline}
          </p>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative mt-14 w-full aspect-21/9 min-h-80 sm:min-h-125 rounded-3xl lg:rounded-xl overflow-hidden bg-neutral-950 isolate shadow-2xl">
          <div
            className="absolute inset-0 z-10 mix-blend-multiply opacity-35 pointer-events-none"
            style={
              caseStudy.accentColor
                ? { backgroundColor: caseStudy.accentColor }
                : undefined
            }
          />
          <Image
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>
      </section>

      {/* 3. IMPACT METRICS BAR */}
      <section className="w-full border-y border-neutral-300 py-14 px-6 sm:px-12 lg:px-20 bg-neutral-100/70">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {caseStudy.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-4xl sm:text-6xl font-semibold tracking-tight text-neutral-900">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-neutral-500">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEEP DIVE NARRATIVE & MANIFESTO */}
      <section className="py-24 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-4">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
              The Case & Approach
            </h2>
            <p className="text-3xl sm:text-4xl font-normal leading-tight text-neutral-900">
              Engineered for measurable clarity and lasting brand distinction.
            </p>
            <div className="pt-2 flex flex-wrap gap-6 text-sm text-neutral-600">
              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-400">
                  Timeline
                </span>
                <span className="font-medium text-neutral-900">
                  {caseStudy.timeline}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-400">
                  Client
                </span>
                <span className="font-medium text-neutral-900">
                  {caseStudy.client}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-lg sm:text-xl text-neutral-700 leading-relaxed font-normal">
            <p>{caseStudy.summary}</p>
            <p>
              <strong className="font-semibold text-neutral-900">
                The Challenge:{" "}
              </strong>
              {caseStudy.challenge}
            </p>
            <p>
              <strong className="font-semibold text-neutral-900">
                The Solution:{" "}
              </strong>
              {caseStudy.solution}
            </p>
          </div>
        </div>
      </section>

      {/* 5. CORE DELIVERABLES GRID */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 bg-[#121212] text-white rounded-t-[3rem] lg:rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
                Scope of Work
              </span>
              <h2 className="mt-3 text-4xl sm:text-6xl font-normal text-lime-300 tracking-tight">
                Core Deliverables
              </h2>
            </div>
            <p className="text-neutral-400 max-w-md text-base sm:text-lg">
              Purpose-built assets and systems crafted to elevate every user touchpoint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudy.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="group p-8 sm:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between gap-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-neutral-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STEP-BY-STEP PROCESS TIMELINE */}
      <section className="py-24 sm:py-28 px-6 sm:px-12 lg:px-20 bg-neutral-950 text-white border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
              Methodology
            </span>
            <h2 className="mt-3 text-4xl sm:text-6xl font-normal tracking-tight">
              How We Executed
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudy.process.map((step) => (
              <div
                key={step.number}
                className="flex flex-col gap-6 p-8 rounded-2xl bg-neutral-900/70 border border-neutral-800/90"
              >
                <span className="text-5xl font-light text-lime-300 font-mono">
                  {step.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto text-neutral-900">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-500">
            Clarity & Guidance
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-normal tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {caseStudy.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-neutral-300 transition-all duration-300 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900">
                    {faq.question}
                  </h3>
                  <span
                    className={`text-2xl leading-none text-neutral-700 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 sm:px-8 pb-6 sm:pb-8 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal pt-4 border-t border-neutral-100">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. OTHER CASE STUDIES */}
      {otherCaseStudies.length > 0 && (
        <section className="py-24 px-6 sm:px-12 lg:px-20 bg-[#121212] text-white rounded-t-[3rem] lg:rounded-t-[4rem]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-lime-300 mb-14">
              Explore other case studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherCaseStudies.map((item) => (
                <Link
                  key={item.slug}
                  href={`/case-studies/${item.slug}`}
                  className="group flex flex-col gap-5"
                >
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-900">
                    <Image
                      src={item.heroImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                  <p className="text-sm text-neutral-400">
                    {item.category} · {item.year}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}