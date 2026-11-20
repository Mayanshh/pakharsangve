export type CaseStudyTemplateId = 1 | 2 | 3;

/**
 * GLOBAL TEMPLATE SWITCH
 * Change this single value (1, 2, or 3) to apply that template across ALL case study detail pages at once.
 */
export const ACTIVE_CASE_STUDY_TEMPLATE: CaseStudyTemplateId = 2;

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyDeliverable {
  title: string;
  description: string;
}

export interface CaseStudyProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface CaseStudyFaq {
  question: string;
  answer: string;
}

export interface CaseStudyMediaItem {
  src: string;
  alt: string;
  caption?: string;
  type?: "image" | "video";
}

export interface CaseStudy {
  slug: string;
  template: CaseStudyTemplateId; // Switch 1, 2, or 3 to transform the full detail layout
  title: string;
  client: string;
  category: string;
  year: string;
  timeline: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  heroImage: string;
  heroVideo?: string;
  accentColor?: string;
  metrics: CaseStudyMetric[];
  deliverables: CaseStudyDeliverable[];
  process: CaseStudyProcessStep[];
  gallery: CaseStudyMediaItem[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  faqs: CaseStudyFaq[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    href: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "aura-commerce-replatform",
    template: 1,
    title: "Aura Commerce",
    client: "Aura Living Co.",
    category: "Brand & Commerce Architecture",
    year: "2026",
    timeline: "10 Weeks",
    tagline: "High-converting editorial storefront engineered for tactile product storytelling.",
    summary:
      "Aura Living Co. needed a cohesive digital flagship that translated physical material craft into an effortless, high-velocity shopping experience.",
    challenge:
      "Legacy templates fragmented the brand story and slowed mobile product discovery, creating friction between visual inspiration and checkout completion.",
    solution:
      "We architected a modular storefront system combining editorial pacing, instant lookbook navigation, and performance-tuned media pipelines.",
    heroImage: "/images/img1.jpg",
    accentColor: "#171717",
    metrics: [
      { label: "Conversion Uplift", value: "+48%" },
      { label: "Mobile Load Time", value: "0.9s" },
      { label: "Avg. Session Depth", value: "4.6x" },
      { label: "Repeat Purchase", value: "+34%" },
    ],
    deliverables: [
      {
        title: "Design System & Token Architecture",
        description:
          "Unified typography, surface tokens, and reusable UI primitives built for rapid campaign deployment and visual consistency.",
      },
      {
        title: "Editorial Lookbook & Merchandising",
        description:
          "Interactive product hotspots and curated room stories that connect atmospheric imagery directly to SKU variants.",
      },
      {
        title: "Performance & Media Pipeline",
        description:
          "Responsive image sizing, lazy-loaded secondary media, and disciplined layout budgets for crisp 60fps interaction.",
      },
      {
        title: "Checkout & Retention Flow",
        description:
          "Streamlined cart drawer, bundle suggestions, and post-purchase touchpoints designed to lift average order value.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Audit & Positioning",
        description: "Benchmarked funnel bottlenecks, audited brand touchpoints, and defined clear KPI targets.",
      },
      {
        number: "02",
        title: "System & Wireframes",
        description: "Structured information hierarchy, layout cadence, and modular component specifications.",
      },
      {
        number: "03",
        title: "Motion & Build",
        description: "Implemented responsive interfaces, smooth transitions, and verified cross-device performance.",
      },
      {
        number: "04",
        title: "Launch & Optimize",
        description: "Validated production telemetry, refined key conversion steps, and handed off clean documentation.",
      },
    ],
    gallery: [
      {
        src: "/images/img2.jpg",
        alt: "Aura Commerce editorial grid view",
        caption: "Modular collection layout balancing imagery and restraint.",
        type: "image",
      },
      {
        src: "/images/img3.jpg",
        alt: "Aura Commerce product detail study",
        caption: "Focused product view with clear specification hierarchy.",
        type: "image",
      },
    ],
    quote: {
      text: "Every detail feels intentional—our team can launch campaigns faster while customers stay engaged longer.",
      author: "Rohan Deshmukh",
      role: "VP of Digital, Aura Living Co.",
    },
    faqs: [
      {
        question: "How modular is the new storefront architecture?",
        answer:
          "Every section is built from composable blocks and shared tokens, allowing marketing and product teams to assemble new landing experiences without rebuilding core layouts.",
      },
      {
        question: "Did the redesign preserve existing SEO rankings?",
        answer:
          "Yes. URL structures, metadata hierarchy, and structured content were mapped cleanly before launch while improving Core Web Vitals.",
      },
      {
        question: "Can this layout template be reused for other case studies?",
        answer:
          "Yes—setting `template: 1` in `src/data/CaseStudies.ts` applies this complete editorial structure to any case study entry.",
      },
    ],
    cta: {
      heading: "Ready to scale your brand?",
      description:
        "Let’s discuss your project requirements and build a custom roadmap tailored for your business growth.",
      buttonText: "Book a Discovery Call",
      href: "/#contact",
    },
  },
  {
    slug: "kinetix-motion-platform",
    template: 2,
    title: "Kinetix Studio OS",
    client: "Kinetix Interactive",
    category: "Product Experience & Web",
    year: "2026",
    timeline: "8 Weeks",
    tagline: "Precision workspace presentation pairing technical clarity with calm visual rhythm.",
    summary:
      "Kinetix Interactive partnered with us to reimagine how creative directors and engineering teams evaluate and adopt their release workflow platform.",
    challenge:
      "Dense feature lists overwhelmed first-time visitors and obscured how the platform connected real-time reviews with production releases.",
    solution:
      "We crafted a split-rail narrative and visual proof system that pairs scannable technical specifications with authentic product moments.",
    heroImage: "/images/img4.jpg",
    accentColor: "#18181b",
    metrics: [
      { label: "Demo Requests", value: "+62%" },
      { label: "Trial Activation", value: "74%" },
      { label: "Time on Page", value: "3m 45s" },
      { label: "Bounce Reduction", value: "-29%" },
    ],
    deliverables: [
      {
        title: "Narrative & Information Architecture",
        description:
          "Clear progression from core value proposition to workflow proof, reducing cognitive load for technical buyers.",
      },
      {
        title: "Interactive Feature Showcases",
        description:
          "Structured visual callouts highlighting version comparison, review approvals, and instant handoff states.",
      },
      {
        title: "Component & Motion Guidelines",
        description:
          "Predictable easing curves, focus states, and accessible keyboard navigation across all interactive surfaces.",
      },
      {
        title: "Conversion Funnel Alignment",
        description:
          "Contextual CTAs placed naturally after key proof points rather than interrupting reading momentum.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Stakeholder Alignment",
        description: "Synthesized product positioning and mapped buyer questions across evaluation stages.",
      },
      {
        number: "02",
        title: "Split-Rail Blueprint",
        description: "Designed persistent summary context alongside deep-dive visual and technical sections.",
      },
      {
        number: "03",
        title: "Precision Engineering",
        description: "Built responsive layouts with clean state handling and zero unnecessary layout shifts.",
      },
      {
        number: "04",
        title: "Rollout & Iteration",
        description: "Monitored real-world engagement metrics and refined copy clarity post-release.",
      },
    ],
    gallery: [
      {
        src: "/images/img5.jpg",
        alt: "Kinetix workflow interface study",
        caption: "High-contrast visual hierarchy for rapid scanning.",
        type: "image",
      },
      {
        src: "/images/img6.jpg",
        alt: "Kinetix collaboration view",
        caption: "Structured review states with minimal visual noise.",
        type: "image",
      },
    ],
    quote: {
      text: "Prospects arrive on calls already understanding how the product fits their pipeline.",
      author: "Ananya Kulkarni",
      role: "Co-Founder, Kinetix Interactive",
    },
    faqs: [
      {
        question: "What makes Template 2 different from Template 1?",
        answer:
          "Template 2 uses a sticky summary rail on desktop paired with a visual and narrative column, making it ideal for analytical or multi-layered case studies.",
      },
      {
        question: "How are media assets handled on mobile screens?",
        answer:
          "The sticky rail smoothly stacks into a clean flow on smaller viewports so mobile reading stays effortless.",
      },
    ],
    cta: {
      heading: "Build a sharper digital flagship.",
      description:
        "Turn complex product value into a clear, high-trust experience that converts qualified visitors.",
      buttonText: "Start a Conversation",
      href: "/#contact",
    },
  },
  {
    slug: "verve-spatial-campaign",
    template: 3,
    title: "Verve Spatial",
    client: "Verve Architecture & Sound",
    category: "Campaign & Film Experience",
    year: "2026",
    timeline: "6 Weeks",
    tagline: "Atmospheric dark-mode case study built around motion, sound, and spatial craft.",
    summary:
      "For Verve’s annual exhibition and spatial audio release, we created an immersive dark-mode case study experience highlighting motion and atmosphere.",
    challenge:
      "Standard light-mode layouts diluted the moody, tactile character of the spatial installation and motion reel.",
    solution:
      "We designed a full-bleed dark editorial flow with oversized metrics, numbered chapters, and optional motion reel integration.",
    heroImage: "/images/img7.jpg",
    heroVideo: "/videos/p.mp4",
    accentColor: "#0a0a0a",
    metrics: [
      { label: "Reel Completion", value: "81%" },
      { label: "Press Features", value: "14+" },
      { label: "RSVP Conversions", value: "+53%" },
      { label: "Avg. Dwell Time", value: "4m 18s" },
    ],
    deliverables: [
      {
        title: "Art Direction & Motion Reel",
        description:
          "Paced visual storytelling combining still frames, motion studies, and clear typographic chapters.",
      },
      {
        title: "Dark Surface & Contrast System",
        description:
          "Carefully calibrated dark tones and lime accents ensuring crisp legibility without harsh glare.",
      },
      {
        title: "Exhibition & Event Flow",
        description:
          "Seamless transition from project story to RSVP and inquiry actions for curators and partners.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Mood & Direction",
        description: "Established lighting, pacing, and typographic scale aligned with the physical installation.",
      },
      {
        number: "02",
        title: "Storyboard Sequencing",
        description: "Ordered narrative beats so each scroll step builds anticipation and context.",
      },
      {
        number: "03",
        title: "Motion & Media Polish",
        description: "Tuned playback, transitions, and responsive framing across desktop and mobile.",
      },
      {
        number: "04",
        title: "Launch & Archive",
        description: "Published the case study as a permanent archive piece and campaign destination.",
      },
    ],
    gallery: [
      {
        src: "/images/img8.jpg",
        alt: "Verve spatial installation view",
        caption: "Spatial staging and ambient light study.",
        type: "image",
      },
      {
        src: "/videos/p2.mp4",
        alt: "Verve motion study reel",
        caption: "Motion rhythm and transition study.",
        type: "video",
      },
    ],
    quote: {
      text: "It captures the exact tension and calm of the space itself—without sacrificing speed or clarity.",
      author: "Kabir Mehta",
      role: "Creative Director, Verve",
    },
    faqs: [
      {
        question: "When should I choose Template 3?",
        answer:
          "Choose `template: 3` when your case study benefits from a dark editorial stage, strong visual drama, and optional video reel highlights.",
      },
      {
        question: "Does Template 3 support video as well as images?",
        answer:
          "Yes. If `heroVideo` or a video gallery item is provided, it renders smoothly with clean controls and image fallbacks.",
      },
    ],
    cta: {
      heading: "Craft an unforgettable launch.",
      description:
        "Partner with us to design a distinctive digital showcase tailored to your next release.",
      buttonText: "Book a Discovery Call",
      href: "/#contact",
    },
  },
  {
    slug: "solis-architectural-atelier",
    template: 1,
    title: "Solis Atelier",
    client: "Solis Architecture Studio",
    category: "Architectural Portfolio & Monograph",
    year: "2026",
    timeline: "9 Weeks",
    tagline: "Monolithic digital archive celebrating raw concrete, daylight studies, and civic spaces.",
    summary:
      "Solis Architecture Studio needed a digital monograph capable of presenting large-scale residential and cultural commissions with gallery-grade restraint.",
    challenge:
      "Heavy CAD renders and unindexed project galleries caused slow page loads and obscured project narratives for prospective private clients.",
    solution:
      "We structured an editorial index pairing daylight photography, concise spatial briefs, and instant inquiry pathways.",
    heroImage: "/images/img8.jpg",
    accentColor: "#1c1917",
    metrics: [
      { label: "Qualified Inquiries", value: "+71%" },
      { label: "Image Payload", value: "-64%" },
      { label: "Press Downloads", value: "3.2x" },
      { label: "Avg. Projects Viewed", value: "6.4" },
    ],
    deliverables: [
      {
        title: "Monograph Grid & Typographic System",
        description: "Editorial proportions inspired by Swiss architectural publications with generous negative space.",
      },
      {
        title: "Spatial Specification Drawer",
        description: "Structured material palettes, site dimensions, and structural collaborators per commission.",
      },
      {
        title: "Press & Media Kit Portal",
        description: "Curated high-resolution press packages with attribution guidelines for architecture editors.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Archive Curation",
        description: "Audited 40+ built works to select flagship commissions and standardize photography ratios.",
      },
      {
        number: "02",
        title: "Editorial Layout",
        description: "Established rhythm between full-bleed elevations and intimate interior detail studies.",
      },
      {
        number: "03",
        title: "Asset Optimization",
        description: "Engineered responsive image delivery preserving tonal subtlety across Retina displays.",
      },
      {
        number: "04",
        title: "Private Preview & Launch",
        description: "Rolled out to architectural press and private clientele with direct consultation booking.",
      },
    ],
    gallery: [
      {
        src: "/images/img1.jpg",
        alt: "Solis concrete pavilion elevation",
        caption: "South elevation study at golden hour.",
        type: "image",
      },
      {
        src: "/images/img9.jpg",
        alt: "Solis interior courtyard light",
        caption: "Daylight aperture and limestone materiality.",
        type: "image",
      },
    ],
    quote: {
      text: "The site feels like walking through one of our own buildings—quiet, proportioned, and unambiguous.",
      author: "Arjun Joshi",
      role: "Principal Architect, Solis Atelier",
    },
    faqs: [
      {
        question: "How fast do high-resolution architectural images load?",
        answer:
          "Through responsive `sizes` hints and staged loading, initial hero frames render under a second without sacrificing visual sharpness.",
      },
      {
        question: "Can partners update new commissions independently?",
        answer:
          "Yes, new works can be added directly in structured data files with automatic layout alignment.",
      },
    ],
    cta: {
      heading: "Present your craft with authority.",
      description:
        "Let’s build a digital flagship worthy of your studio’s finest built work.",
      buttonText: "Schedule a Consultation",
      href: "/#contact",
    },
  },
  {
    slug: "meridian-wealth-advisory",
    template: 2,
    title: "Meridian Private",
    client: "Meridian Wealth Partners",
    category: "Fintech & Private Advisory",
    year: "2026",
    timeline: "12 Weeks",
    tagline: "Institutional-grade digital presence designed for family offices and multi-asset founders.",
    summary:
      "Meridian Wealth Partners sought to replace dated corporate brochures with an understated, high-trust digital experience for ultra-high-net-worth principals.",
    challenge:
      "Overly technical jargon and generic stock visuals undermined trust during initial partner introductions.",
    solution:
      "We created a calm, transparent advisory platform highlighting governance frameworks, thesis papers, and direct partner onboarding.",
    heroImage: "/images/img2.jpg",
    accentColor: "#0f172a",
    metrics: [
      { label: "Intro Calls Booked", value: "+54%" },
      { label: "Thesis Read Rate", value: "68%" },
      { label: "Mobile Engagement", value: "+41%" },
      { label: "Client NPS Score", value: "92" },
    ],
    deliverables: [
      {
        title: "Executive Positioning & Copywriting",
        description: "Clear articulation of capital preservation, cross-border structuring, and fiduciary alignment.",
      },
      {
        title: "Interactive Allocation Overview",
        description: "Clean visual breakdown of asset classes, liquidity horizons, and risk governance.",
      },
      {
        title: "Encrypted Onboarding Intake",
        description: "Discreet, multi-step qualification flow routing prospective principals to managing partners.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Partner Interviews",
        description: "Distilled investment philosophy from founding partners into clear editorial pillars.",
      },
      {
        number: "02",
        title: "Trust Architecture",
        description: "Designed calm typographic hierarchy prioritizing clarity, permanence, and discretion.",
      },
      {
        number: "03",
        title: "Compliance & Build",
        description: "Integrated regulatory disclosures seamlessly into the layout without visual clutter.",
      },
      {
        number: "04",
        title: "Executive Launch",
        description: "Deployed with full analytics and private briefing decks for client roadshows.",
      },
    ],
    gallery: [
      {
        src: "/images/img4.jpg",
        alt: "Meridian quarterly letter interface",
        caption: "Editorial reading mode for quarterly market theses.",
        type: "image",
      },
      {
        src: "/images/img10.jpg",
        alt: "Meridian governance overview",
        caption: "Structured fiduciary framework presentation.",
        type: "image",
      },
    ],
    quote: {
      text: "Clients frequently mention the clarity of our digital presence before we even discuss portfolio specifics.",
      author: "Vikramaditya Rao",
      role: "Managing Partner, Meridian Private",
    },
    faqs: [
      {
        question: "How were compliance disclosures handled cleanly?",
        answer:
          "Disclosures were integrated into dedicated, readable footer and drawer modules so primary narrative sections stay focused.",
      },
      {
        question: "Is the platform optimized for tablet and mobile reading?",
        answer:
          "Yes, long-form market letters and dashboards adapt fluidly to iPad and mobile viewports.",
      },
    ],
    cta: {
      heading: "Elevate institutional trust.",
      description:
        "Craft a composed, high-credibility digital experience tailored for discerning clients.",
      buttonText: "Book a Strategy Call",
      href: "/#contact",
    },
  },
  {
    slug: "nocturne-acoustic-labs",
    template: 3,
    title: "Nocturne Audio",
    client: "Nocturne Acoustic Labs",
    category: "Hardware Launch & Industrial Design",
    year: "2026",
    timeline: "7 Weeks",
    tagline: "Precision industrial launch showcase for reference-grade studio monitors.",
    summary:
      "Nocturne Acoustic Labs unveiled its flagship anodized aluminum studio monitor with a dramatic dark-room product launch experience.",
    challenge:
      "Engineers and mastering studios needed deep acoustic telemetry alongside visceral appreciation of the CNC-machined enclosure.",
    solution:
      "We built a moody, high-contrast launch film and technical specification experience that converts audiophiles and studio buyers alike.",
    heroImage: "/images/img9.jpg",
    heroVideo: "/videos/p3.mp4",
    accentColor: "#09090b",
    metrics: [
      { label: "Pre-Order Sellout", value: "48 hrs" },
      { label: "Spec Sheet Downloads", value: "19.4k" },
      { label: "Dealer Applications", value: "+88%" },
      { label: "Video Watch Time", value: "86%" },
    ],
    deliverables: [
      {
        title: "Launch Film & Macro Art Direction",
        description: "Choreographed hardware reveal highlighting waveguide geometry and brushed aluminum finishes.",
      },
      {
        title: "Acoustic Telemetry Breakdown",
        description: "Clean frequency response charts, dispersion diagrams, and amplifier pairing guides.",
      },
      {
        title: "Direct Pre-Order Reservation Flow",
        description: "Deposit reservation system with serialized build slot allocation and studio concierge support.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Acoustic Storyboarding",
        description: "Mapped engineering breakthroughs into digestible visual chapters for studio buyers.",
      },
      {
        number: "02",
        title: "Dark-Stage UI Design",
        description: "Calibrated deep obsidian surfaces with crisp lime telemetry highlights.",
      },
      {
        number: "03",
        title: "Video & Asset Integration",
        description: "Synchronized ambient product loops with instant fallback frames for mobile bandwidth.",
      },
      {
        number: "04",
        title: "Global Drop Execution",
        description: "Handled peak launch-day traffic smoothly across international audio markets.",
      },
    ],
    gallery: [
      {
        src: "/images/img7.jpg",
        alt: "Nocturne waveguide macro detail",
        caption: "Precision CNC waveguide and tweeter housing.",
        type: "image",
      },
      {
        src: "/videos/p.mp4",
        alt: "Nocturne studio testing reel",
        caption: "Anechoic chamber calibration study.",
        type: "video",
      },
    ],
    quote: {
      text: "Our entire first production batch reserved out in two days—the presentation did justice to five years of R&D.",
      author: "Siddharth Nair",
      role: "Head of Acoustics, Nocturne Labs",
    },
    faqs: [
      {
        question: "How does video playback behave on low-power devices?",
        answer:
          "Videos use `playsInline`, `muted`, and poster fallbacks so playback remains battery-friendly and reliable across iOS and Android.",
      },
      {
        question: "Can dealer portals be linked directly from the product page?",
        answer:
          "Yes, dedicated studio and distributor inquiry CTAs route directly into regional sales pipelines.",
      },
    ],
    cta: {
      heading: "Launch flagship hardware with impact.",
      description:
        "Combine industrial precision with high-converting digital storytelling for your next release.",
      buttonText: "Plan Your Launch",
      href: "/#contact",
    },
  },
  {
    slug: "botanica-terroir-hospitality",
    template: 1,
    title: "Terroir & Table",
    client: "Botanica Culinary Group",
    category: "Hospitality & Editorial Brand",
    year: "2026",
    timeline: "6 Weeks",
    tagline: "Sensory digital home for a farm-to-table tasting room and seasonal culinary journal.",
    summary:
      "Botanica Culinary Group wanted a warm, tactile web flagship reflecting seasonal tasting menus, vineyard pairings, and private dining experiences.",
    challenge:
      "Third-party reservation widgets clashed with the restaurant’s serene aesthetic and buried private event inquiries.",
    solution:
      "We crafted an editorial hospitality experience uniting seasonal menu storytelling with frictionless table and private dining reservations.",
    heroImage: "/images/img3.jpg",
    accentColor: "#292524",
    metrics: [
      { label: "Direct Bookings", value: "+64%" },
      { label: "Private Dining Leads", value: "2.8x" },
      { label: "Gift Card Revenue", value: "+45%" },
      { label: "Mobile Load Speed", value: "0.8s" },
    ],
    deliverables: [
      {
        title: "Seasonal Tasting Menu System",
        description: "Easily updatable course progressions highlighting local farms, harvest notes, and sommelier pairings.",
      },
      {
        title: "Private Dining & Sommelier Dossier",
        description: "Dedicated showcase for cellar buyouts, chef’s table experiences, and bespoke event menus.",
      },
      {
        title: "Editorial Journal & Harvest Stories",
        description: "Photo-driven essays documenting regenerative growers and kitchen craft.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Hospitality Immersion",
        description: "Aligned digital tone with the physical dining room’s warmth, pacing, and service rituals.",
      },
      {
        number: "02",
        title: "Editorial Wireframing",
        description: "Balanced atmospheric photography with immediate access to reservations and hours.",
      },
      {
        number: "03",
        title: "Booking Integration",
        description: "Styled reservation triggers and private dining forms to feel native to the brand.",
      },
      {
        number: "04",
        title: "Seasonal Launch",
        description: "Launched alongside the autumn tasting menu to record-high weekend seatings.",
      },
    ],
    gallery: [
      {
        src: "/images/img5.jpg",
        alt: "Terroir dining room ambiance",
        caption: "Evening candlelight and ceramic table setting.",
        type: "image",
      },
      {
        src: "/images/img2.jpg",
        alt: "Seasonal plating study",
        caption: "Autumn harvest tasting course.",
        type: "image",
      },
    ],
    quote: {
      text: "Guests tell us the website feels like stepping through our front door before they even arrive.",
      author: "Meera Deshpande",
      role: "Founder, Botanica Culinary Group",
    },
    faqs: [
      {
        question: "How easy is it to update menus every few weeks?",
        answer:
          "Menu items and seasonal notes live in clean structured data so updates take minutes without touching layout code.",
      },
      {
        question: "Does it support private event inquiries separately from regular tables?",
        answer:
          "Yes, dedicated pathways route standard reservations and private dining buyouts to their respective teams.",
      },
    ],
    cta: {
      heading: "Elevate your hospitality brand.",
      description:
        "Turn first-time visitors into loyal guests with a warm, effortless digital presence.",
      buttonText: "Start a Project",
      href: "/#contact",
    },
  },
  {
    slug: "stratos-cloud-observability",
    template: 2,
    title: "Stratos Telemetry",
    client: "Stratos Systems Inc.",
    category: "Developer Tools & Infrastructure",
    year: "2026",
    timeline: "11 Weeks",
    tagline: "High-clarity developer platform communicating sub-millisecond observability at scale.",
    summary:
      "Stratos Systems needed a sharp technical flagship capable of winning over staff engineers, SRE leads, and VP Engineering buyers.",
    challenge:
      "Competitors relied on vague AI buzzwords, making it hard for engineers to verify Stratos’s actual ingestion throughput and query latency.",
    solution:
      "We built a benchmark-driven product experience pairing live architecture diagrams with transparent pricing and instant sandbox onboarding.",
    heroImage: "/images/img5.jpg",
    accentColor: "#18181b",
    metrics: [
      { label: "Developer Signups", value: "+93%" },
      { label: "Docs-to-Trial Rate", value: "38%" },
      { label: "Enterprise PoCs", value: "3.1x" },
      { label: "Lighthouse Score", value: "99/100" },
    ],
    deliverables: [
      {
        title: "Benchmark & Architecture Visuals",
        description: "Crisp system diagrams illustrating distributed ingestion pipelines and zero-copy storage.",
      },
      {
        title: "Interactive CLI & SDK Quickstart",
        description: "Copy-ready installation snippets for Go, Rust, Node.js, and OpenTelemetry collectors.",
      },
      {
        title: "Transparent Usage Calculator",
        description: "Predictable volume tiers eliminating surprise overage anxiety for engineering leaders.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Developer Discovery",
        description: "Interviewed power users to identify the exact technical proofs needed before adoption.",
      },
      {
        number: "02",
        title: "Technical Information Design",
        description: "Structured scannable code blocks, latency tables, and architecture walkthroughs.",
      },
      {
        number: "03",
        title: "Zero-Bloat Frontend Build",
        description: "Delivered sub-second page transitions with minimal JavaScript overhead.",
      },
      {
        number: "04",
        title: "GA Launch & Telemetry",
        description: "Tracked funnel conversion from technical blog posts straight into active clusters.",
      },
    ],
    gallery: [
      {
        src: "/images/img4.jpg",
        alt: "Stratos distributed trace view",
        caption: "High-density trace waterfall designed for rapid root-cause analysis.",
        type: "image",
      },
      {
        src: "/images/img6.jpg",
        alt: "Stratos cluster topology",
        caption: "Multi-region ingestion health matrix.",
        type: "image",
      },
    ],
    quote: {
      text: "Engineers respect products that respect their time—our new site proves our performance in the first ten seconds.",
      author: "Pranav Kulkarni",
      role: "CTO, Stratos Systems",
    },
    faqs: [
      {
        question: "Why use Template 2 for developer infrastructure products?",
        answer:
          "The persistent left dossier keeps key metrics, SDK compatibility, and trial actions visible while engineers inspect deep technical proofs on the right.",
      },
      {
        question: "How fast are page transitions?",
        answer:
          "Built with static generation and lean client bundles, pages load instantaneously across desktop and mobile.",
      },
    ],
    cta: {
      heading: "Turn technical depth into adoption.",
      description:
        "Communicate complex infrastructure with the precision and speed engineers expect.",
      buttonText: "Book a Discovery Call",
      href: "/#contact",
    },
  },
  {
    slug: "monolith-eyewear-editorial",
    template: 3,
    title: "Monolith Eyewear",
    client: "Monolith Optical Paris",
    category: "Luxury Fashion & Lookbook",
    year: "2026",
    timeline: "7 Weeks",
    tagline: "Sculptural eyewear flagship crafted around Japanese titanium and architectural silhouettes.",
    summary:
      "Monolith Optical launched its limited-edition titanium capsule collection with an editorial lookbook and boutique appointment platform.",
    challenge:
      "Standard e-commerce grids flattened the sculptural depth and weight balance of hand-finished frames.",
    solution:
      "We designed a stark, high-contrast dark gallery framing macro acetate textures, studio portraits, and bespoke fitting bookings.",
    heroImage: "/images/img10.jpg",
    heroVideo: "/videos/p2.mp4",
    accentColor: "#0a0a0a",
    metrics: [
      { label: "Capsule Sell-Through", value: "94%" },
      { label: "Boutique Fittings", value: "+78%" },
      { label: "Avg. Order Value", value: "₹42,500" },
      { label: "International Orders", value: "+51%" },
    ],
    deliverables: [
      {
        title: "Seasonal Capsule Lookbook",
        description: "Full-bleed editorial sequences pairing studio portraiture with frame geometry callouts.",
      },
      {
        title: "Frame Dimension & Fit Guide",
        description: "Millimeter-accurate bridge, temple, and lens measurements for confident remote ordering.",
      },
      {
        title: "Private Optician Appointment Flow",
        description: "Seamless booking for in-person styling and custom lens prescriptions across flagship boutiques.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Creative Direction",
        description: "Established stark lighting contrasts highlighting brushed titanium and horn finishes.",
      },
      {
        number: "02",
        title: "Lookbook Pacing",
        description: "Alternated wide campaign films with intimate product macro frames.",
      },
      {
        number: "03",
        title: "Commerce & Sizing Polish",
        description: "Integrated size comparison tools without disrupting the editorial calm.",
      },
      {
        number: "04",
        title: "Paris Fashion Week Drop",
        description: "Launched concurrently with showroom presentations to global buyers and press.",
      },
    ],
    gallery: [
      {
        src: "/images/img7.jpg",
        alt: "Monolith titanium hinge detail",
        caption: "Custom five-barrel Japanese titanium hinge.",
        type: "image",
      },
      {
        src: "/images/img9.jpg",
        alt: "Monolith studio campaign portrait",
        caption: "Autumn/Winter capsule campaign study.",
        type: "image",
      },
    ],
    quote: {
      text: "Our digital flagship now carries the exact sculptural weight and restraint of our physical boutiques.",
      author: "Claire Moreau",
      role: "Brand Director, Monolith Optical",
    },
    faqs: [
      {
        question: "How does dark mode enhance luxury eyewear photography?",
        answer:
          "Deep obsidian surfaces eliminate edge glare and allow metallic reflections and acetate translucency to stand out naturally.",
      },
      {
        question: "Can customers book physical fittings directly?",
        answer:
          "Yes, boutique appointment scheduling is integrated cleanly into every frame detail view.",
      },
    ],
    cta: {
      heading: "Craft a luxury digital flagship.",
      description:
        "Pair editorial restraint with effortless commerce for your next collection.",
      buttonText: "Start a Conversation",
      href: "/#contact",
    },
  },
  {
    slug: "verdant-clean-energy-grid",
    template: 1,
    title: "Verdant Grid",
    client: "Verdant Renewables Ltd.",
    category: "CleanTech & Enterprise Platform",
    year: "2026",
    timeline: "10 Weeks",
    tagline: "Enterprise energy intelligence platform powering industrial microgrids and carbon reporting.",
    summary:
      "Verdant Renewables reimagined its corporate and product platform to win multi-megawatt commercial solar and storage contracts.",
    challenge:
      "Industrial sustainability directors struggled to compare ROI timelines and regulatory compliance across fragmented PDF whitepapers.",
    solution:
      "We unified case telemetry, savings estimators, and ESG audit documentation into a cohesive, executive-ready web platform.",
    heroImage: "/images/img6.jpg",
    accentColor: "#14532d",
    metrics: [
      { label: "Enterprise Pipeline", value: "+112%" },
      { label: "Proposal Cycle Time", value: "-35%" },
      { label: "Whitepaper Downloads", value: "4.4x" },
      { label: "Organic Traffic", value: "+84%" },
    ],
    deliverables: [
      {
        title: "Industrial ROI & Tariff Estimator",
        description: "Interactive breakdown of peak-shaving savings, payback windows, and carbon offset equivalents.",
      },
      {
        title: "Microgrid Case Telemetry Library",
        description: "Verified operational metrics across manufacturing plants, logistics hubs, and campuses.",
      },
      {
        title: "ESG & Compliance Resource Hub",
        description: "Structured audit reports and grid interconnection guides for operations teams.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Enterprise Buyer Mapping",
        description: "Aligned messaging across CFOs, plant heads, and sustainability officers.",
      },
      {
        number: "02",
        title: "Data Storytelling",
        description: "Translated complex kilowatt-hour telemetry into clear executive visuals.",
      },
      {
        number: "03",
        title: "Platform Engineering",
        description: "Built modular landing pages for regional industrial corridors and tariff zones.",
      },
      {
        number: "04",
        title: "Sales Enablement Rollout",
        description: "Equipped enterprise sales teams with live case study links for board presentations.",
      },
    ],
    gallery: [
      {
        src: "/images/img1.jpg",
        alt: "Verdant industrial solar array",
        caption: "12MW rooftop and carport microgrid installation.",
        type: "image",
      },
      {
        src: "/images/img4.jpg",
        alt: "Verdant grid telemetry dashboard",
        caption: "Real-time load balancing and battery dispatch monitor.",
        type: "image",
      },
    ],
    quote: {
      text: "Enterprise prospects now arrive at technical scoping calls already convinced of the financial and ESG case.",
      author: "Nikhil Patwardhan",
      role: "VP Commercial, Verdant Renewables",
    },
    faqs: [
      {
        question: "How are regional industrial case studies organized?",
        answer:
          "Each deployment follows a consistent telemetry structure so CFOs can compare payback periods across sectors.",
      },
      {
        question: "Does the site support high-intent enterprise lead routing?",
        answer:
          "Yes, site assessment requests capture facility load profiles and route directly to regional engineers.",
      },
    ],
    cta: {
      heading: "Scale enterprise credibility.",
      description:
        "Transform complex industrial capabilities into clear commercial momentum.",
      buttonText: "Book a Discovery Call",
      href: "/#contact",
    },
  },
  {
    slug: "forma-ceramics-studio",
    template: 2,
    title: "Forma Objects",
    client: "Forma Ceramic & Stone",
    category: "Craft Commerce & Direct-to-Consumer",
    year: "2026",
    timeline: "7 Weeks",
    tagline: "Tactile object store celebrating small-batch stoneware, raw glazes, and architectural vessels.",
    summary:
      "Forma Objects partnered with us to create an intimate, gallery-inspired storefront for limited studio kiln drops.",
    challenge:
      "High-demand studio drops frequently crashed older storefronts and failed to convey the organic variation of hand-thrown pieces.",
    solution:
      "We engineered a resilient, editorial drop experience highlighting glaze chemistry, studio provenance, and instant checkout.",
    heroImage: "/images/img2.jpg",
    accentColor: "#292524",
    metrics: [
      { label: "Drop Sellout Speed", value: "14 mins" },
      { label: "Collector Retention", value: "61%" },
      { label: "Cart Abandonment", value: "-38%" },
      { label: "Core Web Vitals", value: "100%" },
    ],
    deliverables: [
      {
        title: "Kiln Drop Countdown & Queue UX",
        description: "Calm, transparent release states keeping collectors informed without frantic page refreshing.",
      },
      {
        title: "Material & Glaze Archive",
        description: "Visual index documenting clay bodies, firing temperatures, and care rituals.",
      },
      {
        title: "Trade & Interior Designer Portal",
        description: "Dedicated trade pricing and custom commission specifications for hospitality stylists.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Studio Documentation",
        description: "Captured tactile close-ups of raw stoneware textures and kiln variations.",
      },
      {
        number: "02",
        title: "Split-Rail Storefront",
        description: "Paired persistent object provenance on the left with high-resolution gallery views.",
      },
      {
        number: "03",
        title: "High-Concurrency Testing",
        description: "Load-tested drop releases to guarantee zero downtime during peak collector traffic.",
      },
      {
        number: "04",
        title: "Collector Launch",
        description: "Released the autumn vessel collection to a global audience of interior designers.",
      },
    ],
    gallery: [
      {
        src: "/images/img3.jpg",
        alt: "Forma stoneware vessel study",
        caption: "Wood-fired ash glaze surface texture.",
        type: "image",
      },
      {
        src: "/images/img8.jpg",
        alt: "Forma architectural plinth display",
        caption: "Gallery plinth staging for private collectors.",
        type: "image",
      },
    ],
    quote: {
      text: "Our releases are completely stress-free now, and collectors love exploring the stories behind each clay batch.",
      author: "Devika Gokhale",
      role: "Ceramicist & Founder, Forma Objects",
    },
    faqs: [
      {
        question: "Can interior designers request trade accounts online?",
        answer:
          "Yes, a dedicated trade workflow verifies studio credentials and unlocks tear-sheet downloads.",
      },
      {
        question: "How are sold-out archive pieces displayed?",
        answer:
          "Past editions remain browsable as a permanent studio archive to showcase craftsmanship and drive waitlist signups.",
      },
    ],
    cta: {
      heading: "Build a distinctive D2C flagship.",
      description:
        "Combine editorial storytelling with rock-solid commerce performance.",
      buttonText: "Start a Project",
      href: "/#contact",
    },
  },
  {
    slug: "pulse-biometrics-wearable",
    template: 3,
    title: "Pulse Ring Pro",
    client: "Pulse Health Technologies",
    category: "Consumer Health & Connected Hardware",
    year: "2026",
    timeline: "9 Weeks",
    tagline: "Clinical-grade recovery wearable presented through calm typography and dark-mode precision.",
    summary:
      "Pulse Health Technologies introduced its second-generation titanium recovery ring with an educational, science-backed flagship experience.",
    challenge:
      "Consumers were skeptical of generic wellness claims and wanted transparent validation of HRV, sleep staging, and battery longevity.",
    solution:
      "We crafted a sleek dark-mode narrative pairing peer-reviewed sensor benchmarks with effortless sizing kit ordering.",
    heroImage: "/images/img4.jpg",
    heroVideo: "/videos/p3.mp4",
    accentColor: "#09090b",
    metrics: [
      { label: "Direct Conversions", value: "+57%" },
      { label: "Sizing Kit Completion", value: "89%" },
      { label: "Subscription Attach", value: "76%" },
      { label: "Return Rate Drop", value: "-42%" },
    ],
    deliverables: [
      {
        title: "Sensor Accuracy & Clinical Proof",
        description: "Clear visual comparisons against gold-standard ECG and polysomnography benchmarks.",
      },
      {
        title: "Two-Step Sizing Kit Experience",
        description: "Guided digital ring sizing flow reducing size-exchange returns by over forty percent.",
      },
      {
        title: "Mobile App Ecosystem Preview",
        description: "Interactive walkthrough of readiness scores, circadian coaching, and strain recovery.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Clinical Translation",
        description: "Converted dense biometric validation papers into intuitive visual insights.",
      },
      {
        number: "02",
        title: "Dark-Mode System",
        description: "Designed low-glare surfaces mirroring the companion mobile application’s night mode.",
      },
      {
        number: "03",
        title: "Conversion Optimization",
        description: "Streamlined finish selection, sizing kit dispatch, and membership bundling.",
      },
      {
        number: "04",
        title: "Retail & Direct Launch",
        description: "Unified direct-to-consumer launch with international fulfillment partners.",
      },
    ],
    gallery: [
      {
        src: "/images/img9.jpg",
        alt: "Pulse titanium finish lineup",
        caption: "PVD-coated brushed titanium and stealth matte finishes.",
        type: "image",
      },
      {
        src: "/videos/p.mp4",
        alt: "Pulse biometric sensor animation",
        caption: "Optical PPG sensor array and thermal tracking study.",
        type: "video",
      },
    ],
    quote: {
      text: "The sizing flow and clinical clarity transformed our unit economics within the first month of launch.",
      author: "Dr. Aditya Kulkarni",
      role: "Chief Product Officer, Pulse Health",
    },
    faqs: [
      {
        question: "How did the sizing kit flow reduce returns?",
        answer:
          "Customers confirm their physical sizing kit fit via a quick mobile link before the final titanium ring ships.",
      },
      {
        question: "Does the page perform well on cellular connections?",
        answer:
          "Yes, media assets are progressively loaded so interactive specs remain instant even on 4G.",
      },
    ],
    cta: {
      heading: "Scale your connected hardware.",
      description:
        "Bridge clinical credibility and effortless consumer conversion.",
      buttonText: "Book a Discovery Call",
      href: "/#contact",
    },
  },
  {
    slug: "atelier-nord-workspace",
    template: 1,
    title: "Atelier Nord",
    client: "Nord Modular Furniture",
    category: "B2B & Architectural Furniture",
    year: "2026",
    timeline: "8 Weeks",
    tagline: "Modular acoustic workspace systems engineered for contemporary architectural studios.",
    summary:
      "Nord Modular Furniture needed a refined digital catalog enabling architects and workplace directors to specify acoustic pods and desks rapidly.",
    challenge:
      "Specifiers wasted hours hunting for Revit/CAD files, acoustic NRC ratings, and textile swatches across disconnected portals.",
    solution:
      "We centralized visual lookbooks, instant BIM/CAD downloads, and custom finish configurators in one editorial workspace.",
    heroImage: "/images/img7.jpg",
    accentColor: "#1c1917",
    metrics: [
      { label: "CAD/BIM Downloads", value: "+135%" },
      { label: "Architect Leads", value: "+68%" },
      { label: "Quote Turnaround", value: "2x faster" },
      { label: "Sample Kit Orders", value: "+52%" },
    ],
    deliverables: [
      {
        title: "Specifier Resource Matrix",
        description: "One-click access to Revit families, acoustic test certificates, and fire-rating documentation.",
      },
      {
        title: "Textile & Timber Swatch Library",
        description: "High-detail material inspection with physical sample box ordering for studio libraries.",
      },
      {
        title: "Workplace Case Gallery",
        description: "Real-world studio installations demonstrating modular reconfiguration over time.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Architect Workflow Audit",
        description: "Shadowed interior architects to eliminate friction in specification and tender phases.",
      },
      {
        number: "02",
        title: "Editorial Catalog Design",
        description: "Balanced Scandinavian visual restraint with dense technical specification clarity.",
      },
      {
        number: "03",
        title: "Sample & Quote Flow",
        description: "Connected swatch selection directly to regional commercial sales representatives.",
      },
      {
        number: "04",
        title: "Trade Launch",
        description: "Introduced to 1,200+ architecture and workplace design practices.",
      },
    ],
    gallery: [
      {
        src: "/images/img1.jpg",
        alt: "Nord acoustic meeting pod",
        caption: "Sound-isolated oak and wool acoustic booth.",
        type: "image",
      },
      {
        src: "/images/img6.jpg",
        alt: "Nord modular desk system",
        caption: "Reconfigurable studio worktable with integrated power.",
        type: "image",
      },
    ],
    quote: {
      text: "Architects now specify our systems directly into tenders without needing back-and-forth emails for basic files.",
      author: "Henrik Lindqvist",
      role: "Commercial Director, Nord Modular",
    },
    faqs: [
      {
        question: "Can architects download CAD packages without creating an account?",
        answer:
          "Yes, core 2D/3D files are immediately accessible to remove friction during active studio deadlines.",
      },
      {
        question: "How are custom finish combinations handled?",
        answer:
          "Specifiers can bundle up to six physical timber and wool swatches into a complimentary studio sample box.",
      },
    ],
    cta: {
      heading: "Win more architectural specifications.",
      description:
        "Equip designers and enterprise buyers with a world-class digital catalog.",
      buttonText: "Start a Conversation",
      href: "/#contact",
    },
  },
  {
    slug: "chronicle-editorial-publishing",
    template: 2,
    title: "Chronicle Press",
    client: "Chronicle Cultural Foundation",
    category: "Digital Publishing & Cultural Archive",
    year: "2026",
    timeline: "8 Weeks",
    tagline: "Long-form cultural journal and archival monograph platform built for deep reading.",
    summary:
      "Chronicle Cultural Foundation commissioned a distraction-free digital publication uniting essays, oral histories, and archival photography.",
    challenge:
      "Ad-heavy templates and cramped typography discouraged readers from completing 5,000-word essays and patron memberships.",
    solution:
      "We crafted an editorial typography-first platform with chapter navigation, audio narration, and seamless patron memberships.",
    heroImage: "/images/img8.jpg",
    accentColor: "#171717",
    metrics: [
      { label: "Article Completion", value: "79%" },
      { label: "Annual Patrons", value: "+84%" },
      { label: "Avg. Reading Time", value: "6m 40s" },
      { label: "Archive Searches", value: "3.9x" },
    ],
    deliverables: [
      {
        title: "Long-Form Reading Typography",
        description: "Optimal measure, footnote drawers, and calm contrast tuned for sustained reading comfort.",
      },
      {
        title: "Thematic Archive & Index",
        description: "Cross-referenced essays, exhibitions, and photographic plates spanning two decades.",
      },
      {
        title: "Patron Membership & Print Bundle",
        description: "Frictionless annual supporter checkout uniting digital access with biannual print editions.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Editorial Architecture",
        description: "Structured issue themes, contributor indexes, and archival taxonomies.",
      },
      {
        number: "02",
        title: "Reading Comfort Testing",
        description: "Refined line-heights, responsive type scales, and footnote interactions across devices.",
      },
      {
        number: "03",
        title: "Membership Funnel",
        description: "Designed non-intrusive patron invitations placed naturally at essay conclusions.",
      },
      {
        number: "04",
        title: "Issue 01 Launch",
        description: "Published inaugural digital issue to record subscriber growth.",
      },
    ],
    gallery: [
      {
        src: "/images/img2.jpg",
        alt: "Chronicle essay spread",
        caption: "Balanced column measure and archival plate framing.",
        type: "image",
      },
      {
        src: "/images/img10.jpg",
        alt: "Chronicle print monograph",
        caption: "Biannual print edition paired with digital membership.",
        type: "image",
      },
    ],
    quote: {
      text: "Readers stay with our essays from opening paragraph to final footnote—and convert into patrons at nearly double our forecast.",
      author: "Nandini Sen",
      role: "Editor-in-Chief, Chronicle Press",
    },
    faqs: [
      {
        question: "How does Template 2 support editorial publications?",
        answer:
          "The sticky left rail anchors issue metadata, reading metrics, and patron actions while essays and plates unfold cleanly on the right.",
      },
      {
        question: "Is the typography accessible across screen sizes?",
        answer:
          "Yes, fluid type scaling and high-contrast palettes ensure effortless legibility on phones, tablets, and large monitors.",
      },
    ],
    cta: {
      heading: "Build a flagship worth reading.",
      description:
        "Pair timeless editorial craft with modern web performance.",
      buttonText: "Book a Discovery Call",
      href: "/#contact",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((item) => item.slug === slug);
}