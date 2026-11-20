"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CapsuleButton from "@/components/ui/Button";
import type { CaseStudy } from "@/data/CaseStudies";

interface TemplateProps {
  caseStudy: CaseStudy;
}

export default function TemplateTwoSplitShowcase({ caseStudy }: TemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative min-h-screen w-full bg-(--bg) text-neutral-900 selection:bg-black selection:text-white">
      {/* Top Bar */}
      <div className="w-full px-6 sm:px-12 lg:px-20 pt-10 pb-6 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200">
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
          <span>All Case Studies</span>
        </Link>

        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          {caseStudy.category} — {caseStudy.year}
        </span>
      </div>

      {/* Asymmetric Split Layout: Sticky Dossier Rail + Visual Narrative */}
      <section className="px-6 sm:px-12 lg:px-20 py-14 lg:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Sticky Dossier */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                Client Dossier • {caseStudy.timeline}
              </span>
              <h1 className="text-4xl sm:text-6xl text-(--primary-clr) font-normal tracking-tight leading-[1.05]">
                {caseStudy.title}
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
                {caseStudy.tagline}
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-200">
              {caseStudy.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-col gap-1"
                >
                  <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                    {metric.value}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Metadata Breakdown */}
            <dl className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-neutral-400">
                  Partner
                </dt>
                <dd className="mt-1 font-medium text-neutral-900">
                  {caseStudy.client}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-neutral-400">
                  Discipline
                </dt>
                <dd className="mt-1 font-medium text-neutral-900">
                  {caseStudy.category}
                </dd>
              </div>
            </dl>
          </aside>

          {/* Right Visual & Narrative Stream */}
          <div className="lg:col-span-7 flex flex-col gap-14">
            <div className="relative w-full aspect-16/10 rounded-3xl overflow-hidden bg-neutral-950 shadow-xl">
              <Image
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col gap-6 text-lg text-neutral-700 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-medium text-neutral-900 tracking-tight">
                Context, Friction & Execution
              </h2>
              <p>{caseStudy.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-6 rounded-2xl bg-neutral-100 border border-neutral-200">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    Challenge
                  </h3>
                  <p className="text-base text-neutral-800 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-neutral-100 border border-neutral-200">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    Solution
                  </h3>
                  <p className="text-base text-neutral-800 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Frames */}
            {caseStudy.gallery.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {caseStudy.gallery.map((item, index) => (
                  <figure key={index} className="flex flex-col gap-3">
                    <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-neutral-900">
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                    {item.caption && (
                      <figcaption className="text-xs text-neutral-500 font-mono">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            {/* Deliverables List */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl sm:text-3xl font-medium text-neutral-900 tracking-tight">
                What Was Delivered
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {caseStudy.deliverables.map((del, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {del.title}
                      </h3>
                      <span className="text-xs font-mono text-neutral-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-base leading-relaxed">
                      {del.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Quote */}
            {caseStudy.quote && (
              <blockquote className="p-8 rounded-3xl bg-[#121212] text-white flex flex-col gap-4">
                <p className="text-xl sm:text-2xl font-normal leading-snug text-lime-200">
                  “{caseStudy.quote.text}”
                </p>
                <footer className="text-sm text-neutral-400">
                  <span className="font-medium text-white">
                    {caseStudy.quote.author}
                  </span>{" "}
                  — {caseStudy.quote.role}
                </footer>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* Process Strip */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-[#121212] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-lime-300 mb-12">
            Execution Phases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.process.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col gap-3"
              >
                <span className="text-sm font-mono text-lime-300">
                  PHASE {step.number}
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

      {/* FAQ Accordion */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight mb-8">
          Questions & Details
        </h2>
        <div className="flex flex-col gap-3">
          {caseStudy.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-neutral-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-medium text-neutral-900">
                    {faq.question}
                  </span>
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-6 pt-3 border-t border-neutral-100 text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-[#121212] text-white text-center rounded-t-[3rem]">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            {caseStudy.cta.heading}
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 max-w-xl">
            {caseStudy.cta.description}
          </p>
          <div className="pt-2">
            <CapsuleButton
              text={caseStudy.cta.buttonText}
              href={caseStudy.cta.href}
            />
          </div>
        </div>
      </section>
    </main>
  );
}