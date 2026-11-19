"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SmoothHashNavigatorProps {
  /** Offset in pixels above the target element (e.g., for fixed header clearance) */
  headerOffset?: number;
  /** Maximum scroll duration in seconds (Default: 1.15). Short hops are automatically quicker. */
  duration?: number;
  /** GSAP ease string or custom ease function (Default: "power4.inOut") */
  ease?: string | gsap.EaseFunction;
  /** Optional subtle visual highlight on arrival */
  highlightTarget?: boolean;
  /** Optional full-route transition veil for cross-page navigation */
  routeTransitionVeil?: boolean;
}

interface ParsedHashTarget {
  pathname: string;
  search: string;
  hashId: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const IGNORED_PROTOCOLS = /^(mailto:|tel:|sms:|javascript:)/i;
const USER_SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizePath(p: string): string {
  if (!p || p === "/") return "/";
  return p.endsWith("/") ? p.slice(0, -1) : p;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Resolves against the CURRENT page URL (not just the origin), so a bare
 * href="#contact" on /service correctly means /service#contact.
 */
function parseHref(rawHref: string, baseHref: string): ParsedHashTarget | null {
  if (!rawHref || IGNORED_PROTOCOLS.test(rawHref.trim())) return null;

  try {
    const url = new URL(rawHref, baseHref);
    if (url.origin !== new URL(baseHref).origin) return null;
    if (url.hash.length < 2) return null;

    return {
      pathname: normalizePath(url.pathname),
      search: url.search,
      hashId: safeDecode(url.hash.slice(1)),
    };
  } catch {
    return null;
  }
}

function getDestinationY(el: HTMLElement, headerOffset: number): number {
  const rect = el.getBoundingClientRect();
  const scrollMarginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const effectiveOffset = Math.max(headerOffset, scrollMarginTop);
  const maxScrollY = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  return Math.min(Math.max(0, window.scrollY + rect.top - effectiveOffset), maxScrollY);
}

/** Moves keyboard / screen-reader focus to the target without causing a scroll jump. */
function focusTarget(el: HTMLElement) {
  const hadTabIndex = el.hasAttribute("tabindex");
  if (!hadTabIndex) {
    el.setAttribute("tabindex", "-1");
    el.addEventListener("blur", () => el.removeAttribute("tabindex"), { once: true });
  }
  el.focus({ preventScroll: true });
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function SmoothHashNavigator({
  headerOffset = 24,
  duration = 1.15,
  ease = "power4.inOut",
  highlightTarget = true,
  routeTransitionVeil = true,
}: SmoothHashNavigatorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const veilRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const pendingHashIdRef = useRef<string | null>(null);
  const scrollStartedAtRef = useRef(0);
  const veilSafetyTimerRef = useRef<number | null>(null);
  /** null = we haven't overridden <html> scroll-behavior */
  const savedScrollBehaviorRef = useRef<string | null>(null);
  const savedScrollRestorationRef = useRef<ScrollRestoration | null>(null);

  // Keep latest props in a ref so every callback below stays referentially
  // stable. Otherwise changing a prop would re-run the arrival effect and
  // re-scroll the page unexpectedly.
  const configRef = useRef({
    headerOffset,
    duration,
    ease,
    highlightTarget,
    routeTransitionVeil,
  });
  useEffect(() => {
    configRef.current = { headerOffset, duration, ease, highlightTarget, routeTransitionVeil };
  });

  /* ---------- scroll-behavior override (safe against overlaps) ---------- */

  const forceInstantScrollBehavior = useCallback(() => {
    if (savedScrollBehaviorRef.current !== null) return; // already overridden
    const html = document.documentElement;
    savedScrollBehaviorRef.current = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
  }, []);

  const restoreNativeScrollBehavior = useCallback(() => {
    if (savedScrollBehaviorRef.current === null) return;
    document.documentElement.style.scrollBehavior = savedScrollBehaviorRef.current;
    savedScrollBehaviorRef.current = null;
  }, []);

  const killActiveScroll = useCallback(() => {
    scrollTweenRef.current?.kill();
    scrollTweenRef.current = null;
    restoreNativeScrollBehavior();
  }, [restoreNativeScrollBehavior]);

  /* ---------- veil ---------- */

  const setVeil = useCallback(
    (opacity: 0 | 1, dur: number, onComplete?: () => void) => {
      if (veilSafetyTimerRef.current !== null) {
        window.clearTimeout(veilSafetyTimerRef.current);
        veilSafetyTimerRef.current = null;
      }
      const veil = veilRef.current;
      if (!veil) {
        onComplete?.();
        return;
      }
      gsap.killTweensOf(veil);
      gsap.to(veil, { opacity, duration: dur, ease: "power2.out", onComplete });
    },
    []
  );

  /* ---------- arrival highlight (lime-300 to match the site accent) ---------- */

  const pulseArrival = useCallback((el: HTMLElement) => {
    if (!configRef.current.highlightTarget || prefersReducedMotion()) return;
    gsap.killTweensOf(el, "outline,outlineOffset");
    gsap.fromTo(
      el,
      { outline: "1px solid rgba(190, 242, 100, 0)", outlineOffset: "8px" },
      {
        outline: "1px solid rgba(190, 242, 100, 0.6)",
        outlineOffset: "0px",
        duration: 0.45,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        clearProps: "outline,outlineOffset",
      }
    );
  }, []);

  /* ---------- the scroll itself ---------- */

  const scrollToElementById = useCallback(
    (targetId: string, updateUrlHash = true) => {
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return false;

      killActiveScroll();

      const { headerOffset: offset, duration: maxDuration, ease: easing } = configRef.current;

      if (updateUrlHash && safeDecode(window.location.hash.slice(1)) !== targetId) {
        window.history.pushState(
          window.history.state,
          "",
          `#${encodeURIComponent(targetId)}`
        );
      }

      const startY = window.scrollY;
      const destinationY = getDestinationY(targetEl, offset);
      const distance = Math.abs(destinationY - startY);

      const finish = () => {
        scrollTweenRef.current = null;
        restoreNativeScrollBehavior();
        ScrollTrigger.update();
        pulseArrival(targetEl);
        focusTarget(targetEl);
      };

      // Reduced motion (or nothing to animate): jump straight there.
      if (prefersReducedMotion() || distance < 1) {
        forceInstantScrollBehavior();
        window.scrollTo(0, destinationY);
        restoreNativeScrollBehavior();
        ScrollTrigger.update();
        focusTarget(targetEl);
        return true;
      }

      const runTween = (
        toY: number,
        dur: number,
        tweenEase: string | gsap.EaseFunction,
        onDone: () => void
      ) => {
        forceInstantScrollBehavior();
        scrollStartedAtRef.current = performance.now();
        const proxy = { y: window.scrollY };
        scrollTweenRef.current = gsap.to(proxy, {
          y: toY,
          duration: dur,
          ease: tweenEase,
          onUpdate: () => window.scrollTo(0, proxy.y),
          onComplete: () => {
            window.scrollTo(0, toY);
            onDone();
          },
        });
      };

      // Layout can shift while we glide (lazy images, ScrollTrigger pin spacers).
      // After landing, re-measure and do up to two short corrections.
      const settle = (attempt: number) => {
        const correctedY = getDestinationY(targetEl, offset);
        if (attempt < 2 && Math.abs(correctedY - window.scrollY) > 2) {
          runTween(correctedY, 0.35, "power2.out", () => settle(attempt + 1));
          return;
        }
        finish();
      };

      // Short hops shouldn't take as long as cross-page jumps.
      const adaptiveDuration = Math.min(
        maxDuration,
        0.45 + (distance / 3000) * Math.max(0, maxDuration - 0.45)
      );

      runTween(destinationY, adaptiveDuration, easing, () => settle(0));
      return true;
    },
    [forceInstantScrollBehavior, killActiveScroll, pulseArrival, restoreNativeScrollBehavior]
  );

  /* ---------- cancel the glide if the user takes over ---------- */

  useEffect(() => {
    const cancel = () => {
      if (scrollTweenRef.current) killActiveScroll();
    };
    // Ignore trackpad inertia left over from the click that started the glide
    const onWheel = () => {
      if (performance.now() - scrollStartedAtRef.current > 150) cancel();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (USER_SCROLL_KEYS.has(e.key)) cancel();
    };
    // Clicking / dragging the scrollbar targets <html>
    const onMouseDown = (e: MouseEvent) => {
      if (e.target === document.documentElement) cancel();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [killActiveScroll]);

  // Full cleanup on unmount
  useEffect(() => {
    return () => {
      killActiveScroll();
      if (veilSafetyTimerRef.current !== null) {
        window.clearTimeout(veilSafetyTimerRef.current);
      }
      if (veilRef.current) gsap.killTweensOf(veilRef.current);
    };
  }, [killActiveScroll]);

  /* ---------- intercept anchor clicks ---------- */

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      // getAttribute (not anchor.target) so SVG <a> elements work too
      const linkTarget = anchor.getAttribute("target");
      if (
        (linkTarget && linkTarget !== "_self") ||
        anchor.hasAttribute("download") ||
        anchor.hasAttribute("data-no-smooth")
      ) {
        return;
      }

      const rawHref = anchor.getAttribute("href");
      const parsed = rawHref ? parseHref(rawHref, window.location.href) : null;
      if (!parsed) return;

      const samePath = parsed.pathname === normalizePath(window.location.pathname);

      // ---- Same-page smooth scroll ----
      if (samePath) {
        // Different query string = a real navigation; let Next.js handle it.
        if (parsed.search !== window.location.search) return;
        if (!document.getElementById(parsed.hashId)) return;

        event.preventDefault();
        event.stopPropagation();
        scrollToElementById(parsed.hashId, true);
        return;
      }

      // ---- Cross-page navigation to a section (e.g. /service#service1) ----
      event.preventDefault();
      event.stopPropagation();
      pendingHashIdRef.current = parsed.hashId;

      const destinationUrl = `${parsed.pathname}${parsed.search}#${encodeURIComponent(
        parsed.hashId
      )}`;

      if (configRef.current.routeTransitionVeil && veilRef.current) {
        setVeil(1, 0.24, () => router.push(destinationUrl));
        // Safety net: never leave the veil stuck if navigation fails
        veilSafetyTimerRef.current = window.setTimeout(() => {
          pendingHashIdRef.current = null;
          setVeil(0, 0.3);
        }, 5000);
      } else {
        router.push(destinationUrl);
      }
    };

    // CAPTURE phase is essential: Next.js <Link> calls preventDefault() in its
    // own React onClick, so a normal bubble-phase listener would see
    // `defaultPrevented` and bail out — i.e. it would never run for <Link>s.
    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [router, scrollToElementById, setVeil]);

  /* ---------- after route change / first load with a hash ---------- */

  useEffect(() => {
    const urlHashId = window.location.hash
      ? safeDecode(window.location.hash.slice(1))
      : null;

    const hashToScroll = pendingHashIdRef.current || urlHashId;

    if (!hashToScroll) {
      setVeil(0, 0.35);
      return;
    }

    // Stop the browser snapping to the hash before our glide (restored afterwards,
    // so back/forward scroll restoration keeps working on other pages).
    if ("scrollRestoration" in window.history && savedScrollRestorationRef.current === null) {
      savedScrollRestorationRef.current = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
    }

    // scrollTo(0,0) would itself animate if CSS has `scroll-behavior: smooth`
    forceInstantScrollBehavior();
    window.scrollTo(0, 0);
    restoreNativeScrollBehavior();

    const restoreHistoryScroll = () => {
      if (savedScrollRestorationRef.current !== null) {
        window.history.scrollRestoration = savedScrollRestorationRef.current;
        savedScrollRestorationRef.current = null;
      }
    };

    let cancelled = false;
    let rafId = 0;
    const startedAt = performance.now();
    const MAX_WAIT_MS = 3000; // allow async / lazy sections time to mount

    const attemptScroll = () => {
      if (cancelled) return;

      const el = document.getElementById(hashToScroll);

      if (el) {
        pendingHashIdRef.current = null;

        const go = () => {
          if (cancelled) return;
          ScrollTrigger.refresh();
          setVeil(0, 0.32);
          scrollToElementById(hashToScroll, false);
          restoreHistoryScroll();
        };

        // Fonts affect layout height, so wait for them before measuring
        if (document.fonts?.ready) {
          document.fonts.ready.then(go);
        } else {
          go();
        }
        return;
      }

      if (performance.now() - startedAt < MAX_WAIT_MS) {
        rafId = window.requestAnimationFrame(attemptScroll);
      } else {
        pendingHashIdRef.current = null;
        setVeil(0, 0.3);
        restoreHistoryScroll();
      }
    };

    rafId = window.requestAnimationFrame(attemptScroll);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      restoreHistoryScroll();
    };
  }, [pathname, scrollToElementById, setVeil, forceInstantScrollBehavior, restoreNativeScrollBehavior]);

  if (!routeTransitionVeil) return null;

  return (
    <div
      ref={veilRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-9999 bg-[#050606]/35 opacity-0 will-change-[opacity]"
    />
  );
}
