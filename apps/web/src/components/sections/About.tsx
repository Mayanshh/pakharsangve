"use client";

import { useState } from "react";
import CapsuleButton from "@/components/ui/Button";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import { CASE_STUDIES } from "@/data/CaseStudies";

const TESTIMONIALS = [
  {
    quote: "“Absolutely fantastic team to work with!”",
    author: "Atem Eyong",
    company: "Hard Rock Cafe",
  },
  {
    quote: "“They transformed our acquisition pipeline in under 90 days.”",
    author: "Sarah Jenkins",
    company: "Latakoo",
  },
  {
    quote: "“Sharp creative execution paired with genuine commercial focus.”",
    author: "David Miller",
    company: "WR Partners",
  },
  {
    quote: "“Zero fluff, transparent reporting, and measurable ROI.”",
    author: "Claire Bennett",
    company: "Vislink",
  },
  {
    quote: "“Feels less like an agency and more like an in-house growth team.”",
    author: "Marcus Vance",
    company: "Office Insight",
  },
  {
    quote: "“Best digital partner we have worked with to date.”",
    author: "Elena Rostova",
    company: "Applied Nutrition",
  },
];

/*
 * RESPONSIVE STRATEGY
 * -------------------
 * Every `lg:` class below is the ORIGINAL desktop/laptop value, so screens
 * >= 1024px render exactly as before.
 *
 * Below lg the two grid columns use `display: contents`, which lets the six
 * blocks flow as one list that can be re-ordered with `order-*`. That gives
 * phones the natural reading order:
 *   "Our latest work" heading -> 4 case studies -> testimonial
 * (Without it, the heading would appear after the first two cards.)
 */
