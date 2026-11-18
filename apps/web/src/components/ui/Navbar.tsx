"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: SubItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    subItems: [
      { label: "Branding", href: "/services/branding" },
      { label: "Web Design", href: "/services/web-design" },
      { label: "SEO", href: "/services/seo" },
      { label: "PPC", href: "/services/ppc" },
      { label: "Video", href: "/services/video" },
    ],
  },
  {
    label: "Work",
    href: "/work",
    subItems: [
      { label: "Case Studies", href: "/work/case-studies" },
      { label: "Portfolio", href: "/work/portfolio" },
      { label: "Client Results", href: "/work/results" },
    ],
  },
  {
    label: "About",
    href: "/about",
    subItems: [
      { label: "Our Story", href: "/about/story" },
      { label: "Team", href: "/about/team" },
      { label: "Careers", href: "/about/careers" },
    ],
  },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastItemRef = useRef<NavItem | null>(null);

  const activeItemData = NAV_ITEMS.find((item) => item.label === activeDropdown);

  if (activeItemData?.subItems) lastItemRef.current = activeItemData;
  const panelData = activeItemData?.subItems ? activeItemData : lastItemRef.current;

  useGSAP(
    () => {
      if (!panelRef.current) return;
      const isOpen = !!activeItemData?.subItems;

      if (isOpen) {
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
    { dependencies: [activeDropdown], scope: navRef }
  );

  const handleMouseEnter = (label: string, hasSubItems?: boolean) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(hasSubItems ? label : null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  return (
    <header className="fixed top-10 right-0 mr-18 z-50 w-full max-w-3xl px-4 mt-2">
      <nav
        ref={navRef}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => timeoutRef.current && clearTimeout(timeoutRef.current)}
        className="overflow-hidden bg-white/80 backdrop-blur-md text-zinc-900 rounded-[2.5rem] shadow-2xl shadow-black/10 "
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
              href="/contact"
              className="flex w-full items-center justify-center rounded-full bg-(--primary-clr) hover:bg-black hover:text-(--primary-clr) px-4 py-3.5 text-sm font-medium text-zinc-900 shadow-sm transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>

        <div
          ref={panelRef}
          style={{ height: 0, opacity: 0 }}
          aria-hidden={!activeItemData}
          className="overflow-hidden bg-zinc-900/6"
        >
          <div className="border-t border-zinc-200/60 px-8 py-6">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {panelData?.subItems?.map((sub) => (
                <li key={sub.label} className="sub-item">
                  <Link
                    href={sub.href}
                    tabIndex={activeItemData ? 0 : -1}
                    className="group/sub flex items-center gap-2 text-sm text-zinc-700 transition-colors hover:text-zinc-950"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-500 transition-all group-hover/sub:translate-x-0.5 group-hover/sub:text-(--primary-clr)" />
                    <span>{sub.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}