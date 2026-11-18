"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CapsuleButton from "@/components/ui/Button";

interface Deliverable {
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ServiceDetailProps {
  service: {
    title: string;
    tagline: string;
    description: string;
    heroImage: string;
    accentColor: string;
    metrics: { label: string; value: string }[];
    deliverables: Deliverable[];
    process: ProcessStep[];
    faqs: { question: string; answer: string }[];
  };
}

export default function ServiceDetailView({ service }: ServiceDetailProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative min-h-screen w-full bg-var(--bg) text-neutral-900 selection:bg-black selection:text-white">
      
      {/* 1. TOP NAVIGATION / BACK BAR */}
      <div className="w-full px-6 sm:px-12 lg:px-20 pt-10 pb-6 flex items-center justify-between">
        <Link
          href="/#services"
          className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-neutral-600 hover:text-black transition-colors"
        >
          <svg
            className="w-5 h-4 transition-transform duration-300 group-hover:-translate-x-1.5"
            viewBox="0 0 24 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 8H5M12 15l-7-7 7-7" />
          </svg>
          <span>Back to Services</span>
        </Link>
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
          Service Overview
        </span>
      </div>

      {/* 2. EDITORIAL HERO SECTION */}
      <section className="px-6 sm:px-12 lg:px-20 pt-6 pb-20">
        <div className="flex flex-col gap-8 max-w-5xl">
          <div className="inline-flex items-center gap-3 w-fit px-5 py-2 rounded-full border border-neutral-300 bg-white shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: service.accentColor }} />
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-800">
              Specialized Expertise
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-normal tracking-tight leading-[1.05]">
            {service.title}
          </h1>

          <p className="text-2xl sm:text-3xl text-neutral-700 font-normal leading-relaxed max-w-4xl">
            {service.tagline}
          </p>
        </div>

        {/* Hero Image Showcase with Duotone Accent Effect */}
        <div className="relative mt-16 w-full aspect-21/9 min-h-95 sm:min-h-130 rounded-3xl lg:rounded-[2.5rem] overflow-hidden bg-neutral-950 isolate shadow-2xl">
          <div 
            className="absolute inset-0 z-10 mix-blend-multiply opacity-60 transition-opacity"
            style={{ backgroundColor: service.accentColor }}
          />
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale contrast-125 scale-105"
          />
        </div>
      </section>

      {/* 3. IMPACT METRICS BAR */}
      <section className="w-full border-y border-neutral-300 py-14 px-6 sm:px-12 lg:px-20 bg-neutral-100/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {service.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-4xl sm:text-6xl font-semibold tracking-tight text-neutral-900">
                {metric.value}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEEP DIVE NARRATIVE & MANIFESTO */}
      <section className="py-28 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 sticky top-28">
            <h2 className="text-sm uppercase tracking-[0.25em] font-semibold text-neutral-400">
              The Philosophy
            </h2>
            <p className="mt-4 text-3xl sm:text-4xl font-normal leading-tight text-neutral-900">
              Engineered for absolute market dominance and aesthetic distinction.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-6 text-lg sm:text-xl text-neutral-700 leading-relaxed font-normal">
            <p>{service.description}</p>
            <p>
              We bypass standard industry templates to construct bespoke digital frameworks tailored precisely to your commercial goals. Every asset produced undergoes rigorous testing for performance, clarity, and conversion potential.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CORE DELIVERABLES GRID */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 bg-black text-white rounded-t-[3rem] lg:rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
                Scope of Work
              </span>
              <h2 className="mt-3 text-4xl sm:text-6xl font-normal tracking-tight">
                Core Deliverables
              </h2>
            </div>
            <p className="text-neutral-400 max-w-md text-base sm:text-lg">
              Comprehensive assets and frameworks delivered directly into your production pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.deliverables.map((item, idx) => (
              <div 
                key={idx}
                className="group p-8 sm:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between gap-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-neutral-500">
                    0{idx + 1}
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
      <section className="py-28 px-6 sm:px-12 lg:px-20 bg-neutral-950 text-white border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
              Methodology
            </span>
            <h2 className="mt-3 text-4xl sm:text-6xl font-normal tracking-tight">
              How We Execute
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step) => (
              <div key={step.number} className="flex flex-col gap-6 p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
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
      <section className="py-28 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto bg-var(--bg) text-neutral-900">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-500">
            Clarity & Guidance
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-normal tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-300 cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight">
                    {faq.question}
                  </h3>
                  <span className={`text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </div>
                {isOpen && (
                  <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal pt-4 border-t border-neutral-100">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. BOTTOM CONVERSION CTA BANNER */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 bg-lime-300 text-neutral-950 text-center rounded-t-[3rem] lg:rounded-t-[4rem]">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-none">
            Ready to scale your brand?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-800 max-w-2xl font-normal">
            Let’s discuss your project requirements and build a custom roadmap tailored for your business growth.
          </p>
          <div className="pt-4">
            <CapsuleButton text="Book a Discovery Call" href="/contact" />
          </div>
        </div>
      </section>

    </main>
  );
}