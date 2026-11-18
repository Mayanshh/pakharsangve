"use client";

import { useState } from "react";
import CapsuleButton from "@/components/ui/Button";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

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

export default function AboutSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = TESTIMONIALS[activeSlide];

  return (
    <main className="relative min-h-screen w-full py-16 bg-var(--bg) flex flex-col items-center justify-start overflow-x-hidden">
      {/* Top Editorial Intro Block */}
      <div className="w-full px-6 md:px-20 flex flex-col items-end justify-start">
        <p className="text-black w-full lg:max-w-7xl leading-[1.4] text-2xl sm:text-3xl md:text-4xl text-right font-normal">
          Our team is made up of{" "}
          <span className="inline-block px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            bold creatives
          </span>
          ,{" "}
          <span className="inline-block px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            sharp strategists
          </span>
          , and{" "}
          <span className="inline-block px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            technical pros
          </span>{" "}
          who care deeply about what they do. No egos, no fluff – just hard
          work, smart thinking, and a{" "}
          <span className="inline-block px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            genuine commitment
          </span>{" "}
          to our clients’ success. We treat every brand and budget like it’s our
          own,{" "}
          <span className="inline-block px-3.5 py-0.5 mx-1 bg-lime-300 rounded-full">
            always deliver on promises
          </span>
          , and never lock clients into contracts.
        </p>

        <div className="w-fit h-fit flex items-center justify-center mt-12">
          <CapsuleButton text="About us" href="/about" />
        </div>
      </div>

      {/* Full-Width Rounded Black Showcase Section */}
      <section className="relative mx-auto mt-28 lg:mt-36 w-full max-w-[1800px] bg-black flex flex-col justify-between overflow-hidden rounded-4xl lg:rounded-[3rem] px-6 py-14 sm:px-10 lg:px-16 lg:py-24 text-white">
        {/* 2-Column Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-10 lg:gap-16">
            <CaseStudyCard
              title="Latakoo"
              description="Latakoo is a specialist video workflow platform helping broadcasters, content creators, and media organisations move content faster and more efficiently."
              tags={["Branding", "Web Design", "SEO", "PPC"]}
              imageSrc="https://cdn.pixabay.com/photo/2026/10/25/20/48/20-48-41-341_1280.jpg"
              href="/work/latakoo"
              hoverColor="#ffa06a"
              hoverTextColor="#0a0a0a"
            />

            <CaseStudyCard
              title="Vislink"
              description="Vislink is a global technology leader in the capture, delivery, and management of high-quality live video communications."
              tags={["Branding", "Web Design", "SEO", "PPC", "Video"]}
              imageSrc="https://cdn.pixabay.com/photo/2026/10/25/20/48/20-48-41-341_1280.jpg"
              href="/work/vislink"
              hoverColor="#ffa06a"
              hoverTextColor="#0a0a0a"
            />

            {/* Testimonial + Inline Pagination Controls (Matches Screenshot 3) */}
            <div className="flex flex-col justify-between gap-10 pt-8 lg:pt-14 max-w-xl">
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
                  className="w-10 h-10 rounded-full bg-(--primary-clr) hover:bg-[#ffa06a] active:scale-95 text-neutral-950 flex items-center justify-center transition-all cursor-pointer"
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
                  className="w-10 h-10 rounded-full bg-(--primary-clr) hover:bg-[#ffa06a] active:scale-95 text-neutral-950 flex items-center justify-center transition-all cursor-pointer"
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
          <div className="flex flex-col gap-10 lg:gap-16">
            {/* Header & Intro Block */}
            <div className="flex flex-col items-start gap-5 max-w-xl pb-4">
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
                href="/work"
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

            <CaseStudyCard
              title="WR Partners"
              description="WR Partners are a leading firm of accountants, auditors, business advisors, and tax specialists, with five locations and a team of more..."
              tags={["Branding", "Web Design", "SEO", "PPC", "Video"]}
              imageSrc="https://cdn.pixabay.com/photo/2026/10/25/20/48/20-48-41-341_1280.jpg"
              href="/work/wr-partners"
              hoverColor="#d8f999"
              hoverTextColor="#0a0a0a"
            />

            <CaseStudyCard
              title="Office Insight"
              description="Office Insight creates inspiring workplace interiors, combining strategic interior design with commercial office fit-outs."
              tags={["Web Design", "SEO", "PPC"]}
              imageSrc="https://cdn.pixabay.com/photo/2026/10/25/20/48/20-48-41-341_1280.jpg"
              href="/work/office-insight"
              hoverColor="#d8f999"
              hoverTextColor="#0a0a0a"
            />
          </div>
        </div>
      </section>
    </main>
  );
}