"use client";

import React from "react";

export default function EditorialHeroSlide() {
  return (
    <div className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between pt-4 pb-14 lg:pt-10 lg:pb-10">
      <div className="relative w-full">
        <h2 className="text-black min-h-fit text-[10vw] leading-[1.15] lg:text-[7.8em] lg:leading-15 whitespace-normal tracking-tight font-semibold">
          I run{" "}
          <span className="inline-flex items-center align-middle mx-1.5 my-1 sm:mx-2 lg:mx-3 lg:my-2">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-[0.95em] w-[1.75em] lg:h-30 lg:w-55 object-cover object-center rounded-xl lg:rounded-2xl"
            >
              <source src="/videos/p.mp4" type="video/mp4" />
            </video>
          </span>{" "}
          your Ads like I own
          <span className="text-(--primary-clr) font-extrabold rounded-3xl overflow-hidden">
            {" "}
            50%{" "}
          </span>
          of your{" "}
          <span className="inline-flex items-center align-middle mx-1.5 my-1 sm:mx-2 lg:mx-3 lg:my-2">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-[0.95em] w-[1.75em] lg:h-30 lg:w-55 object-cover object-center rounded-xl lg:rounded-2xl"
            >
              <source src="/videos/p2.mp4" type="video/mp4" />
            </video>
          </span>{" "}
          business.
        </h2>

        <p className="text-base sm:text-lg lg:text-[1.25rem] text-black w-full max-w-xl mt-6 lg:mt-0 lg:max-w-none lg:w-150 relative left-0 top-0 lg:left-150 lg:-top-5 leading-[1.35]">
          <span className="font-semibold">Indian-born, globally trusted </span> – we’ve generated{" "}
          <span className="font-semibold">£100M+ in client revenue </span> and manage £250K in monthly ad spend, backed by a world-class team built to improve the bottom line.
        </p>

        <span className="inline-flex items-center align-middle relative mt-5 top-0 left-0 lg:mt-0 lg:-top-10 lg:left-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-24 w-44 sm:h-28 sm:w-52 lg:h-30 lg:w-55 object-cover object-center rounded-2xl"
          >
            <source src="/videos/p3.mp4" type="video/mp4" />
          </video>
        </span>

        {/* Floating Badges */}
        <div className="animate-smooth-float relative w-fit mt-5 px-6 py-3 lg:w-auto lg:mt-0 lg:px-10 bg-lime-300 rounded-full lg:absolute lg:top-44 lg:right-10 z-10 flex items-center justify-center shadow-[0_0_50px_rgba(190,242,100,0.5)] backdrop-blur-md cursor-pointer transition-transform duration-300 hover:scale-105">
          <h3 className="text-black text-lg font-semibold tracking-tight">
            100M+ Client Revenue
          </h3>
        </div>

        <div className="animate-smooth-float relative w-fit mt-4 ml-auto px-6 py-3 lg:w-auto lg:mt-0 lg:ml-0 lg:px-10 bg-lime-300 rounded-full lg:absolute lg:top-115 lg:left-110 z-10 flex items-center justify-center shadow-[0_0_50px_rgba(190,242,100,0.5)] backdrop-blur-md cursor-pointer transition-transform duration-300 hover:scale-105">
          <h3 className="text-black text-lg font-semibold tracking-tight">
            World Class Team
          </h3>
        </div>
      </div>

      {/* Contact Links */}
      {/* <div className="w-full flex flex-col items-start mt-8 lg:mt-4 lg:items-end justify-between">
        <a
          href="mailto:hello@pakharsangave.com"
          className="text-black font-semibold text-md hover:opacity-70 transition-opacity duration-200"
        >
          hello@pakharsangave.com
        </a>
        <a
          href="tel:+91999999998"
          className="text-black text-md hover:opacity-70 transition-opacity duration-200"
        >
          +91 9876678901
        </a>
      </div> */}
    </div>
  );
}