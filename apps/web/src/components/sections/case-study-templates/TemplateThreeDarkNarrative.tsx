"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/data/CaseStudies";

interface TemplateProps {
  caseStudy: CaseStudy;
}

export default function TemplateThreeDarkNarrative({
  caseStudy,
}: TemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const otherCaseStudies = CASE_STUDIES.filter(
    (item) => item.slug !== caseStudy.slug
  ).slice(0, 3);

  return (
    <main className="relative min-h-screen w-full bg-[#121212] text-neutral-100 selection:bg-lime-300 selection:text-black">
      {/* Top Bar */}
      <div className="w-full px-6 sm:px-12 lg:px-20 pt-10 pb-6 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800/80">
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-neutral-400 hover:text-lime-300 transition-colors"
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

        <span className="text-xs font-mono uppercase tracking-widest text-lime-300/90">
          {caseStudy.client} • {caseStudy.year}
        </span>
      </div>

      {/* Full-Bleed Dark Hero */}
      <section className="px-6 sm:px-12 lg:px-20 pt-12 pb-20 max-w-7xl mx-auto">
        <div className="max-w-5xl flex flex-col gap-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            {caseStudy.category}
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-normal tracking-tight leading-[1.03] text-white">
            {caseStudy.title}
          </h1>
          <p className="text-xl sm:text-3xl text-neutral-300 font-normal leading-snug max-w-4xl">
            {caseStudy.tagline}
          </p>
        </div>

        <div className="relative mt-14 w-full aspect-21/9 min-h-80 sm:min-h-125 rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
          {caseStudy.heroVideo ? (
            <video
              src={caseStudy.heroVideo}
              poster={caseStudy.heroImage}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="border-y border-neutral-800 bg-neutral-950 py-14 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {caseStudy.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-4xl sm:text-6xl font-semibold tracking-tight text-lime-300">
                {metric.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-neutral-400">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Chapters */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto flex flex-col gap-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-lime-300">
              01 / Overview
            </span>
            <p className="text-neutral-300 text-base leading-relaxed">
              {caseStudy.summary}
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-lime-300">
              02 / Challenge
            </span>
            <p className="text-neutral-300 text-base leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-lime-300">
              03 / Solution
            </span>
            <p className="text-neutral-300 text-base leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Deliverables */}
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Deliverables & Craft
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col gap-3"
              >
                <span className="text-xs font-mono text-lime-300">
                  0{idx + 1}
                </span>
                <h3 className="text-2xl font-medium text-white">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Execution Flow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.process.map((step) => (
              <div
                key={step.number}
                className="p-7 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col gap-4"
              >
                <span className="text-4xl font-mono text-lime-300">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          {caseStudy.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>
                  <span
                    className={`text-2xl text-lime-300 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-6 pt-3 border-t border-neutral-800 text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Other Case Studies */}
      {otherCaseStudies.length > 0 && (
        <section className="py-24 px-6 sm:px-12 lg:px-20 bg-neutral-950 text-white border-t border-neutral-800 rounded-t-[3rem] lg:rounded-t-[4rem]">
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