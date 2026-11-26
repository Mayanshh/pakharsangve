"use client";

import Marquee, { MarqueeItem } from "@/components/ui/Marquee";

const CLIENT_LOGOS: MarqueeItem[] = [
  {
    id: "leonardo",
    name: "Leonardo Hotels",
    content: (
      <div className="flex flex-col items-center leading-none text-neutral-900">
        <span className="text-lg sm:text-xl font-medium tracking-[0.22em] uppercase">
          LEONARDO
        </span>
        <span className="mt-1 font-serif italic text-base sm:text-lg tracking-wide text-neutral-700">
          Hotels
        </span>
      </div>
    ),
  },
  {
    id: "hitachi",
    name: "Hitachi",
    content: (
      <span className="text-xl sm:text-2xl font-black tracking-[0.12em] uppercase text-black">
        HITACHI
      </span>
    ),
  },
  {
    id: "haines-watts",
    name: "Haines Watts",
    content: (
      <span className="text-lg sm:text-xl font-bold tracking-tight text-black">
        Haines<span className="font-extrabold ml-0.5">Watts</span>
      </span>
    ),
  },
  {
    id: "vislink",
    name: "Vislink",
    content: (
      <div className="flex items-center gap-2.5 text-black">
        <svg
          className="h-6 w-6 sm:h-7 sm:w-7"
          viewBox="0 0 32 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M2 3L16 25L30 3" />
          <path d="M9 3L16 14L23 3" />
        </svg>
        <span className="text-lg sm:text-xl font-semibold tracking-[0.18em] uppercase">
          VISLINK
        </span>
      </div>
    ),
  },
  {
    id: "applied-nutrition",
    name: "Applied Nutrition",
    content: (
      <div className="flex flex-col leading-[0.9] font-black uppercase tracking-tighter text-black text-base sm:text-lg">
        <span>APPLIED</span>
        <span>NUTRITION</span>
      </div>
    ),
  },
  {
    id: "global",
    name: "Global",
    content: (
      <span className="text-xl sm:text-2xl font-extrabold tracking-[0.08em] uppercase text-black">
        GLOBAL
      </span>
    ),
  },
];


export default function PortraitHeroSlide() {
  return (
    <>
    <section id="hero" className="relative w-full h-full min-h-dvh flex flex-col justify-between p-6 sm:p-10 lg:p-14 pb-24 mb-18 sm:pb-24 lg:pb-24 bg-neutral-950 text-white select-none overflow-hidden">
      <img
        src="/images/portrait.jpg"
        alt="Pakharsangave Portrait"
        className="absolute inset-0 w-full h-full object-cover object-[50%_10%]"
      />

      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between pt-14 lg:pt-0">
        <h1 className="text-coco text-3xl tracking-tight  h-fit w-full font-semibold">Pakharsangave<span className="text-(--primary-clr) text-5xl">.</span></h1>
      </div>

      <div className="relative z-10 max-w-2xl mt-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.9] text-white">
          I run your ads like {" "}
           i own &nbsp;
          <span className="text-lime-300">50%</span> of your business.
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-neutral-200 max-w-xl leading-none">
          Indian born, globally trusted built with a world class team focused on measurable revenue and bottom line profit.
        </p>

        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
          <a
            href="mailto:hello@pakharsangave.com"
            className="px-6 py-3 rounded-full bg-lime-300 text-black font-semibold text-xs sm:text-sm tracking-tight hover:scale-[1.03] transition-transform duration-200 shadow-[0_0_35px_rgba(190,242,100,0.35)]"
          >
            hello@pakharsangave.com
          </a>
          <button
            type="button"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white font-medium text-xs sm:text-sm transition-colors duration-200 cursor-pointer"
          >
            View Editorial Hero &nbsp; →
          </button>
        </div>
      </div>
    </section>
          <div className="w-full mt-6 lg:mt-0 overflow-hidden lg:overflow-visible">
            <Marquee
              items={CLIENT_LOGOS}
              speed={24}
              direction="left"
              slowOnHover={true}
              fadeEdges={true}
            />
          </div>
    </>

  );
}