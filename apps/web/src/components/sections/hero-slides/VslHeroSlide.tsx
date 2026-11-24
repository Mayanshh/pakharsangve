"use client";

import React, { useEffect, useRef, useState } from "react";

interface VslHeroSlideProps {
  isActive: boolean;
  onWatchStateChange: (isActivelyWatching: boolean) => void;
  onVideoEnded: () => void;
}

export default function VslHeroSlide({
  isActive,
  onWatchStateChange,
  onVideoEnded,
}: VslHeroSlideProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setIsUnmuted(false);
      onWatchStateChange(false);
    }
  }, [isActive, onWatchStateChange]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isUnmuted) {
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(() => {});
      setIsUnmuted(true);
      onWatchStateChange(true);
    } else {
      video.muted = true;
      setIsUnmuted(false);
      onWatchStateChange(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 pb-24 sm:pb-24 lg:pb-24 bg-neutral-950 text-white overflow-hidden">
      {/* Swap /videos/p.mp4 with your dedicated 20-50s talking-head VSL video */}
      <video
        ref={videoRef}
        src="/videos/demo-vsl.mp4"
        autoPlay
        muted
        loop={!isUnmuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsUnmuted(false);
          onWatchStateChange(false);
          onVideoEnded();
        }}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Strong bottom & top scrims so baked-in clip text never clashes with overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/45 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-white/90">
          <span className="h-2 w-2 rounded-full bg-(--primary-clr)" />
          20–50s Founder VSL
        </span>

        <button
          type="button"
          onClick={toggleSound}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-lime-300 text-black font-semibold text-xs sm:text-sm tracking-tight shadow-lg hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
        >
          {isUnmuted ? (
            <>
              <span className="h-2 w-2 rounded-full bg-black animate-ping" />
              Mute Video
            </>
          ) : (
            <>
              <span>▶</span>
              Watch With Sound
            </>
          )}
        </button>
      </div>

      <div
        className={`relative z-10 max-w-xl mt-auto transition-opacity duration-500 ${
          isUnmuted ? "opacity-35 hover:opacity-100" : "opacity-100"
        }`}
      >
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-white">
          Inside how we scale profitable ad systems.
        </h2>
        <p className="mt-2.5 text-xs sm:text-sm lg:text-base text-neutral-200 max-w-md leading-relaxed">
          A quick talking-head walkthrough on creative velocity, media buying discipline, and client growth.
        </p>

        <div className="mt-4 w-full max-w-xs h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-lime-300 transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}