"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SERVICES } from "@/data/Services";
import { PRODUCTS } from "@/data/Products";
import { CASE_STUDIES } from "@/data/CaseStudies";

interface SubItem {
  label: string;
  href: string;
}

interface FeaturedPreview {
  title: string;
  image: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: SubItem[];
  featured?: FeaturedPreview[];
}



const services = Object.values(SERVICES)
const products = Object.values(PRODUCTS)
const caseStudies = Object.values(CASE_STUDIES)


const NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Resources",
    href: "/resources",
    subItems: [
      { label: "Open Vault", href: "/learn" },
      { label: "Pro Playbooks", href: "/learn" },
      { label: "Month in a Nutshell", href: "/resources/month-in-a-nutshell" },
      { label: "Blogs", href: "/blog" },
    ],
    featured: [
      {
        title: "How A Catchy Line Started A Cultural Conversation",
        image: products[0].previews[0].src,
        href: "/learn",
      },
      {
        title: "Sharpest Moment Marketing Breakdown & Strategy",
        image: products[0].previews[1].src,
        href: "/learn",
      },
    ],
  },
  {
    label: "Services",
    href: "/#services",
    subItems: [
      { label: "Branding", href: "/#branding" },
      { label: "Web Design", href: "/#web-design" },
      { label: "SEO", href: "/#seo" },
      { label: "PPC", href: "/#ppc" },
    ],
    featured: [
      {
        title: "Distinctive brands built with clarity.",
        image: services[0].heroImage,
        href: "/services/branding",
      },
      {
        title: "Sharpest Moment Marketing Breakdown & Strategy",
        image: services[1].heroImage,
        href: "/services/ppc",
      },
    ],
  },
    {
    label: "Work",
    href: "/case-studies",
    subItems: [{ label: "Case Studies", href: "/case-studies" }],
    featured: [
      {
        title: "Distinctive brands built with clarity.",
        image: caseStudies[0].heroImage,
        href: `/case-studies/${caseStudies[0].slug}`,
      },
      {
        title: "Sharpest Moment Marketing Breakdown & Strategy",
        image: caseStudies[1].heroImage,
        href: `/case-studies/${caseStudies[1].slug}`,
      },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();

  /* ---------------- desktop ---------------- */
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastItemRef = useRef<NavItem | null>(null);

  /* ---------------- mobile / tablet ---------------- */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const activeItemData = NAV_ITEMS.find((item) => item.label === activeDropdown);
  const hasOpenDesktopPanel = !!activeItemData?.subItems;

  if (activeItemData?.subItems) {
    lastItemRef.current = activeItemData;
  }
  const panelData = hasOpenDesktopPanel ? activeItemData : lastItemRef.current;

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useGSAP(
    () => {
      if (!panelRef.current) return;

      if (hasOpenDesktopPanel) {
        gsap.to(panelRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.fromTo(
          ".sub-item",
          { opacity: 0, y: -6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
            stagger: 0.04,
            overwrite: "auto",
          }
        );
      } else {
        gsap.to(panelRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      }
    },
    { dependencies: [hasOpenDesktopPanel, activeDropdown], scope: navRef }
  );

  useGSAP(
    () => {
      const panel = mobilePanelRef.current;
      if (!panel) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (mobileOpen) {
        gsap.to(panel, {
          height: "auto",
          autoAlpha: 1,
          duration: reduce ? 0 : 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.fromTo(
          ".m-item",
          { opacity: 0, y: -6 },
          {
            opacity: 1,
            y: 0,
            duration: reduce ? 0 : 0.35,
            ease: "power3.out",
            stagger: reduce ? 0 : 0.04,
            overwrite: "auto",
          }
        );
      } else {
        gsap.to(panel, {
          height: 0,
          autoAlpha: 0,
          duration: reduce ? 0 : 0.3,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      }
    },
    { dependencies: [mobileOpen], scope: mobileRef }
  );

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const startY = window.scrollY;

    const onPointerDown = (e: PointerEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 12) setMobileOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onBreakpoint);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onBreakpoint);
      clearCloseTimeout();
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string, hasSubItems?: boolean) => {
    clearCloseTimeout();
    setActiveDropdown(hasSubItems ? label : null);
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const toggleMobile = () => {
    if (!mobileOpen) setMobileExpanded(null);
    setMobileOpen((prev) => !prev);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-3 right-0 z-50 w-full px-3 pointer-events-none sm:top-4 sm:px-4 lg:pointer-events-auto lg:top-10 lg:mr-18 lg:max-w-3xl lg:px-4 lg:mt-2">
      {/* ============ Desktop / laptop navbar (lg and up) ============ */}
      <nav
        ref={navRef}
        aria-label="Primary"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={clearCloseTimeout}
        className="hidden lg:block overflow-hidden bg-white/80 backdrop-blur-md text-zinc-900 rounded-[2.5rem] shadow-2xl shadow-black/10"
      >
        <div className="flex items-stretch w-full gap-2 p-2.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeDropdown === item.label;
            return (
              <div
                key={item.label}
                onMouseEnter={() => handleMouseEnter(item.label, !!item.subItems)}
                className="flex-1 min-w-0"
              >
                <Link
                  href={item.href}
                  onClick={() => setActiveDropdown(null)}
                  className={`group/btn relative flex w-full items-center justify-center overflow-hidden rounded-full px-4 py-3.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-zinc-200/70 text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900"
                  }`}
                >
                  <span className="relative inline-block">
                    {item.label}

                    <span
                      aria-hidden
                      className={`pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 transition-[transform,opacity] ${
                        isActive
                          ? "translate-x-0 opacity-100 duration-300 ease-out"
                          : "translate-x-12 opacity-0 duration-150 ease-in group-hover/btn:translate-x-0 group-hover/btn:opacity-100 group-hover/btn:duration-300 group-hover/btn:ease-out"
                      }`}
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--primary-clr) text-zinc-900">
                        <ArrowRight
                          className={`h-3 w-3 transition-transform duration-300 ease-out ${
                            isActive ? "rotate-90" : ""
                          }`}
                        />
                      </span>
                    </span>
                  </span>
                </Link>
              </div>
            );
          })}

          <div
            onMouseEnter={() => handleMouseEnter("contact", false)}
            className="flex-1 min-w-0"
          >
            <Link
              href="/#contact"
              onClick={() => setActiveDropdown(null)}
              className="flex w-full items-center justify-center rounded-full bg-(--primary-clr) hover:bg-black hover:text-(--primary-clr) px-4 py-3.5 text-sm font-medium text-zinc-900 shadow-sm transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>

        <div
          ref={panelRef}
          style={{ height: 0, opacity: 0 }}
          aria-hidden={!hasOpenDesktopPanel}
          className="overflow-hidden bg-zinc-900/6"
        >
          <div className="border-t border-zinc-200/60 px-8 py-6">
            {panelData?.featured ? (
              <div className="grid grid-cols-12 gap-6 items-start">
                <ul className="col-span-4 flex flex-col gap-3.5 pt-1">
                  {panelData.subItems?.map((sub) => (
                    <li key={sub.label} className="sub-item">
                      <Link
                        href={sub.href}
                        onClick={() => setActiveDropdown(null)}
                        tabIndex={hasOpenDesktopPanel ? 0 : -1}
                        className="group/sub flex items-center gap-2 text-base font-medium text-zinc-800 transition-colors hover:text-zinc-950"
                      >
                        <ArrowRight className="h-3.5 w-3.5 text-zinc-500 transition-all group-hover/sub:translate-x-0.5 group-hover/sub:text-(--primary-clr)" />
                        <span>{sub.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="col-span-8 grid grid-cols-2 gap-4">
                  {panelData.featured.map((card) => (
                    <Link
                      key={card.title}
                      href={card.href}
                      onClick={() => setActiveDropdown(null)}
                      tabIndex={hasOpenDesktopPanel ? 0 : -1}
                      className="sub-item group/card flex flex-col gap-2"
                    >
                      <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-zinc-200">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="240px"
                          className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                        />
                      </div>
                      <p className="text-xs font-medium leading-snug text-zinc-800 group-hover/card:text-black line-clamp-2">
                        {card.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {panelData?.subItems?.map((sub) => (
                  <li key={sub.label} className="sub-item">
                    <Link
                      href={sub.href}
                      onClick={() => setActiveDropdown(null)}
                      tabIndex={hasOpenDesktopPanel ? 0 : -1}
                      className="group/sub flex items-center gap-2 text-sm text-zinc-700 transition-colors hover:text-zinc-950"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-500 transition-all group-hover/sub:translate-x-0.5 group-hover/sub:text-(--primary-clr)" />
                      <span>{sub.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* ============ Mobile / tablet menu (below lg) ============ */}
      <div ref={mobileRef} className="lg:hidden flex flex-col items-end gap-2">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={toggleMobile}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-zinc-900 shadow-2xl shadow-black/10 transition-transform duration-200 active:scale-95"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div
          id="mobile-menu"
          ref={mobilePanelRef}
          style={{ height: 0, opacity: 0, visibility: "hidden" }}
          aria-hidden={!mobileOpen}
          className="pointer-events-auto w-full sm:max-w-sm overflow-hidden rounded-4xl bg-white/90 backdrop-blur-md text-zinc-900 shadow-2xl shadow-black/10"
        >
          <div className="p-2.5">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const hasSub = !!item.subItems;
                const isExpanded = mobileExpanded === item.label;
                return (
                  <li key={item.label} className="m-item">
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="flex-1 min-w-0 rounded-full px-5 py-3.5 text-base font-medium text-zinc-700 transition-colors duration-200 active:bg-zinc-200/60"
                      >
                        {item.label}
                      </Link>

                      {hasSub && (
                        <button
                          type="button"
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label} links`}
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setMobileExpanded(isExpanded ? null : item.label)
                          }
                          className="mr-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 active:bg-zinc-200/60"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--primary-clr) text-zinc-900">
                            <ArrowRight
                              className={`h-3 w-3 transition-transform duration-300 ease-out ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </span>
                        </button>
                      )}
                    </div>

                    {hasSub && (
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <ul
                          aria-hidden={!isExpanded}
                          className="min-h-0 overflow-hidden"
                        >
                          {item.subItems!.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                onClick={closeMobile}
                                tabIndex={isExpanded ? 0 : -1}
                                className="flex items-center gap-2 rounded-full py-2.5 pl-9 pr-5 text-sm text-zinc-600 transition-colors active:bg-zinc-200/60 active:text-zinc-950"
                              >
                                <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
                                <span>{sub.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <Link
              href="/#contact"
              onClick={closeMobile}
              className="m-item mt-2 flex w-full items-center justify-center rounded-full bg-(--primary-clr) px-4 py-3.5 text-sm font-medium text-zinc-900 shadow-sm transition-colors duration-200 active:bg-black active:text-(--primary-clr)"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}