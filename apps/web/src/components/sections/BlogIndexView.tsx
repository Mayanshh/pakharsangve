"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_CATEGORIES, BLOG_POSTS, formatDate } from "@/data/Blogs";

export default function BlogIndexView() {
  const [active, setActive] = useState("All");

  const posts = useMemo(
    () => (active === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === active)),
    [active]
  );
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen w-full bg-(--bg) text-neutral-900 selection:bg-black selection:text-white px-6 sm:px-12 lg:px-20 py-14 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col gap-10 mb-16 sm:mb-24">
          <Link
            href="/"
            className="group inline-flex w-fit items-center gap-3 text-sm font-medium uppercase tracking-widest text-neutral-600 hover:text-black transition-colors"
          >
            <svg className="w-5 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 8H5M12 15l-7-7 7-7" />
            </svg>
            Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="text-5xl sm:text-7xl lg:text-[7rem] text-(--primary-clr) font-normal tracking-tight leading-[1.02]">
              Journal
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 max-w-md leading-relaxed">
              Notes on ads, brand and growth from the work we do every day. Short, specific and free of filler.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter posts by category"
            className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {BLOG_CATEGORIES.map((cat) => {
              const on = cat === active;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(cat)}
                  className={`shrink-0 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                    on
                      ? "bg-neutral-950 text-white border-neutral-950"
                      : "bg-white/60 text-neutral-700 border-neutral-300 hover:border-neutral-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </header>

        {featured && (
          <Link
            key={featured.slug}
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pb-16 sm:pb-24 border-b border-neutral-300"
          >
            <div className="lg:col-span-7 relative aspect-16/10 rounded-3xl lg:rounded-xl overflow-hidden bg-neutral-200">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 flex flex-col gap-5">
              <p className="text-sm text-neutral-500">
                {featured.category} · {formatDate(featured.date)} · {featured.readTime}
              </p>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-tight leading-[1.1] text-neutral-900">
                {featured.title}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-md">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-3 text-sm font-medium text-neutral-900 pt-2">
                Read article
                <svg className="w-14 h-4 overflow-visible transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3" viewBox="0 0 64 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="0" y1="8" x2="60" y2="8" />
                  <polyline points="54 2 62 8 54 14" />
                </svg>
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pt-16 sm:pt-24">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-5">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-neutral-500">
                    {post.category} · {post.readTime}
                  </p>
                  <h3 className="text-2xl font-normal tracking-tight leading-snug text-neutral-900 bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat transition-[background-size] duration-500 group-hover:bg-size-[100%_1px] w-fit">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 && <p className="py-24 text-neutral-500">No posts in this category yet.</p>}
      </div>
    </main>
  );
}
