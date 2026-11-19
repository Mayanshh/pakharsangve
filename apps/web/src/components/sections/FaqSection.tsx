"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  defaultOpenId?: string | null;
  className?: string;
}

const DEFAULT_FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-services",
    question: "What digital marketing services does Pakharsangve offer?",
    answer:
      "We deliver full-funnel digital growth across technical SEO, paid search and social acquisition, conversion rate optimization, brand positioning, and performance-focused web development.",
  },
  {
    id: "faq-strategies",
    question: "How does Marino build marketing strategies?",
    answer:
      "Every strategy starts with commercial diagnostics—auditing unit economics, search demand, audience intent, and conversion bottlenecks—before mapping prioritized execution sprints tied directly to revenue.",
  },
  {
    id: "faq-different",
    question: "What makes Marino different from other agencies?",
    answer:
      "Senior specialists stay hands-on from strategy through execution, pairing clear commercial accountability with rapid creative and technical iteration rather than bloated retainers or vanity reporting.",
  },
  {
    id: "faq-queries",
    question: "How does Marino build marketing strategies?",
    answer:
      "Every strategy starts with commercial diagnostics—auditing unit economics, search demand, audience intent, and conversion bottlenecks—before mapping prioritized execution sprints tied directly to revenue.",
  },
  {
    id: "faq-ways",
    question: "What digital marketing services does Pakharsangve offer?",
    answer:
      "We deliver full-funnel digital growth across technical SEO, paid search and social acquisition, conversion rate optimization, brand positioning, and performance-focused web development.",
  },
  {
    id: "faq-solutions",
    question: "What makes Marino different from other agencies?",
    answer:
      "Senior specialists stay hands-on from strategy through execution, pairing clear commercial accountability with rapid creative and technical iteration rather than bloated retainers or vanity reporting.",
  }
];

export default function FaqSection({
  heading = "Frequently asked questions",
  description = "An independent agency in Manchester, founded in 2015, building brands, websites, and marketing that improve the bottom line.",
  items = DEFAULT_FAQ_ITEMS,
  defaultOpenId = null,
  className = "",
}: FaqSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const innerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-row-reveal", {
        y: 16,
        opacity: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    items.forEach((item) => {
      const wrapper = contentRefs.current[item.id];
      const inner = innerRefs.current[item.id];
      if (!wrapper || !inner) return;

      const isOpen = openId === item.id;
      gsap.killTweensOf([wrapper, inner]);

      if (isOpen) {
        gsap.to(wrapper, {
          height: inner.offsetHeight,
          duration: 0.45,
          ease: "power3.out",
          onComplete: () => {
            if (openId === item.id) {
              gsap.set(wrapper, { height: "auto" });
            }
          },
        });
        gsap.to(inner, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          delay: 0.05,
          ease: "power2.out",
        });
      } else {
        gsap.set(wrapper, { height: wrapper.offsetHeight });
        gsap.to(inner, {
          opacity: 0,
          y: -4,
          duration: 0.2,
          ease: "power2.in",
        });
        gsap.to(wrapper, {
          height: 0,
          duration: 0.36,
          ease: "power3.inOut",
        });
      }
    });
  }, [openId, items]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="faq-section-heading"
      className={`w-full bg-[#F5F5F4] text-[#111315] py-16 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-345 px-5 sm:px-10 lg:px-14">
        {/* Top Right-Aligned Heading Block */}
        <div className="faq-row-reveal flex flex-col items-end text-right mb-14 sm:mb-20">
          <div className="flex items-center justify-end gap-3.5 sm:gap-4">
            <h2
              id="faq-section-heading"
              className="text-2xl sm:text-3xl lg:text-[3rem] font-normal tracking-tight text-[#111315]"
            >
              {heading}
            </h2>
            <span
              aria-hidden="true"
              className="inline-block h-4 w-4 sm:h-4.5 sm:w-4.5 rounded-full bg-[#090A0C] shrink-0"
            />
          </div>

          <p className="mt-3 max-w-88 text-md sm:text-[1rem] leading-[1.2] text-[#3F3F46]">
            {description}
          </p>
        </div>

        {/* Full-Width Divider Question Rows */}
        <div className="w-full">
          {items.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="faq-row-reveal border-b border-[#D4D4D8]/80"
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${item.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    className="group flex w-full items-center justify-between gap-6 py-5 sm:py-9 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111315]"
                  >
                    <span className="text-lg sm:text-xl lg:text-[1.85rem] font-normal tracking-[-0.015em] text-[#18181B]">
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-lime-300 group-hover:bg-lime-500 text-[#111315] transition-colors duration-200"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`h-4 w-4 stroke-current transition-transform duration-300 ease-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <path
                          d="M8 3V13M8 13L4 9M8 13L12 9"
                          strokeWidth="1.35"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  ref={(el) => {
                    contentRefs.current[item.id] = el;
                  }}
                  style={{
                    height: defaultOpenId === item.id ? "auto" : 0,
                    overflow: "hidden",
                  }}
                >
                  <div
                    ref={(el) => {
                      innerRefs.current[item.id] = el;
                    }}
                    style={{
                      opacity: defaultOpenId === item.id ? 1 : 0,
                    }}
                    className="pb-6 sm:pb-8 pr-12 max-w-210"
                  >
                    <p className="text-sm sm:text-base leading-[1.65] text-[#52525B]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}