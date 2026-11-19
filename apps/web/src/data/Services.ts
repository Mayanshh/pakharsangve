export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  subItems: string[];
  heroImage: string;
  accentColor: string;
  metrics: { label: string; value: string }[];
  deliverables: { title: string; description: string }[];
  process: { number: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES: Record<string, ServiceData> = {
  branding: {
    slug: "branding",
    title: "Branding",
    tagline:
      "Distinctive brands built with clarity, character, and lasting commercial impact.",
    description:
      "A great brand isn't just a logo—it's the gut feeling customers get before they even read your headline. We craft cohesive verbal and visual identities designed to command authority, build trust, and differentiate you in crowded markets.",
    subItems: ["Brand Strategy", "Visual Identity", "Guidelines", "Messaging"],
    heroImage:
      "/images/img1.jpg",
    accentColor: "#d8b4fe",
    metrics: [
      { value: "3.4x", label: "Brand Recall Lift" },
      { value: "42%", label: "Higher Conversion Rate" },
      { value: "100%", label: "Custom Design Systems" },
      { value: "4–6 Wks", label: "Average Turnaround" },
    ],
    deliverables: [
      {
        title: "Brand Strategy & Positioning",
        description:
          "Deep audience research, competitor mapping, and core value proposition architecture.",
      },
      {
        title: "Visual Identity System",
        description:
          "Primary and secondary logos, custom typography pairings, color systems, and art direction.",
      },
      {
        title: "Tone of Voice & Messaging",
        description:
          "Taglines, brand story, copywriting rules, and conversion-focused messaging pillars.",
      },
      {
        title: "Comprehensive Brand Guidelines",
        description:
          "An interactive digital brand book ensuring consistency across web, social, and print.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discovery & Audit",
        description:
          "Stakeholder workshops, market analysis, and identifying whitespace opportunities.",
      },
      {
        number: "02",
        title: "Strategic Foundation",
        description:
          "Defining brand personality, positioning pillars, and creative territories.",
      },
      {
        number: "03",
        title: "Identity Exploration",
        description:
          "Iterative design sprints exploring typography, iconography, and real-world mockups.",
      },
      {
        number: "04",
        title: "System Rollout",
        description:
          "Finalizing production assets, templates, and handing over complete brand documentation.",
      },
    ],
    faqs: [
      {
        question: "How long does a full rebrand take?",
        answer:
          "A comprehensive brand identity project typically takes 4 to 6 weeks depending on feedback cycles and collateral requirements.",
      },
      {
        question: "Do we get full ownership of all source files?",
        answer:
          "Yes. Upon completion, you receive 100% ownership along with vector files, font licenses guidance, and Figma design tokens.",
      },
    ],
  },

  "web-design": {
    slug: "web-design",
    title: "Web Design",
    tagline:
      "Beautifully built websites designed to engage, convert, and perform at scale.",
    description:
      "Your website is your highest-performing salesperson. We combine editorial-grade UI/UX design with modern Next.js engineering and GSAP motion choreography to deliver lightning-fast web experiences that turn visitors into revenue.",
    subItems: [
      "UX & UI Design",
      "Conversion-Focused Design",
      "Landing Pages",
      "Website Development",
    ],
    heroImage:
      "/images/img2.jpg",
    accentColor: "#bef264",
    metrics: [
      { value: "99+", label: "Lighthouse Score" },
      { value: "+68%", label: "Lead Capture Growth" },
      { value: "<0.8s", label: "First Contentful Paint" },
      { value: "100%", label: "Responsive & Accessible" },
    ],
    deliverables: [
      {
        title: "UX Wireframing & Architecture",
        description:
          "User journey mapping, sitemaps, and conversion-optimized page structures.",
      },
      {
        title: "High-Craft UI & Motion Design",
        description:
          "Bespoke Figma prototypes featuring interactive micro-animations and editorial layouts.",
      },
      {
        title: "Full-Stack Next.js Development",
        description:
          "Clean, scalable TypeScript & Tailwind CSS codebase with smooth GSAP scroll animations.",
      },
      {
        title: "CMS & Analytics Integration",
        description:
          "Easy content management setup alongside technical SEO, schema markup, and event tracking.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Architecture & UX",
        description:
          "Structuring information hierarchy and user flows around your primary conversion goals.",
      },
      {
        number: "02",
        title: "Visual Direction",
        description:
          "Designing high-impact hero concepts, interactive states, and responsive breakpoints.",
      },
      {
        number: "03",
        title: "Agile Engineering",
        description:
          "Building modular React components with 60fps animations and strict performance budgets.",
      },
      {
        number: "04",
        title: "QA & Launch",
        description:
          "Cross-device testing, Core Web Vitals optimization, and seamless zero-downtime deployment.",
      },
    ],
    faqs: [
      {
        question: "Will we be able to edit text and images ourselves?",
        answer:
          "Absolutely. We can integrate a headless CMS (like Sanity or Payload) so your team can publish updates without touching code.",
      },
      {
        question: "Do you build custom animations?",
        answer:
          "Yes—we use GSAP and GPU-accelerated CSS transforms to ensure animations feel fluid on both desktop and mobile devices.",
      },
    ],
  },

  seo: {
    slug: "seo",
    title: "SEO & Growth",
    tagline:
      "Data-driven organic search strategies engineered to capture high-intent traffic.",
    description:
      "Organic traffic is your most sustainable compounding asset. We audit, restructure, and optimize your technical architecture and content authority to rank at the top of search engine results pages for commercial keywords.",
    subItems: ["Technical SEO", "Content Architecture", "Keyword Strategy", "Performance Audits"],
    heroImage:
      "/images/img3.jpg",
    accentColor: "#60a5fa",
    metrics: [
      { value: "3.8x", label: "Organic Traffic Growth" },
      { value: "Top 3", label: "Keyword Rankings" },
      { value: "-45ms", label: "Core Web Vitals Latency" },
      { value: "24/7", label: "Automated Rank Tracking" },
    ],
    deliverables: [
      {
        title: "Technical SEO Audit & Fixes",
        description: "Resolving crawl errors, index bloat, canonical tags, and site speed bottlenecks.",
      },
      {
        title: "Keyword & Intent Mapping",
        description: "Targeting high-value commercial search queries with bespoke content blueprints.",
      },
      {
        title: "On-Page Semantic Optimization",
        description: "Optimizing metadata, heading hierarchies, schema markup, and internal linking.",
      },
      {
        title: "Authority & Backlink Strategy",
        description: "Ethical digital PR and high-authority link acquisition campaigns.",
      },
    ],
    process: [
      { number: "01", title: "Comprehensive Audit", description: "Deep inspection of technical health, competitor positioning, and keyword gaps." },
      { number: "02", title: "Architecture Overhaul", description: "Fixing core technical blockers and structuring clean URL hierarchies." },
      { number: "03", title: "Content Deployment", description: "Publishing optimized, expert-led content mapped to buyer intent." },
      { number: "04", title: "Continuous Monitoring", description: "Tracking rank shifts, conversion attribution, and iterative algorithm adjustments." },
    ],
    faqs: [
      { question: "How soon can we expect organic results?", answer: "SEO is a compounding channel; significant upward movement typically materializes within 3 to 6 months." },
    ],
  },

  ppc: {
    slug: "ppc",
    title: "PPC Advertising",
    tagline:
      "High-ROI paid acquisition campaigns meticulously managed to maximize profitable scale.",
    description:
      "Stop burning ad spend on unqualified clicks. We architect hyper-targeted Google Ads and Meta acquisition funnels backed by meticulous attribution modeling and conversion rate optimization.",
    subItems: ["Google Ads", "Meta Ads", "Retargeting Funnels", "Conversion Tracking"],
    heroImage:
      "/images/img4.jpg",
    accentColor: "#f43f5e",
    metrics: [
      { value: "4.5x", label: "Average ROAS" },
      { value: "-32%", label: "Cost Per Acquisition" },
      { value: "+150%", label: "Ad Scalability Volume" },
      { value: "100%", label: "Server-Side Tracking" },
    ],
    deliverables: [
      {
        title: "Paid Search & Social Campaigns",
        description: "High-converting ad copy, dynamic creative testing, and multi-channel audience targeting.",
      },
      {
        title: "Landing Page CRO",
        description: "A/B testing dedicated landing pages designed to maximize conversion rates from paid traffic.",
      },
      {
        title: "Advanced Attribution & Pixels",
        description: "Server-side event tracking and conversion API setup to bypass iOS tracking limitations.",
      },
      {
        title: "Daily Spend & ROAS Optimization",
        description: "Rigorous budget allocation and bid management to safeguard profit margins.",
      },
    ],
    process: [
      { number: "01", title: "Account & Pixel Audit", description: "Reviewing historical ad data, tracking pixels, and wasted spend patterns." },
      { number: "02", title: "Funnel Architecture", description: "Building out campaign structures, ad groups, and bespoke landing pages." },
      { number: "03", title: "Creative Sprints", description: "Launching rapid creative variations to discover winning hooks and angles." },
      { number: "04", title: "Scaling & Optimization", description: "Systematically increasing budget on profitable segments while pruning losers." },
    ],
    faqs: [
      { question: "What minimum ad budget do you recommend?", answer: "We typically work with clients spending $3,000+ monthly on paid acquisition to ensure enough data velocity." },
    ],
  },
};