export type FreeResourceCategory =
  | "All"
  | "Guides"
  | "Templates"
  | "Starter Kits"
  | "Checklists";

export interface FreeResourceDeliverable {
  title: string;
  detail: string;
}

export interface FreeResourceSection {
  number: string;
  title: string;
  durationOrScope: string;
  description: string;
  topics: string[];
}

export interface FreeResourceFaq {
  question: string;
  answer: string;
}

export interface FreeResourcePreviewItem {
  src: string;
  alt: string;
  caption: string;
}

export interface FreeResourceItem {
  slug: string;
  category: Exclude<FreeResourceCategory, "All">;
  badge?: string;
  featured?: boolean;
  title: string;
  subtitle: string;
  summary: string;
  accessLabel: string;
  accessNote: string;
  deliveryFormat: string;
  level: "All Levels" | "Beginner" | "Intermediate" | "Advanced";
  durationOrSize: string;
  lastUpdated: string;
  heroImage: string;
  resourceUrl: string;
  secondaryCta?: {
    label: string;
    href: string;
  };
  highlights: string[];
  outcomes: string[];
  deliverables: FreeResourceDeliverable[];
  sections: FreeResourceSection[];
  previews: FreeResourcePreviewItem[];
  faqs: FreeResourceFaq[];
}

