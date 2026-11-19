"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import type { WorkProject } from "@/app/case-studies/page";

interface WorkDetailModalProps {
  project: WorkProject | null;
  onClose: () => void;
}

export default function WorkDetailModal({
  project,
  onClose,
}: WorkDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    const ctx = gsap.context(() => {
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.45, ease: "power3.out" }
        );
      }
      if (mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          { scale: 1.08 },
          { scale: 1, duration: 0.9, ease: "power3.out", force3D: true }
        );
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            delay: 0.15,
            ease: "power3.out",
            clearProps: "transform",
          }
        );
      }
    }, overlayRef);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.client} showcase`}
      className="fixed inset-0 z-50 h-screen w-screen overflow-hidden bg-[#0D0F11] text-white select-none"
    >
      {/* Full-Screen Cover Image */}
      <img
        ref={mediaRef}
        src={project.imageUrl}
        alt={project.imageAlt}
        className="h-full w-full object-cover object-center will-change-transform"
      />

      {/* Minimalist Edge Vignette for Crisp Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/35"
      />

      {/* Top Minimalist Bar */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-10 lg:px-14 pt-7 sm:pt-9">
        <span className="text-xs sm:text-sm font-medium tracking-[0.26em] uppercase text-white/85">
          {project.client}
        </span>

        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/35 backdrop-blur-md px-5 py-2.5 text-xs sm:text-[13px] font-normal text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
        >
          <span>Close</span>
          <span aria-hidden="true" className="text-sm leading-none">
            ×
          </span>
        </button>
      </div>

      {/* Bottom Minimalist Metadata */}
      <div
        ref={contentRef}
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-6 sm:px-10 lg:px-14 pb-8 sm:pb-12"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/65 mb-2">
            Case Study
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.03em] leading-none text-white">
            {project.client}
          </h1>
        </div>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-md px-4 py-1.5 text-[11px] sm:text-xs font-normal tracking-[0.02em] text-white/95"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}