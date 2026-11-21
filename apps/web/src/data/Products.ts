export type ProductCategory =
  | "All"
  | "Guides"
  | "Templates"
  | "Courses"
  | "Mentorship";

export interface ProductModule {
  number: string;
  title: string;
  durationOrScope: string;
  description: string;
  topics: string[];
}

export interface ProductDeliverable {
  title: string;
  detail: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductPreviewItem {
  src: string;
  alt: string;
  caption: string;
}

export interface DigitalProduct {
  slug: string;
  category: Exclude<ProductCategory, "All">;
  badge?: string;
  featured?: boolean;
  title: string;
  subtitle: string;
  summary: string;
  price: string;
  originalPrice?: string;
  billingNote: string;
  deliveryFormat: string;
  level: "All Levels" | "Intermediate" | "Advanced" | "1:1 Tailored";
  durationOrSize: string;
  lastUpdated: string;
  heroImage: string;
  checkoutUrl: string;
  secondaryCta?: {
    label: string;
    href: string;
  };
  highlights: string[];
  outcomes: string[];
  deliverables: ProductDeliverable[];
  curriculum: ProductModule[];
  previews: ProductPreviewItem[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  faqs: ProductFaq[];
}

export const PRODUCTS: DigitalProduct[] = [
  {
    slug: "editorial-web-systems-template-kit",
    category: "Templates",
    badge: "Most Popular",
    featured: true,
    title: "Editorial Studio & Agency System (Next.js + Tailwind)",
    subtitle:
      "Production-ready portfolio, case study, and journal architecture engineered for speed and visual restraint.",
    summary:
      "Skip months of boilerplate setup. This modular Next.js & TypeScript template kit includes switchable detail layouts, asymmetric bento grids, smooth scroll navigation, and responsive media pipelines.",
    price: "₹4,999",
    originalPrice: "₹7,500",
    billingNote: "One-time payment • Lifetime updates",
    deliveryFormat: "GitHub Repo + Figma Tokens",
    level: "Intermediate",
    durationOrSize: "28 Components • 6 Route Systems",
    lastUpdated: "Nov 2026",
    heroImage: "/images/img1.jpg",
    checkoutUrl: "/#contact",
    secondaryCta: {
      label: "View Live Case Studies",
      href: "/case-studies",
    },
    highlights: [
      "Full Next.js App Router + TypeScript codebase",
      "3 switchable Case Study templates controlled via one flag",
      "Asymmetric Bento Grid & Editorial Journal templates",
      "Commercial license for unlimited client & personal sites",
    ],
    outcomes: [
      "Launch a custom, Awwwards-caliber studio or personal flagship in days instead of months.",
      "Maintain strict 99+ Lighthouse performance and zero Cumulative Layout Shift out of the box.",
      "Customize colors, typography, and layout variants from centralized data files.",
    ],
    deliverables: [
      {
        title: "Production Next.js & TypeScript Repository",
        detail: "Clean, modular folder structure with zero bloated dependencies and strict TypeScript types.",
      },
      {
        title: "Design Tokens & Surface Presets",
        detail: "Warm editorial light mode paired with high-contrast #121212 obsidian & lime-300 dark sections.",
      },
      {
        title: "Interactive Detail Layouts",
        detail: "Sticky split-rail dossiers, FAQ accordions, reading progress bars, and responsive galleries.",
      },
      {
        title: "Deployment & Customization Guide",
        detail: "Step-by-step documentation for Vercel deployment, SEO metadata, and asset optimization.",
      },
    ],
    curriculum: [
      {
        number: "01",
        title: "Foundation, Tokens & Typography Scale",
        durationOrScope: "Setup & Globals",
        description:
          "Configure fluid display headlines, surface variables, and responsive spacing rules.",
        topics: [
          "CSS custom properties (--bg, --primary-clr)",
          "Responsive typographic hierarchy",
          "Accessible focus & selection states",
        ],
      },
      {
        number: "02",
        title: "Bento Grids & Data-Driven Templates",
        durationOrScope: "Core Architecture",
        description:
          "Drive entire page layouts from typed data modules without duplicating JSX.",
        topics: [
          "Asymmetric 12-column bento spans",
          "Global template switching patterns",
          "Next.js 16 Suspense & static params",
        ],
      },
      {
        number: "03",
        title: "Kinetic Polish & Media Optimization",
        durationOrScope: "Performance",
        description:
          "Keep animations locked to compositor properties and right-size images across viewports.",
        topics: [
          "GPU-friendly hover & reveal transitions",
          "LCP priority & responsive sizes hints",
          "Video fallback and poster handling",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img2.jpg",
        alt: "Editorial layout grid preview",
        caption: "Modular section rhythm with clean surface polarity.",
      },
      {
        src: "/images/img4.jpg",
        alt: "Sticky split-rail detail view preview",
        caption: "Desktop sticky summary rail paired with long-form proof.",
      },
    ],
    testimonial: {
      quote:
        "Saved us at least four weeks of architecture work on our agency relaunch—and clients immediately noticed the polish.",
      author: "Rohan Deshmukh",
      role: "Creative Director",
    },
    faqs: [
      {
        question: "Can I use this template for paid client projects?",
        answer:
          "Yes. Your license covers unlimited personal and commercial client websites without recurring fees.",
      },
      {
        question: "Which version of Next.js and Tailwind does it use?",
        answer:
          "It is built for Next.js 15/16 App Router, React 19, TypeScript, and Tailwind CSS v4.",
      },
      {
        question: "Do I get future component updates?",
        answer:
          "Yes, all future refinements and new section blocks added to the repository are included at no extra cost.",
      },
    ],
  },
  {
    slug: "kinetic-ui-and-motion-engineering-course",
    category: "Courses",
    badge: "Cohort + Self-Paced",
    title: "Kinetic UI & Design Engineering Masterclass",
    subtitle:
      "Bridge the gap between art direction and production frontend engineering with real-world builds.",
    summary:
      "A comprehensive, hands-on video curriculum teaching how to design, architect, and engineer fluid, high-converting web experiences from first wireframe to production deployment.",
    price: "₹8,999",
    originalPrice: "₹12,000",
    billingNote: "One-time enrollment • Lifetime access",
    deliveryFormat: "4K Video Lessons + Source Code",
    level: "Intermediate",
    durationOrSize: "18 Hours • 34 Lessons • 4 Capstone Builds",
    lastUpdated: "Nov 2026",
    heroImage: "/images/img5.jpg",
    checkoutUrl: "/#contact",
    secondaryCta: {
      label: "Download Syllabus Overview",
      href: "/#contact",
    },
    highlights: [
      "34 structured 4K lessons with zero filler",
      "Complete source repositories for every capstone project",
      "Frame-by-frame motion choreography & performance profiling",
      "Private Discord critique channel & monthly live Q&A",
    ],
    outcomes: [
      "Translate static Figma concepts into tactile, 60fps interactive interfaces.",
      "Master layout rhythm, micro-interactions, scroll pacing, and responsive typography.",
      "Debug main-thread bottlenecks and ship production apps that feel effortless on mobile.",
    ],
    deliverables: [
      {
        title: "34 High-Definition Video Modules",
        detail: "Focused 15–30 minute lessons covering architecture, styling, motion, and profiling.",
      },
      {
        title: "4 Complete Capstone Repositories",
        detail: "Build a luxury lookbook, a SaaS interactive flagship, a bento archive, and a store.",
      },
      {
        title: "Motion Easing & Timing Cheatsheet",
        detail: "Battle-tested cubic-bezier curves, spring parameters, and duration guidelines.",
      },
    ],
    curriculum: [
      {
        number: "01",
        title: "Editorial Layout & Visual Hierarchy",
        durationOrScope: "6 Lessons • 3.5 hrs",
        description:
          "Establish proportion, contrast, and typographic authority before writing a single animation.",
        topics: [
          "Grid tension & asymmetric balance",
          "Display vs. reading type scales",
          "Surface contrast without visual clutter",
        ],
      },
      {
        number: "02",
        title: "Choreography, Scroll & Micro-Interactions",
        durationOrScope: "12 Lessons • 6.5 hrs",
        description:
          "Craft intentional hover states, sticky rails, progress indicators, and smooth transitions.",
        topics: [
          "Compositor-only animation patterns",
          "Sticky split-screen storytelling",
          "Accessible reduced-motion fallbacks",
        ],
      },
      {
        number: "03",
        title: "Production Performance & Real-World Shipping",
        durationOrScope: "16 Lessons • 8.0 hrs",
        description:
          "Optimize Core Web Vitals, Next.js caching boundaries, and media pipelines for real traffic.",
        topics: [
          "Eliminating layout shifts & hydration lag",
          "Responsive image & video optimization",
          "End-to-end capstone deployment",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img7.jpg",
        alt: "Course capstone motion study",
        caption: "Capstone 02: Dark-mode hardware launch experience.",
      },
      {
        src: "/images/img8.jpg",
        alt: "Course editorial layout project",
        caption: "Capstone 03: Architectural monograph & archive.",
      },
    ],
    testimonial: {
      quote:
        "The single clearest bridge between design taste and clean React/TypeScript execution I have taken.",
      author: "Ananya Kulkarni",
      role: "Frontend Engineer",
    },
    faqs: [
      {
        question: "Do I need prior animation library experience?",
        answer:
          "Basic familiarity with React, HTML/CSS, and Tailwind is enough—we build every interaction from first principles.",
      },
      {
        question: "Is the course self-paced or live?",
        answer:
          "All 34 lessons are available immediately on demand, paired with optional monthly live Q&A and portfolio review sessions.",
      },
    ],
  },
  {
    slug: "high-converting-agency-playbook-guide",
    category: "Guides",
    badge: "Digital Handbook",
    title: "The Independent Studio & Client Acquisition Playbook",
    subtitle:
      "Positioning, cold outreach frameworks, scoping proposals, and pricing high-trust digital projects.",
    summary:
      "A 140-page practical manual distilling real outreach systems, proposal structures, discovery call scripts, and pricing tiers for independent developers and design studios.",
    price: "₹1,499",
    originalPrice: "₹2,499",
    billingNote: "One-time purchase • Instant download",
    deliveryFormat: "PDF + Notion Workspace + Scripts",
    level: "All Levels",
    durationOrSize: "140 Pages • 18 Templates & Scripts",
    lastUpdated: "Oct 2026",
    heroImage: "/images/img3.jpg",
    checkoutUrl: "/#contact",
    highlights: [
      "140-page illustrated PDF manual (Desktop & Tablet editions)",
      "Copy-paste Notion CRM, proposal, and scope-of-work templates",
      "Outbound audit pitch scripts for hospitality, SaaS, and D2C",
      "Value-based pricing calculator & milestone payment schedules",
    ],
    outcomes: [
      "Stop competing on hourly rates and anchor engagements around measurable business outcomes.",
      "Run structured 25-minute discovery calls that qualify budget and decision-makers effortlessly.",
      "Send crisp, executive-ready proposals that close faster with fewer revision loops.",
    ],
    deliverables: [
      {
        title: "140-Page Editorial Playbook (PDF)",
        detail: "Zero-fluff chapters covering positioning, outbound systems, sales calls, and delivery.",
      },
      {
        title: "Notion Agency Operating System",
        detail: "Ready-to-duplicate client pipeline, project tracker, and onboarding checklists.",
      },
      {
        title: "Proposal & Scope Statement Pack",
        detail: "Modular scope templates protecting against scope creep while building client trust.",
      },
    ],
    curriculum: [
      {
        number: "01",
        title: "Niche Positioning & Flagship Proof",
        durationOrScope: "Chapters 1–3",
        description:
          "Craft a sharp market angle and structure case studies that pre-sell your expertise.",
        topics: [
          "Turning technical skills into commercial outcomes",
          "Structuring high-trust portfolio proof",
          "Eliminating generic agency buzzwords",
        ],
      },
      {
        number: "02",
        title: "Repeatable Outbound & Discovery Calls",
        durationOrScope: "Chapters 4–6",
        description:
          "Build a disciplined outreach engine and lead calm, consultative sales conversations.",
        topics: [
          "Loom & teardown outreach frameworks",
          "Discovery call question bank",
          "Handling budget and timeline objections",
        ],
      },
      {
        number: "03",
        title: "Pricing, Proposals & Retainers",
        durationOrScope: "Chapters 7–9",
        description:
          "Price projects confidently and transition one-off builds into long-term growth retainers.",
        topics: [
          "Three-tier proposal anchoring",
          "Milestone billing & IP clauses",
          "Post-launch optimization retainers",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img6.jpg",
        alt: "Playbook proposal framework preview",
        caption: "Three-tier proposal framing and scope breakdown.",
      },
    ],
    testimonial: {
      quote:
        "Used the discovery script and three-tier proposal structure on my very next lead and closed at 2x my previous rate.",
      author: "Siddharth Nair",
      role: "Independent Product Designer",
    },
    faqs: [
      {
        question: "What formats are included in the download?",
        answer:
          "You receive the full PDF handbook, a duplicate-ready Notion workspace link, and editable proposal documents.",
      },
      {
        question: "Is this relevant if I’m a solo developer rather than an agency?",
        answer:
          "Yes—every system is specifically designed for solo operators and small 2–3 person studios.",
      },
    ],
  },
  {
    slug: "1-on-1-portfolio-and-career-mentorship",
    category: "Mentorship",
    badge: "Limited Slots",
    title: "1:1 Design Engineering & Portfolio Mentorship",
    subtitle:
      "Direct, personalized architectural reviews, portfolio teardowns, and career or studio roadmap coaching.",
    summary:
      "Four focused 1:1 working sessions over 30 days tailored directly to your goals—whether landing high-caliber engineering roles, rebuilding your flagship portfolio, or scaling client acquisition.",
    price: "₹14,999",
    billingNote: "4 × 60-min live sessions + async reviews",
    deliveryFormat: "Live 1:1 Calls + Async Loom Audits",
    level: "1:1 Tailored",
    durationOrSize: "4 Weeks • 4 Live Sessions",
    lastUpdated: "Nov 2026",
    heroImage: "/images/img9.jpg",
    checkoutUrl: "/#contact",
    secondaryCta: {
      label: "Ask a Question First",
      href: "/#contact",
    },
    highlights: [
      "4 weekly 60-minute 1:1 working sessions via Google Meet",
      "Line-by-line code, UI/UX, and portfolio architecture teardowns",
      "Unlimited async Loom feedback on your WIP builds between calls",
      "Custom 90-day execution roadmap for job search or studio growth",
    ],
    outcomes: [
      "Eliminate blind spots in your UI craft, system architecture, and project storytelling.",
      "Ship a standout flagship portfolio or product case study within 30 days.",
      "Gain direct, candid feedback tailored to your exact stack and career stage.",
    ],
    deliverables: [
      {
        title: "Deep-Dive Baseline Audit (Week 1)",
        detail: "Comprehensive review of your existing portfolio, GitHub repositories, or agency positioning.",
      },
      {
        title: "Live Pair-Design & Code Reviews (Weeks 2–3)",
        detail: "Hands-on refinement of layouts, motion polish, data architecture, and copy clarity.",
      },
      {
        title: "Launch & Outbound Strategy (Week 4)",
        detail: "Final polish pass plus an actionable 90-day plan for applications or client outreach.",
      },
    ],
    curriculum: [
      {
        number: "01",
        title: "Diagnostic & Positioning Blueprint",
        durationOrScope: "Week 1 • 60 mins",
        description:
          "Audit your current work, identify highest-leverage improvements, and lock your 30-day target.",
        topics: [
          "Portfolio & resume/positioning teardown",
          "Project selection & narrative framing",
          "30-day milestone schedule",
        ],
      },
      {
        number: "02",
        title: "Interface Craft & Architecture Sprint",
        durationOrScope: "Week 2 • 60 mins",
        description:
          "Refine typography, visual hierarchy, and component structure on your flagship build.",
        topics: [
          "Live layout & spacing critique",
          "Next.js / TypeScript architecture feedback",
          "Performance & responsiveness check",
        ],
      },
      {
        number: "03",
        title: "Motion Polish & Case Study Storytelling",
        durationOrScope: "Week 3 • 60 mins",
        description:
          "Elevate interactions and sharpen how you present technical decisions and business results.",
        topics: [
          "Micro-interaction & transition tuning",
          "Writing high-impact case study narratives",
          "Async Loom mid-week review",
        ],
      },
      {
        number: "04",
        title: "Launch Readiness & 90-Day Growth Plan",
        durationOrScope: "Week 4 • 60 mins",
        description:
          "Final pre-launch QA and a concrete playbook for outreach, interviews, or client closing.",
        topics: [
          "Production polish & SEO/metadata QA",
          "Interview or client pitch rehearsal",
          "90-day execution roadmap",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img10.jpg",
        alt: "1:1 portfolio teardown session preview",
        caption: "Structured weekly working sessions with concrete action items.",
      },
    ],
    testimonial: {
      quote:
        "Having direct, honest architectural and visual feedback accelerated my portfolio rebuild more than six months of tutorials.",
      author: "Kabir Mehta",
      role: "Full-Stack Design Engineer",
    },
    faqs: [
      {
        question: "How many mentorship spots are open each month?",
        answer:
          "Only 4 mentees are accepted per month so every participant receives thorough async reviews between live calls.",
      },
      {
        question: "Can we focus purely on agency/freelance growth instead of job hunting?",
        answer:
          "Yes—the 4-week track is customized around your primary goal, whether full-stack roles or scaling an independent studio.",
      },
    ],
  },
  {
    slug: "nextjs-performance-and-architecture-checklist",
    category: "Guides",
    badge: "Engineering Field Guide",
    title: "Production Next.js Performance & Architecture Field Guide",
    subtitle:
      "A practical reference for App Router caching, Suspense streaming, Core Web Vitals, and clean data layers.",
    summary:
      "Built for frontend and full-stack engineers shipping modern Next.js applications who want deterministic caching, sub-second LCP, and maintainable modular codebases.",
    price: "₹999",
    originalPrice: "₹1,799",
    billingNote: "One-time purchase • Instant access",
    deliveryFormat: "Interactive Web Guide + PDF + Audit Sheet",
    level: "Intermediate",
    durationOrSize: "85 Pages • 42-Point Launch Audit",
    lastUpdated: "Nov 2026",
    heroImage: "/images/img4.jpg",
    checkoutUrl: "/#contact",
    highlights: [
      "Clear mental models for Server/Client boundaries & Suspense",
      "42-point pre-launch performance, SEO, and accessibility checklist",
      "Real-world patterns for image/video optimization & font loading",
      "Production debugging playbook for hydration & layout shifts",
    ],
    outcomes: [
      "Eliminate common App Router caching pitfalls and route-blocking warnings.",
      "Consistently ship 98–100 Lighthouse scores across media-heavy marketing and product pages.",
      "Standardize code reviews with an actionable pre-deployment checklist.",
    ],
    deliverables: [
      {
        title: "85-Page Technical Reference (PDF)",
        detail: "Annotated architecture diagrams, code recipes, and anti-pattern fixes.",
      },
      {
        title: "42-Point Production Launch Checklist",
        detail: "Printable and Notion-ready QA checklist covering CWV, metadata, and security headers.",
      },
    ],
    curriculum: [
      {
        number: "01",
        title: "Rendering Boundaries & Instant Navigation",
        durationOrScope: "Part 01",
        description:
          "Keep static shells fast while streaming dynamic URL params and personalized content.",
        topics: [
          "Suspense placement around async params",
          "Minimizing client bundle footprints",
          "Static generation with generateStaticParams",
        ],
      },
      {
        number: "02",
        title: "Media, Fonts & Core Web Vitals",
        durationOrScope: "Part 02",
        description:
          "Eliminate LCP delays and layout shifts on visual-heavy pages.",
        topics: [
          "Priority loading & responsive sizes matrices",
          "Zero-CLS aspect ratio containers",
          "Efficient video poster & preload strategies",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img5.jpg",
        alt: "Architecture diagram preview",
        caption: "Server/Client boundary & streaming topology guide.",
      },
    ],
    faqs: [
      {
        question: "Does this cover Next.js 15 and 16 features?",
        answer:
          "Yes, all examples use async `params`, `<Suspense>` streaming boundaries, and modern App Router conventions.",
      },
    ],
  },
  {
    slug: "bento-and-case-study-figma-ui-kit",
    category: "Templates",
    badge: "Design System",
    title: "Editorial Bento & Case Study UI Kit (Figma)",
    subtitle:
      "120+ auto-layout components, desktop/mobile breakpoints, and light/dark editorial surfaces.",
    summary:
      "Designed for product designers, creative directors, and studios who want to prototype flagship websites, case studies, and digital storefronts with crisp typographic discipline.",
    price: "₹2,999",
    originalPrice: "₹4,500",
    billingNote: "One-time purchase • Figma (.fig)",
    deliveryFormat: "Figma File + Variable Collections",
    level: "All Levels",
    durationOrSize: "120+ Components • Light & Dark Modes",
    lastUpdated: "Oct 2026",
    heroImage: "/images/img8.jpg",
    checkoutUrl: "/#contact",
    highlights: [
      "120+ responsive Figma components built with strict Auto Layout",
      "Figma Variables for instant Light Editorial & Obsidian Dark switching",
      "Pre-built 12-column Bento Grids, Split Dossiers, and Hero frames",
      "Paired typography scale ready for 1:1 Tailwind CSS handoff",
    ],
    outcomes: [
      "Prototype high-contrast agency, SaaS, and D2C concepts in hours instead of days.",
      "Hand off clean variable tokens and spacing rules directly to developers.",
    ],
    deliverables: [
      {
        title: "Master Figma Component Library (.fig)",
        detail: "Organized pages for Foundations, Navigation, Heroes, Bento Grids, and Detail Views.",
      },
      {
        title: "Developer Handoff Token Map",
        detail: "Exact mapping between Figma variables and Tailwind utility scales.",
      },
    ],
    curriculum: [
      {
        number: "01",
        title: "Color & Surface Variables",
        durationOrScope: "Foundations",
        description:
          "Switch any frame between warm editorial paper and #121212 obsidian dark mode in one click.",
        topics: [
          "Semantic surface & border tokens",
          "High-contrast lime accent states",
          "Accessible contrast ratios",
        ],
      },
      {
        number: "02",
        title: "Modular Page Templates",
        durationOrScope: "Layouts",
        description:
          "Assemble complete landing, case study, blog, and storefront flows from composable blocks.",
        topics: [
          "14-tile asymmetric bento layouts",
          "Sticky purchase & dossier sidebars",
          "Responsive mobile frame variants",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img1.jpg",
        alt: "Figma UI Kit editorial frames",
        caption: "Light and dark mode editorial hero and bento components.",
      },
    ],
    faqs: [
      {
        question: "Does this work on the free Figma plan?",
        answer:
          "Yes—you can import the `.fig` file into any free or paid Figma workspace and use all components immediately.",
      },
    ],
  },
];

export function getProductBySlug(slug: string): DigitalProduct | undefined {
  return PRODUCTS.find((item) => item.slug === slug);
}

export function getRelatedProducts(product: DigitalProduct): DigitalProduct[] {
  const sameCategory = PRODUCTS.filter(
    (item) => item.slug !== product.slug && item.category === product.category
  );
  const others = PRODUCTS.filter(
    (item) => item.slug !== product.slug && item.category !== product.category
  );
  return [...sameCategory, ...others].slice(0, 3);
}