export const FREE_RESOURCES: FreeResourceItem[] = [
  {
    slug: "nextjs-app-router-production-starter",
    category: "Starter Kits",
    badge: "Flagship Freebie",
    featured: true,
    title: "Next.js App Router Editorial Starter Kit",
    subtitle:
      "A clean, zero-bloat Next.js + TypeScript + Tailwind starter with semantic tokens, responsive grids, and SEO defaults.",
    summary:
      "Start new client or personal builds with sensible defaults already wired up: fluid typography scale, accessible focus states, clean folder structure, and image/media helpers without heavy boilerplate.",
    accessLabel: "Free",
    accessNote: "Instant repository access • No payment required",
    deliveryFormat: "GitHub Template Repo",
    level: "Intermediate",
    durationOrSize: "14 Modules • TypeScript Ready",
    lastUpdated: "Nov 2026",
    heroImage: "/images/img1.jpg",
    resourceUrl: "/#contact",
    secondaryCta: {
      label: "Explore Full Studio System",
      href: "/learn/editorial-web-systems-template-kit",
    },
    highlights: [
      "Next.js App Router + TypeScript strict setup",
      "CSS custom properties for light & dark editorial surfaces",
      "Responsive 12-column grid & reusable UI primitives",
      "Zero-fluff metadata & OpenGraph helpers",
    ],
    outcomes: [
      "Skip repetitive initial repository wiring on new web projects.",
      "Keep styling tokens and layout spacing consistent from day one.",
      "Deploy cleanly to Vercel or Node targets with minimal configuration.",
    ],
    deliverables: [
      {
        title: "Starter Repository Structure",
        detail: "Organized routes, UI primitives, and typed data helpers ready to extend.",
      },
      {
        title: "Design Token & Spacing Preset",
        detail: "Pre-tuned surface variables, border radii, and responsive container rhythm.",
      },
      {
        title: "Quick-Start README",
        detail: "Clear setup steps, environment conventions, and build scripts.",
      },
      {
        title: "SEO & Metadata Helper",
        detail: "Clean route metadata defaults ready for custom titles and social cards.",
      },
    ],
    sections: [
      {
        number: "01",
        title: "Project Layout & Surface Tokens",
        durationOrScope: "Setup",
        description:
          "Wire up predictable folder conventions and surface polarity before building pages.",
        topics: [
          "App Router layout & globals setup",
          "Light editorial & #121212 obsidian tokens",
          "Selection & focus-visible styles",
        ],
      },
      {
        number: "02",
        title: "Responsive Grid & Media Primitives",
        durationOrScope: "Core UI",
        description:
          "Prevent horizontal overflow and layout shifts across mobile, tablet, and desktop.",
        topics: [
          "12-column responsive container rules",
          "Aspect-locked image & video wrappers",
          "Mobile-safe header & CTA spacing",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img2.jpg",
        alt: "Editorial layout grid preview",
        caption: "Clean section rhythm with high-contrast typography.",
      },
      {
        src: "/images/img4.jpg",
        alt: "Responsive split layout preview",
        caption: "Structured detail layout ready for customization.",
      },
    ],
    faqs: [
      {
        question: "Is this starter really free for client work too?",
        answer:
          "Yes—clone it, customize it, and ship it for personal or client projects without licensing headaches.",
      },
      {
        question: "How does this differ from the paid template kit?",
        answer:
          "This starter gives you a clean baseline foundation; the paid Editorial Studio System includes full multi-page templates, case study engines, and design-system presets.",
      },
    ],
  },
  {
    slug: "pre-launch-web-performance-checklist",
    category: "Checklists",
    badge: "Most Downloaded",
    title: "Pre-Launch Performance & Polish Checklist",
    subtitle:
      "28 practical checks for Core Web Vitals, responsive media, accessibility, and mobile layout stability.",
    summary:
      "A quick, no-nonsense launch audit you can run before shipping any landing page, portfolio, or web app so slow assets or layout shifts don't slip into production.",
    accessLabel: "Free",
    accessNote: "Instant access • Notion & printable format",
    deliveryFormat: "Notion Checklist + Audit Sheet",
    level: "All Levels",
    durationOrSize: "28 Checks • 15-Min Audit",
    lastUpdated: "Nov 2026",
    heroImage: "/images/img4.jpg",
    resourceUrl: "/#contact",
    highlights: [
      "LCP, CLS, and interaction responsiveness checks",
      "Image sizing, aspect-ratio locking & video poster rules",
      "Mobile horizontal-overflow & tap-target verification",
      "Metadata, canonical URL & social preview checks",
    ],
    outcomes: [
      "Catch common layout shifts and heavy assets before client handoff.",
      "Standardize your pre-release QA routine across every build.",
    ],
    deliverables: [
      {
        title: "28-Point Launch Audit",
        detail: "Grouped into Layout & Mobile, Media & Performance, and SEO & Polish.",
      },
      {
        title: "Duplicate-Ready Notion Board",
        detail: "Track pass/fail status per release or client site.",
      },
    ],
    sections: [
      {
        number: "01",
        title: "Mobile Layout & Overflow Checks",
        durationOrScope: "Checks 01–14",
        description:
          "Verify viewports from 320px upward so nothing clips, overlaps, or scrolls horizontally.",
        topics: [
          "Horizontal scroll audit across breakpoints",
          "Button & link tap-target spacing",
          "Sticky element & modal behavior on mobile",
        ],
      },
      {
        number: "02",
        title: "Media, Fonts & Release Readiness",
        durationOrScope: "Checks 15–28",
        description:
          "Confirm fast first paint, clean fallbacks, and complete metadata before going live.",
        topics: [
          "Hero image priority & sizes attributes",
          "Font loading & fallback metrics",
          "404, robots & OpenGraph verification",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img5.jpg",
        alt: "Performance audit workflow preview",
        caption: "Fast pre-ship checks before pushing to production.",
      },
    ],
    faqs: [
      {
        question: "Do I need a specific tech stack to use this checklist?",
        answer:
          "No—while it includes notes helpful for Next.js and React, most checks apply to any modern website.",
      },
    ],
  },
  {
    slug: "discovery-call-and-scope-framework",
    category: "Guides",
    badge: "Studio Notes",
    title: "25-Minute Discovery Call & Scope Notes",
    subtitle:
      "Questions, red flags, and scope boundaries for turning rough project inquiries into clear proposals.",
    summary:
      "Practical notes on running focused discovery calls that uncover real business goals, timeline constraints, and budget alignment without turning into free consulting.",
    accessLabel: "Free",
    accessNote: "Instant read • Copy-ready call prompts",
    deliveryFormat: "Web Guide + Script Doc",
    level: "All Levels",
    durationOrSize: "12 Pages • Call Script Included",
    lastUpdated: "Oct 2026",
    heroImage: "/images/img3.jpg",
    resourceUrl: "/#contact",
    highlights: [
      "Structured 4-stage call flow from context to next steps",
      "High-signal questions to clarify deliverables & success metrics",
      "Early warning signs of vague scope or misaligned budgets",
    ],
    outcomes: [
      "Lead calm, structured client calls with clear expectations.",
      "Write tighter proposals with fewer back-and-forth revisions.",
    ],
    deliverables: [
      {
        title: "Discovery Call Question Bank",
        detail: "Targeted prompts for websites, redesigns, and product builds.",
      },
      {
        title: "Scope Boundary Checklist",
        detail: "Define revisions, assets, and out-of-scope items upfront.",
      },
    ],
    sections: [
      {
        number: "01",
        title: "Running a Focused 25-Minute Call",
        durationOrScope: "Part 01",
        description:
          "Keep the conversation practical, diagnostic, and clear on next steps.",
        topics: [
          "Opening alignment & goal framing",
          "Uncovering bottlenecks & constraints",
          "Setting clear proposal expectations",
        ],
      },
      {
        number: "02",
        title: "Protecting Scope Before You Quote",
        durationOrScope: "Part 02",
        description:
          "Spot ambiguity early so your statement of work stays clean.",
        topics: [
          "Content & asset readiness checks",
          "Revision round boundaries",
          "Red flags that slow down delivery",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img6.jpg",
        alt: "Discovery framework preview",
        caption: "Structured discovery questions and scope boundaries.",
      },
    ],
    faqs: [
      {
        question: "Is this for freelancers, agencies, or both?",
        answer:
          "Both—it works well for solo builders running their own sales calls and small studios standardizing intake.",
      },
    ],
  },
  {
    slug: "bento-wireframe-starter-pack",
    category: "Templates",
    badge: "UI Wireframes",
    title: "Editorial Bento & Case Study Wireframe Pack",
    subtitle:
      "Low-distraction structural wireframes for portfolios, studio showcases, and case study pages.",
    summary:
      "Map out hierarchy, content density, and section pacing in grayscale wireframes before locking in brand colors, typography, and motion.",
    accessLabel: "Free",
    accessNote: "Instant access • Editable wireframe blocks",
    deliveryFormat: "Figma Wireframe Kit",
    level: "All Levels",
    durationOrSize: "36 Wireframe Blocks • Desktop & Mobile",
    lastUpdated: "Oct 2026",
    heroImage: "/images/img8.jpg",
    resourceUrl: "/#contact",
    highlights: [
      "Hero, bento grid, split-dossier & FAQ wireframe frames",
      "Desktop and mobile responsive layouts side by side",
      "Fast structural iteration before visual styling",
    ],
    outcomes: [
      "Validate page flow and content hierarchy quickly with stakeholders.",
      "Avoid getting stuck on visual polish while layout structure is still shifting.",
    ],
    deliverables: [
      {
        title: "36 Modular Wireframe Frames",
        detail: "Ready to arrange into landing pages, case studies, or resource hubs.",
      },
      {
        title: "Mobile Breakpoint Variants",
        detail: "Stacked mobile equivalents to spot overflow and pacing issues early.",
      },
    ],
    sections: [
      {
        number: "01",
        title: "Landing & Bento Wireframes",
        durationOrScope: "Frames 01–18",
        description:
          "Test headline weight, card density, and CTA placement without visual noise.",
        topics: [
          "Editorial hero & value framing",
          "Asymmetric bento grid blocks",
          "Filter bars & callout banners",
        ],
      },
      {
        number: "02",
        title: "Detail & Case Study Wireframes",
        durationOrScope: "Frames 19–36",
        description:
          "Structure long-form breakdowns, sticky sidebars, and FAQ accordions.",
        topics: [
          "Sticky summary + scrolling body layout",
          "Deliverable cards & step lists",
          "Mobile stack & spacing checks",
        ],
      },
    ],
    previews: [
      {
        src: "/images/img1.jpg",
        alt: "Wireframe pack preview",
        caption: "Low-distraction structure for rapid layout planning.",
      },
    ],
    faqs: [
      {
        question: "Can I use these wireframes with a free Figma account?",
        answer:
          "Yes—you can open and edit the file in any standard Figma workspace.",
      },
    ],
  },
];

export function getFreeResourceBySlug(
  slug: string
): FreeResourceItem | undefined {
  return FREE_RESOURCES.find((item) => item.slug === slug);
}

export function getRelatedFreeResources(
  resource: FreeResourceItem
): FreeResourceItem[] {
  const sameCategory = FREE_RESOURCES.filter(
    (item) => item.slug !== resource.slug && item.category === resource.category
  );
  const others = FREE_RESOURCES.filter(
    (item) => item.slug !== resource.slug && item.category !== resource.category
  );
  return [...sameCategory, ...others].slice(0, 3);
}