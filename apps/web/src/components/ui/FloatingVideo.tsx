"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/* -------------------------------------------------------------------------- */
/*  Types & Constants                                                         */
/* -------------------------------------------------------------------------- */

type Mode = "mini" | "max";
type Position = "bottom-right" | "bottom-left" | "center";

export interface FloatingVideoProps {
  /** Video file URL (mp4/webm). */
  src: string;
  /** Image shown until the first frame is ready. */
  poster?: string;
  /** Accessible name for the player (also shown top-left when maximized). */
  title?: string;
  /** CSS selector of the hero section. Appears once it leaves view (or immediately if absent). */
  heroSelector?: string;
  /** width / height of the video. 16/9 for landscape, 9/16 for portrait. */
  aspectRatio?: number;
  /** Width of the minimized player in px (auto-shrinks on small screens). */
  miniWidth?: number;
  /** Horizontal alignment when minimized. */
  position?: Position;
  /** Gap between the minimized player and the viewport edge, in px. */
  edgeOffset?: number;
  /** Unmute automatically when the user maximizes (user gesture allowed). */
  unmuteOnMaximize?: boolean;
  /** Show a close button on the minimized player. */
  dismissible?: boolean;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RectOptions {
  aspectRatio: number;
  miniWidth: number;
  position: Position;
  edgeOffset: number;
}

const TRANSFORM_ORIGIN: Record<Position, string> = {
  "bottom-right": "95% 95%",
  "bottom-left": "5% 95%",
  center: "50% 95%",
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------- */
/*  Geometry Helper                                                           */
/* -------------------------------------------------------------------------- */

function computeRect(mode: Mode, o: RectOptions): Rect {
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;

  if (mode === "max") {
    const gutter = 16;
    let width = Math.min(vw - gutter * 2, 1040);
    let height = width / o.aspectRatio;
    const maxHeight = vh * 0.86;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * o.aspectRatio;
    }

    return {
      x: (vw - width) / 2,
      y: (vh - height) / 2,
      width,
      height,
    };
  }

  const edge = vw < 640 ? Math.min(o.edgeOffset, 12) : o.edgeOffset;
  const width = Math.min(o.miniWidth, vw * 0.45);
  const height = width / o.aspectRatio;

  const x =
    o.position === "center"
      ? (vw - width) / 2
      : o.position === "bottom-left"
      ? edge
      : vw - width - edge;

  return {
    x,
    y: vh - height - edge,
    width,
    height,
  };
}

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Tracks whether the player is cleared to show:
 * - If `selector` exists on the current route: `true` only once scrolled out of view.
 * - If `selector` does NOT exist on the current route: `true` immediately.
 */
function useHeroCleared(selector: string) {
  const pathname = usePathname();
  const [state, setState] = useState<{ key: string; cleared: boolean }>({
    key: "",
    cleared: false,
  });

  const key = `${pathname}::${selector}`;

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let observedHero: Element | null = null;

    const attachObserver = (hero: Element) => {
      if (observedHero === hero) return;
      observedHero = hero;
      io?.disconnect();
      io = new IntersectionObserver(
        ([entry]) => {
          setState({ key, cleared: !entry.isIntersecting });
        },
        { threshold: 0 }
      );
      io.observe(hero);
    };

    const existingHero = document.querySelector(selector);
    if (existingHero) {
      attachObserver(existingHero);
    } else {
      // Page has no matching hero section -> allow floating player immediately
      setState({ key, cleared: true });

      // Watch briefly in case a client-rendered hero mounts right after navigation
      mo = new MutationObserver(() => {
        const lateHero = document.querySelector(selector);
        if (lateHero) {
          mo?.disconnect();
          attachObserver(lateHero);
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      io?.disconnect();
      mo?.disconnect();
    };
  }, [selector, pathname, key]);

  return state.key === key ? state.cleared : false;
}

/** Traps focus inside `containerRef` and handles Escape key when `active`. */
function useModalFocusTrap(
  active: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  onEscape: () => void
) {
  useEffect(() => {
    if (!active) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
        return;
      }
      if (e.key !== "Tab" || !containerRef.current) return;

      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>("button, input")
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      } else if (!focusable.includes(current as HTMLElement)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, containerRef, onEscape]);
}

/* -------------------------------------------------------------------------- */
/*  Subcomponents                                                             */
/* -------------------------------------------------------------------------- */

function IconButton({
  label,
  onClick,
  size = "sm",
  buttonRef,
  children,
}: {
  label: string;
  onClick: () => void;
  size?: "sm" | "md";
  buttonRef?: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`pointer-events-auto flex shrink-0 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-[background-color,color,transform] duration-200 hover:bg-(--primary-clr) hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-clr) active:scale-90 ${
        size === "sm" ? "h-8 w-8" : "h-10 w-10"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */

export function FloatingVideo({
  src,
  poster,
  title = "Video",
  heroSelector = "#hero",
  aspectRatio = 16 / 9,
  miniWidth = 224,
  position = "bottom-left",
  edgeOffset = 16,
  unmuteOnMaximize = false,
  dismissible = true,
}: FloatingVideoProps) {
  const pathname = usePathname();
  const heroCleared = useHeroCleared(heroSelector);

  const [mode, setMode] = useState<Mode>("mini");
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [dismissedPath, setDismissedPath] = useState<string | null>(null);

  const isDismissed = dismissedPath === pathname;
  const isMax = mode === "max";
  const shown = (heroCleared && !isDismissed) || isMax;

  const boxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const maxOverlayRef = useRef<HTMLDivElement>(null);
  const maximizeBtnRef = useRef<HTMLButtonElement>(null);
  const minimizeBtnRef = useRef<HTMLButtonElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef<HTMLInputElement>(null);

  const geometryReady = useRef(false);
  const visibilityReady = useRef(false);
  const userPaused = useRef(false);
  const prevMode = useRef<Mode>("mini");
  const modeRef = useRef<Mode>("mini");
  modeRef.current = mode;

  const getRect = useCallback(
    (m: Mode) =>
      computeRect(m, { aspectRatio, miniWidth, position, edgeOffset }),
    [aspectRatio, miniWidth, position, edgeOffset]
  );

  /* ---------------- route change cleanup ---------------- */

  useEffect(() => {
    setMode("mini");
  }, [pathname]);

  /* ---------------- actions ---------------- */

  const dismiss = useCallback(() => {
    setDismissedPath(pathname);
  }, [pathname]);

  const maximize = useCallback(() => {
    if (unmuteOnMaximize && videoRef.current) {
      videoRef.current.muted = false;
      setMuted(false);
    }
    setMode("max");
  }, [unmuteOnMaximize]);

  const minimize = useCallback(() => {
    setMode("mini");
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }, []);

  const syncProgress = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const ratio = v.currentTime / v.duration;
    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${ratio})`;
    }
    if (seekRef.current) {
      seekRef.current.value = String(ratio * 1000);
    }
  }, []);

  const seek = useCallback(
    (value: number) => {
      const v = videoRef.current;
      if (!v || !v.duration) return;
      v.currentTime = (value / 1000) * v.duration;
      syncProgress();
    },
    [syncProgress]
  );

  /* ---------------- geometry animation: mini <-> max ---------------- */

  useGSAP(
    () => {
      const box = boxRef.current;
      const backdrop = backdropRef.current;
      if (!box || !backdrop) return;

      const rect = getRect(mode);

      if (!geometryReady.current) {
        geometryReady.current = true;
        gsap.set(box, rect);
        return;
      }

      const d = prefersReducedMotion() ? 0 : 1;
      gsap.to(box, {
        ...rect,
        duration: 0.65 * d,
        ease: "expo.inOut",
        overwrite: "auto",
      });
      gsap.to(backdrop, {
        autoAlpha: mode === "max" ? 1 : 0,
        duration: 0.45 * d,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    { dependencies: [mode, getRect] }
  );

  /* ---------------- entrance / exit animation ---------------- */

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      if (!visibilityReady.current) {
        visibilityReady.current = true;
        gsap.set(card, { autoAlpha: 0, scale: 0.88, y: 24 });
        if (!shown) return;
      }

      const d = prefersReducedMotion() ? 0 : 1;
      if (shown) {
        gsap.to(card, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.55 * d,
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
      } else {
        gsap.to(card, {
          autoAlpha: 0,
          scale: 0.9,
          y: 24,
          duration: 0.3 * d,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    },
    { dependencies: [shown] }
  );

  /* ---------------- viewport resize sync ---------------- */

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!boxRef.current) return;
        gsap.killTweensOf(boxRef.current);
        gsap.set(boxRef.current, getRect(modeRef.current));
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [getRect]);

  /* ---------------- playback sync with visibility ---------------- */

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shown) {
      if (!userPaused.current) v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [shown]);

  /* ---------------- modal accessibility & focus ---------------- */

  useModalFocusTrap(isMax, maxOverlayRef, minimize);

  useEffect(() => {
    if (mode === "max") {
      minimizeBtnRef.current?.focus({ preventScroll: true });
    } else if (prevMode.current === "max") {
      maximizeBtnRef.current?.focus({ preventScroll: true });
    }
    prevMode.current = mode;
  }, [mode]);

  /* ---------------- render ---------------- */

  const transformOrigin = isMax ? "50% 50%" : TRANSFORM_ORIGIN[position];

  return (
    <>
      {/* Backdrop (visible only when maximized) */}
      <div
        ref={backdropRef}
        onClick={minimize}
        aria-hidden
        style={{ opacity: 0, visibility: "hidden" }}
        className="fixed inset-0 z-69 bg-black/70 backdrop-blur-sm"
      />

      {/* Positioned box: GSAP animates x / y / width / height */}
      <div
        ref={boxRef}
        className={`fixed left-0 top-0 ${isMax ? "z-70" : "z-40"}`}
      >
        {/* Card: GSAP animates entrance / exit */}
        <div
          ref={cardRef}
          role={isMax ? "dialog" : undefined}
          aria-modal={isMax || undefined}
          aria-label={title}
          style={{
            opacity: 0,
            visibility: "hidden",
            transformOrigin,
          }}
          className={`relative h-full w-full overflow-hidden bg-zinc-900 shadow-2xl shadow-black/30 ring-1 ring-white/10 transition-[border-radius] duration-500 ${
            isMax ? "rounded-3xl" : "rounded-2xl"
          }`}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onLoadedMetadata={syncProgress}
            onTimeUpdate={syncProgress}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Surface button: maximize when mini, play/pause when maximized */}
          <button
            type="button"
            tabIndex={-1}
            aria-label={
              isMax ? (playing ? "Pause video" : "Play video") : "Maximize video"
            }
            onClick={isMax ? togglePlay : maximize}
            className={`absolute inset-0 ${
              isMax ? "cursor-default" : "cursor-pointer"
            }`}
          />

          {/* Big play badge when paused (maximized only) */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isMax && !playing ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-(--primary-clr) text-zinc-900 shadow-xl">
              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
            </span>
          </div>

          {/* ---------- Mini controls ---------- */}
          <div
            aria-hidden={isMax}
            className={`pointer-events-none absolute inset-0 p-2 transition-[opacity,visibility] duration-300 ${
              isMax ? "invisible opacity-0" : "visible opacity-100"
            }`}
          >
            <div className="flex items-start justify-between">
              {dismissible ? (
                <IconButton label="Close video" onClick={dismiss}>
                  <X className="h-3.5 w-3.5" />
                </IconButton>
              ) : (
                <span />
              )}
              <IconButton
                label="Maximize video"
                onClick={maximize}
                buttonRef={maximizeBtnRef}
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </IconButton>
            </div>
            <div className="absolute bottom-2 left-2">
              <IconButton
                label={muted ? "Unmute video" : "Mute video"}
                onClick={toggleMute}
              >
                {muted ? (
                  <VolumeX className="h-3.5 w-3.5" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
              </IconButton>
            </div>
          </div>

          {/* ---------- Maximized controls ---------- */}
          <div
            ref={maxOverlayRef}
            aria-hidden={!isMax}
            className={`pointer-events-none absolute inset-0 transition-[opacity,visibility] duration-300 ${
              isMax ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <div className="flex items-start justify-between bg-linear-to-b from-black/60 to-transparent p-4 sm:p-5">
              <p className="line-clamp-1 pr-4 text-sm font-medium text-white/90">
                {title}
              </p>
              <IconButton
                label="Minimize video"
                size="md"
                onClick={minimize}
                buttonRef={minimizeBtnRef}
              >
                <Minimize2 className="h-4 w-4" />
              </IconButton>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-linear-to-t from-black/70 to-transparent p-4 pt-10 sm:p-5 sm:pt-12">
              <IconButton
                label={playing ? "Pause video" : "Play video"}
                size="md"
                onClick={togglePlay}
              >
                {playing ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="h-4 w-4 translate-x-px fill-current" />
                )}
              </IconButton>
              <IconButton
                label={muted ? "Unmute video" : "Mute video"}
                size="md"
                onClick={toggleMute}
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </IconButton>

              {/* Progress / seek */}
              <div className="pointer-events-auto relative h-1.5 flex-1 rounded-full bg-white/25">
                <div
                  ref={progressFillRef}
                  style={{ transform: "scaleX(0)" }}
                  className="absolute inset-0 origin-left rounded-full bg-(--primary-clr)"
                />
                <input
                  ref={seekRef}
                  type="range"
                  min={0}
                  max={1000}
                  defaultValue={0}
                  aria-label="Seek"
                  onInput={(e) =>
                    seek(Number((e.target as HTMLInputElement).value))
                  }
                  onChange={(e) => seek(Number(e.target.value))}
                  className="absolute -inset-y-3 inset-x-0 h-7 w-full cursor-pointer opacity-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}