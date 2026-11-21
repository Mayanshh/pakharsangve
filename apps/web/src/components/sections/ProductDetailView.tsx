"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DigitalProduct } from "@/data/Products";

interface ProductDetailViewProps {
  product: DigitalProduct;
  relatedProducts: DigitalProduct[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative min-h-screen w-full max-lg:overflow-x-clip bg-(--bg) text-neutral-900 selection:bg-lime-300 selection:text-black">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="w-full px-5 sm:px-12 lg:px-20 pt-6 sm:pt-10 pb-5 sm:pb-6 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/90">
        <Link
          href="/learn"
          className="group inline-flex items-center gap-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-neutral-600 hover:text-black transition-colors"
        >
          <svg
            className="w-5 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1.5"
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
          <span>Back to Learn & Products</span>
        </Link>
      </header>

      {/* 2. ASYMMETRIC SPLIT LAYOUT: STICKY PURCHASE RAIL + SCROLLING DETAILS */}
      <section className="px-5 sm:px-12 lg:px-20 py-8 sm:py-12 lg:py-18 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-start">
          {/* LEFT STICKY PURCHASE & DOSSIER PANEL */}
          <aside className="lg:col-span-5 min-w-0 lg:sticky lg:top-16 flex flex-col gap-6">
            <div className="p-5 sm:p-9 rounded-4xl bg-white border border-neutral-200/90 shadow-xl flex flex-col gap-6">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[0.7rem] uppercase tracking-[1] text-neutral-500">
                  {product.category} &nbsp;  • &nbsp;  {product.level}
                </span>
                {product.badge && (
                  <span className="px-4.5 py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-lime-300 text-neutral-950">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] text-(--primary-clr) font-normal tracking-tight leading-[1.08] break-words">
                  {product.title}
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* Price Block */}
              <div className="p-5 rounded-2xl bg-neutral-100/90 border border-neutral-200/80 flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-950">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-neutral-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-neutral-600">
                  {product.billingNote}
                </span>
              </div>

              {/* Primary & Secondary Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  href={product.checkoutUrl}
                  className="w-full py-4 px-4 sm:px-6 rounded-full bg-[#121212] hover:bg-neutral-800 text-lime-300 font-semibold text-xs sm:text-sm uppercase tracking-widest text-center transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5"
                >
                  <span>
                    {product.category === "Mentorship"
                      ? "Reserve Mentorship Spot"
                      : product.category === "Courses"
                      ? "Enroll Now"
                      : "Get Instant Access"}
                  </span>
                  <span>→</span>
                </Link>

                {product.secondaryCta && (
                  <Link
                    href={product.secondaryCta.href}
                    className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-medium text-xs uppercase tracking-widest text-center transition-colors"
                  >
                    {product.secondaryCta.label}
                  </Link>
                )}
              </div>

              {/* Key Highlights */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Included With Purchase
                </span>
                <ul className="flex flex-col gap-2.5 text-sm text-neutral-700">
                  {product.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-neutral-950 text-lime-300 text-[10px] font-bold shrink-0">
                        ✓
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metadata Grid */}
              <dl className="pt-4 border-t border-neutral-200 grid grid-cols-2 gap-4 text-xs">
                <div className="min-w-0">
                  <dt className="font-mono uppercase tracking-wider text-neutral-400">
                    Format
                  </dt>
                  <dd className="mt-1 font-medium text-neutral-900 break-words">
                    {product.deliveryFormat}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="font-mono uppercase tracking-wider text-neutral-400">
                    Scope
                  </dt>
                  <dd className="mt-1 font-medium text-neutral-900 break-words">
                    {product.durationOrSize}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* RIGHT SCROLLING DETAILS STREAM */}
          <div className="lg:col-span-7 min-w-0 flex flex-col gap-12 sm:gap-16">
            {/* Hero Visual */}
            <div className="relative w-full aspect-16/10 rounded-3xl overflow-hidden bg-neutral-950 shadow-2xl">
              <Image
                src={product.heroImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover object-center"
              />
            </div>

            {/* Overview & Outcomes */}
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-400">
                01 / Overview & Outcomes
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 leading-tight">
                Built for immediate, real-world execution.
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                {product.summary}
              </p>

              <div className="p-5 sm:p-8 rounded-3xl bg-neutral-100 border border-neutral-200 flex flex-col gap-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                  What You Will Achieve
                </h3>
                <ul className="flex flex-col gap-3">
                  {product.outcomes.map((outcome, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-base text-neutral-800 leading-relaxed"
                    >
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-neutral-950 text-lime-300 mt-0.5 shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="min-w-0">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What's Inside / Deliverables */}
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-400">
                02 / Package Breakdown
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950">
                Everything Inside
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {product.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="min-w-0 p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col justify-between gap-4"
                  >
                    <span className="text-xs font-mono text-neutral-400">
                      ITEM 0{idx + 1}
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold text-neutral-950 tracking-tight break-words">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum / Syllabus / Session Plan */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-400">
                  03 / Structured Breakdown
                </span>
                <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950">
                  {product.category === "Mentorship"
                    ? "4-Week Mentorship Roadmap"
                    : product.category === "Courses"
                    ? "Course Curriculum"
                    : "Contents & Modules"}
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                {product.curriculum.map((mod, idx) => {
                  const isOpen = openModule === idx;
                  return (
                    <div
                      key={mod.number}
                      className="rounded-2xl bg-white border border-neutral-200 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenModule(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <span className="text-sm font-mono font-semibold text-neutral-950 bg-lime-300 px-2.5 py-1 rounded w-fit shrink-0">
                            {mod.number}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-medium text-neutral-950">
                              {mod.title}
                            </h3>
                            <span className="text-xs font-mono text-neutral-500">
                              {mod.durationOrScope}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-2xl text-neutral-700 transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-neutral-100 flex flex-col gap-4">
                          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                            {mod.description}
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-800">
                            {mod.topics.map((topic, tIdx) => (
                              <li
                                key={tIdx}
                                className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-lg"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                                <span className="min-w-0">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preview Gallery */}
            {product.previews.length > 0 && (
              <div className="flex flex-col gap-6">
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-400">
                  04 / Inside Look
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {product.previews.map((preview, idx) => (
                    <figure key={idx} className="flex flex-col gap-2.5">
                      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200">
                        <Image
                          src={preview.src}
                          alt={preview.alt}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, 30vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="text-xs font-mono text-neutral-500">
                        {preview.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Learner / Buyer Testimonial */}
            {product.testimonial && (
              <blockquote className="p-6 sm:p-8 rounded-3xl bg-[#121212] text-white flex flex-col gap-4 shadow-xl">
                <p className="text-lg sm:text-2xl font-normal leading-snug text-lime-200">
                  “{product.testimonial.quote}”
                </p>
                <footer className="text-sm text-neutral-400">
                  <span className="font-medium text-white">
                    {product.testimonial.author}
                  </span>{" "}
                  — {product.testimonial.role}
                </footer>
              </blockquote>
            )}

            {/* FAQs */}
            {product.faqs.length > 0 && (
              <div className="flex flex-col gap-6">
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-400">
                  05 / Questions
                </span>
                <h2 className="text-3xl font-normal tracking-tight text-neutral-950">
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-col gap-3">
                  {product.faqs.map((faq, idx) => {
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
                          className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <span className="text-base sm:text-lg font-medium text-neutral-900">
                            {faq.question}
                          </span>
                          <span
                            className={`text-xl transition-transform duration-300 shrink-0 ${
                              isOpen ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>
                        {isOpen && (
                          <p className="px-4 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-neutral-100 text-neutral-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="py-14 sm:py-20 px-5 sm:px-12 lg:px-20 bg-neutral-100/80 border-t border-neutral-200">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-500">
                  Continue Exploring
                </span>
                <h2 className="mt-2 text-3xl sm:text-5xl font-normal tracking-tight text-neutral-950">
                  More Resources
                </h2>
              </div>
              <Link
                href="/learn"
                className="text-xs font-semibold uppercase tracking-widest text-neutral-900 hover:underline"
              >
                View All Products →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/learn/${item.slug}`}
                  className="group min-w-0 rounded-3xl bg-white border border-neutral-200 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    <div className="relative w-full aspect-16/10 bg-neutral-950 overflow-hidden">
                      <Image
                        src={item.heroImage}
                        alt={item.title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col gap-2">
                      <span className="text-xs font-mono text-neutral-500">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-medium text-neutral-950 tracking-tight leading-snug break-words">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-950">
                      {item.price}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-neutral-900 group-hover:underline">
                      Explore →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. CLOSING CTA BANNER */}
      <section className="py-16 sm:py-24 px-5 sm:px-12 lg:px-20 bg-(--bg) text-black text-left rounded-t-[3rem] lg:rounded-t-[4rem]">
        <div className="max-w-3xl flex flex-col items-start gap-6">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-semibold tracking-tight leading-none break-words">
            Ready to level up your craft?
          </h2>
          <p className="text-lg sm:text-xl tracking-normal leading-snug lg:leading-none text-neutral-700 max-w-xl">
            Have questions about team licensing, curriculum fit, or mentorship
            availability? Reach out directly.
          </p>
        </div>
      </section>
    </main>
  );
}
