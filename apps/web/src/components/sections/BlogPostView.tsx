"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CapsuleButton from "@/components/ui/Button";
import { formatDate, type BlogPost } from "@/data/Blogs";

export default function BlogPostView({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-(--bg) text-neutral-900 selection:bg-black selection:text-white">
      <div className="fixed top-0 left-0 w-full h-0.75 z-50 pointer-events-none" aria-hidden>
        <div className="h-full w-full origin-left bg-(--primary-clr)" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className="w-full px-6 sm:px-12 lg:px-20 pt-10 pb-6">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-neutral-600 hover:text-black transition-colors"
        >
          <svg className="w-5 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 8H5M12 15l-7-7 7-7" />
          </svg>
          Back to Journal
        </Link>
      </div>

      <header className="px-6 sm:px-12 lg:px-20 pt-6 pb-16">
        <div className="max-w-5xl flex flex-col gap-8">
          <p className="text-sm text-neutral-500">
            {post.category} · {formatDate(post.date)} · {post.readTime}
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] text-(--primary-clr) font-normal tracking-tight leading-[1.05]">
            {post.title}
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-600 leading-snug max-w-3xl">{post.excerpt}</p>
        </div>

        <div className="relative mt-14 w-full aspect-21/9 min-h-72 sm:min-h-120 rounded-3xl lg:rounded-xl overflow-hidden bg-neutral-950 shadow-2xl">
          <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover object-center" />
        </div>
      </header>

      <section className="px-6 sm:px-12 lg:px-20 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start flex flex-col gap-6 text-sm text-neutral-600">
            <div>
              <span className="block text-neutral-400">Written by</span>
              <span className="font-medium text-neutral-900">{post.author}</span>
            </div>
            <div>
              <span className="block text-neutral-400">Published</span>
              <span className="font-medium text-neutral-900">{formatDate(post.date)}</span>
            </div>
            <div>
              <span className="block text-neutral-400">Reading time</span>
              <span className="font-medium text-neutral-900">{post.readTime}</span>
            </div>
          </aside>

          <article className="lg:col-span-8 flex flex-col gap-7 max-w-2xl text-lg sm:text-xl text-neutral-700 leading-relaxed">
            {post.content.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={i} className="mt-8 text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 leading-tight">
                      {block.text}
                    </h2>
                  );
                case "quote":
                  return (
                    <blockquote key={i} className="my-4 pl-6 border-l-2 border-(--primary-clr) text-2xl sm:text-3xl font-normal tracking-tight leading-snug text-neutral-900">
                      {block.text}
                    </blockquote>
                  );
                case "list":
                  return (
                    <ul key={i} className="flex flex-col gap-3">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-4 items-start">
                          <span className="mt-3 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                default:
                  return <p key={i}>{block.text}</p>;
              }
            })}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-24 px-6 sm:px-12 lg:px-20 bg-[#121212] text-white rounded-t-[3rem] lg:rounded-t-[4rem]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-lime-300 mb-14">Keep reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group flex flex-col gap-5">
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-900">
                    <Image src={r.image} alt={r.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                  </div>
                  <p className="text-sm text-neutral-400">{r.category} · {r.readTime}</p>
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight leading-snug">{r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6 sm:px-12 lg:px-20 bg-[#121212] text-neutral-100 text-center border-t border-neutral-900">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-none">
            Want results like these?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl">
            Tell us where your ads or brand are stuck and we&apos;ll show you what we&apos;d change first.
          </p>
          <CapsuleButton text="Book a Discovery Call" href="/contact" />
        </div>
      </section>
    </main>
  );
}
