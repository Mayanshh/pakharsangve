"use client";

import React from "react";

interface PortraitHeroSlideProps {
  onExploreNext: () => void;
}

export default function PortraitHeroSlide({ onExploreNext }: PortraitHeroSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 pb-24 sm:pb-24 lg:pb-24 bg-neutral-950 text-white select-none">
      <img
        src="/images/demo-portrait.png"
        alt="Pakharsangave Portrait"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium tracking-wide text-white/90">
          <span className="h-2 w-2 rounded-full bg-lime-300 animate-pulse" />
          £100M+ Client Revenue • £250K/mo Ad Spend
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mt-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-white">
          Ads run like we own{" "}
          <span className="text-lime-300">50%</span> of your business.
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-neutral-200 max-w-xl leading-relaxed">
          Indian-born, globally trusted—built with a world-class team focused on measurable revenue and bottom-line profit.
        </p>

        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
          <a
            href="mailto:hello@pakharsangave.com"
            className="px-5 py-2.5 rounded-full bg-lime-300 text-black font-semibold text-xs sm:text-sm tracking-tight hover:scale-[1.03] transition-transform duration-200 shadow-[0_0_35px_rgba(190,242,100,0.35)]"
          >
            hello@pakharsangave.com
          </a>
          <button
            type="button"
            onClick={onExploreNext}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white font-medium text-xs sm:text-sm transition-colors duration-200 cursor-pointer"
          >
            View Editorial Hero →
          </button>
        </div>
      </div>
    </div>
  );
}