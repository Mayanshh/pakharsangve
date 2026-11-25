export type IndustryUpdateCategory =
  | "All"
  | "Frontend & Motion"
  | "AI & Tooling"
  | "Systems & Cloud"
  | "Design & Culture";

export type MediaKind = "image" | "video";

export interface IndustryUpdateItem {
  id: string;
  slug: string;
  date: string;
  category: Exclude<IndustryUpdateCategory, "All">;
  source: string;
  readTime: string;
  title: string;
  headlineNote: string;
  excerpt: string;
  details: string[];
  keyTakeaways: string[];
  media: {
    type: MediaKind;
    src: string;
    poster?: string;
    alt: string;
    caption: string;
  };
  externalUrl?: string;
}

export const INDUSTRY_UPDATES: IndustryUpdateItem[] = [
  {
    id: "ind-nov-01",
    slug: "view-transitions-and-scroll-driven-ui-standardization",
    date: "Nov 19, 2026",
    category: "Frontend & Motion",
    source: "Web Platform Notes",
    readTime: "4 min read",
    title: "Native Motion & Route Transitions Replace Heavy JS Shims",
    headlineNote: "Compositor-first choreography is becoming the baseline.",
    excerpt:
      "Teams are stripping out bulky animation wrappers in favor of native browser transitions, GPU-only transforms, and strict reduced-motion fallbacks.",
    details: [
      "Long-lived SPAs and hybrid App Router apps are moving micro-interactions and view transitions closer to the browser compositor so main-thread spikes don't tank mobile scroll and tap responsiveness.",
      "High-craft studios are pairing restraint with clarity: fewer decorative bounces, sharper easing curves, and predictable state transitions that never block keyboard or touch navigation.",
    ],
    keyTakeaways: [
      "Keep motion locked to transform and opacity",
      "Honor prefers-reduced-motion cleanly",
      "Measure real-device frame pacing, not just desktop devtools",
    ],
    media: {
      type: "video",
      src: "/videos/motion-reel-nov.mp4",
      poster: "/images/img7.jpg",
      alt: "Motion choreography and smooth interface transition study",
      caption: "Reel 01 — Fluid state transitions & scroll pacing study (Nov 2026)",
    },
    externalUrl: "/learn",
  },
  {
    id: "ind-nov-02",
    slug: "agentic-coding-workflows-and-code-review-discipline",
    date: "Nov 14, 2026",
    category: "AI & Tooling",
    source: "Engineering Dispatch",
    readTime: "5 min read",
    title: "AI Coding Agents Speed Up Scaffolding—Review Rigor Is the Bottleneck",
    headlineNote: "Faster diffs demand sharper architecture boundaries.",
    excerpt:
      "Generating components and boilerplate takes seconds; verifying types, edge cases, caching boundaries, and security hygiene is where real engineering time goes.",
    details: [
      "Across modern full-stack teams, AI assistants excel at drafting repetitive UI states, test fixtures, and SQL/ORM queries, but subtly wrong assumptions around async boundaries, caching, or stale state still slip through without disciplined review.",
      "The strongest workflows treat generated code as an untrusted draft: strict TypeScript, small composable modules, clear domain invariants, and explicit runtime checks.",
    ],
    keyTakeaways: [
      "Constrain prompts with clear types and file boundaries",
      "Audit async, caching, and error paths manually",
      "Keep diffs small so intent stays obvious",
    ],
    media: {
      type: "image",
      src: "/images/img5.jpg",
      alt: "Minimalist engineering system and architecture visual",
      caption: "Note 02 — High-leverage code review over raw generation speed",
    },
    externalUrl: "/learn/free-resources",
  },
  {
    id: "ind-nov-03",
    slug: "edge-caching-streaming-and-lean-media-pipelines",
    date: "Nov 08, 2026",
    category: "Systems & Cloud",
    source: "Infra & Runtime Brief",
    readTime: "4 min read",
    title: "Streaming Shells, CDN Media & Leaner Cloud Footprints",
    headlineNote: "Sub-second perceived loads without over-engineered infra.",
    excerpt:
      "Shipping instant shells with Suspense, serving heavy assets from object storage/CDNs, and keeping runtime costs predictable remain top priorities.",
    details: [
      "Heavy local bundles and unoptimized media payloads remain the fastest way to ruin mobile first impressions. Offloading static assets and video streams to CDNs with proper sizing and posters keeps pages snappy.",
      "On the backend and routing side, clear separation between static shells, streamed data, and background queues prevents waterfalls and keeps tail latencies calm.",
    ],
    keyTakeaways: [
      "Serve images and video via CDN with explicit dimensions",
      "Isolate dynamic data behind targeted Suspense boundaries",
      "Watch p95/p99 latency and egress early",
    ],
    media: {
      type: "video",
      src: "/videos/edge-pipeline-nov.mp4",
      poster: "/images/img4.jpg",
      alt: "Streaming architecture and responsive media delivery preview",
      caption: "Reel 03 — Instant shell rendering & media delivery flow",
    },
    externalUrl: "/learn/nextjs-performance-and-architecture-checklist",
  },
  {
    id: "ind-nov-04",
    slug: "editorial-minimalism-and-high-contrast-visual-systems",
    date: "Nov 03, 2026",
    category: "Design & Culture",
    source: "Visual Systems Journal",
    readTime: "3 min read",
    title: "Editorial Whitespace & High-Contrast Polarity Beat Generic SaaS Templates",
    headlineNote: "Distinctive typography and negative space create immediate trust.",
    excerpt:
      "As generic component-library layouts blend together, intentional type hierarchy, generous breathing room, and decisive contrast help brands stand out.",
    details: [
      "Visitors form an impression in fractions of a second. When every landing page uses the same three-card grid and gradient blur, restraint—strong display type, disciplined spacing, and clear visual hierarchy—feels refreshing and authoritative.",
      "Pairing warm editorial light surfaces with high-contrast dark obsidian accents gives content room to breathe while making key actions unmistakable.",
    ],
    keyTakeaways: [
      "Let typography and spacing carry visual identity",
      "Cut redundant badges, borders, and filler copy",
      "Keep mobile tap targets and margins generous",
    ],
    media: {
      type: "image",
      src: "/images/img8.jpg",
      alt: "Editorial visual composition with clean spacing and contrast",
      caption: "Note 04 — Typographic restraint and surface contrast in practice",
    },
    externalUrl: "/learn/bento-and-case-study-figma-ui-kit",
  },
];