export default function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const topFourCaseStudies = CASE_STUDIES.slice(0, 4);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = TESTIMONIALS[activeSlide];

  return (
    <main id="about" className="relative min-h-screen w-full py-12 sm:py-16 bg-(--bg) flex flex-col items-center justify-start overflow-x-hidden">
      {/* Top Editorial Intro Block */}
      <div className="w-full px-6 md:px-20 flex flex-col items-start md:items-end justify-start">
        <p className="text-black w-full lg:max-w-7xl leading-[1.4] text-2xl sm:text-3xl md:text-4xl text-left md:text-right font-normal">
          Our team is made up of{" "}
          <span className="inline sm:inline-block box-decoration-clone px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            bold creatives
          </span>
          ,{" "}
          <span className="inline sm:inline-block box-decoration-clone px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            sharp strategists
          </span>
          , and{" "}
          <span className="inline sm:inline-block box-decoration-clone px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            technical pros
          </span>{" "}
          who care deeply about what they do. No egos, no fluff – just hard
          work, smart thinking, and a{" "}
          <span className="inline sm:inline-block box-decoration-clone px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            genuine commitment
          </span>{" "}
          to our clients’ success. We treat every brand and budget like it’s our
          own,{" "}
          <span className="inline sm:inline-block box-decoration-clone px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            always deliver on promises
          </span>
          , and never lock clients into contracts.
        </p>

        <div className="w-fit h-fit flex items-center justify-center mt-8 md:mt-12">
          <CapsuleButton text="About us" href="/about" />
        </div>
      </div>

      {/* Full-Width Rounded Black Showcase Section */}
      <section className="relative mx-auto mt-16 sm:mt-28 lg:mt-36 w-full max-w-[1800px] bg-black flex flex-col justify-between overflow-hidden rounded-4xl lg:rounded-[3rem] px-6 py-14 sm:px-10 lg:px-16 lg:py-24 text-white">
        {/* 2-Column Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start w-full">
          {/* Left Column */}
          <div className="contents lg:flex lg:flex-col lg:gap-16">
            {topFourCaseStudies[0] && (
              <CaseStudyCard
                title={topFourCaseStudies[0].title}
                description={topFourCaseStudies[0].summary}
                tags={[topFourCaseStudies[0].category]}
                imageSrc={topFourCaseStudies[0].heroImage}
                href={`/case-studies/${topFourCaseStudies[0].slug}`}
                hoverColor="#f3f3f37e"
                hoverTextColor="#0a0a0a"
              />
            )}

            {topFourCaseStudies[1] && (
              <CaseStudyCard
                title={topFourCaseStudies[1].title}
                description={topFourCaseStudies[1].summary}
                tags={[topFourCaseStudies[1].category]}
                imageSrc={topFourCaseStudies[1].heroImage}
                href={`/case-studies/${topFourCaseStudies[1].slug}`}
                hoverColor="#f3f3f37e"
                hoverTextColor="#0a0a0a"
              />
            )}

            {/* Testimonial + Inline Pagination Controls (Matches Screenshot 3) */}
            <div className="order-last lg:order-0 flex flex-col justify-between gap-10 pt-2 sm:pt-8 lg:pt-14 max-w-xl">
              <div className="flex flex-col gap-5">
                <blockquote className="text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight leading-[1.15]">
                  {currentTestimonial.quote}
                </blockquote>
                <div className="text-base sm:text-lg text-(--primary-clr)">
                  {currentTestimonial.author}:{" "}
                  <span className="font-semibold text-white">
                    {currentTestimonial.company}
                  </span>
                </div>
              </div>

              {/* Controls directly below testimonial */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 lg:w-10 lg:h-10 rounded-full bg-(--primary-clr) hover:bg-[#ffa06a] active:scale-95 text-neutral-950 flex items-center justify-center transition-all cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 12H5m7 7l-7-7 7-7"
                    />
                  </svg>
                </button>

                <span className="text-base font-medium tracking-wider text-white min-w-[3ch] text-center">
                  {activeSlide + 1}/{TESTIMONIALS.length}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-11 h-11 lg:w-10 lg:h-10 rounded-full bg-(--primary-clr) hover:bg-[#ffa06a] active:scale-95 text-neutral-950 flex items-center justify-center transition-all cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-7 7l7-7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="contents lg:flex lg:flex-col lg:gap-16">
            {/* Header & Intro Block */}
            <div className="order-first lg:order-0 flex flex-col items-start gap-5 max-w-xl pb-0 sm:pb-4">
              <div className="flex items-center gap-4">
                <span className="w-5 h-5 rounded-full bg-white inline-block shrink-0" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white">
                  Our latest work
                </h2>
              </div>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                Marino is a Manchester based digital marketing agency built for
                brands that want serious growth.
              </p>
              <a
                href="/case-studies"
                className="group inline-flex items-center gap-3 text-base font-medium text-lime-300 hover:text-lime-100 transition-colors mt-1"
              >
                <span>View all work</span>
                <svg
                  className="w-12 h-4 overflow-visible transition-transform duration-300 group-hover:translate-x-1.5"
                  viewBox="0 0 56 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                >
                  <line x1="0" y1="6" x2="53" y2="6" />
                  <polyline points="48 1.5 53.5 6 48 10.5" />
                </svg>
              </a>
            </div>

            {topFourCaseStudies[2] && (
              <CaseStudyCard
                title={topFourCaseStudies[2].title}
                description={topFourCaseStudies[2].summary}
                tags={[topFourCaseStudies[2].category]}
                imageSrc={topFourCaseStudies[2].heroImage}
                href={`/case-studies/${topFourCaseStudies[2].slug}`}
                hoverColor="#f3f3f37e"
                hoverTextColor="#0a0a0a"
              />
            )}

            {topFourCaseStudies[3] && (
              <CaseStudyCard
                title={topFourCaseStudies[3].title}
                description={topFourCaseStudies[3].summary}
                tags={[topFourCaseStudies[3].category]}
                imageSrc={topFourCaseStudies[3].heroImage}
                href={`/case-studies/${topFourCaseStudies[3].slug}`}
                hoverColor="#f3f3f37e"
                hoverTextColor="#0a0a0a"
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}