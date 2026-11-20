export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readTime: string;
  author: string;
  image: string;
  content: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-your-ads-stop-scaling",
    title: "Why your ads stop scaling at £50K a month",
    excerpt: "Most accounts plateau for the same three reasons. None of them are budget problems.",
    category: "PPC",
    date: "2025-03-12",
    readTime: "6 min read",
    author: "Pakharsangave",
    image: "/images/img4.jpg",
    content: [
      { type: "p", text: "Every account hits a ceiling. Spend goes up, returns flatten, and the instinct is to blame the platform. After managing £250K in monthly spend, we've seen the real cause is almost always inside the funnel, not the auction." },
      { type: "h2", text: "1. Creative fatigue arrives sooner than reporting shows" },
      { type: "p", text: "Click-through rate drops weeks before conversion rate does. By the time ROAS moves, you've already lost a month. Rotate concepts, not just copy variations." },
      { type: "h2", text: "2. The landing page is the bottleneck" },
      { type: "p", text: "Paid traffic exposes every weakness in a page. If the offer isn't obvious in five seconds, more budget only buys more bounces." },
      { type: "quote", text: "Scale is a conversion problem wearing a budget costume." },
      { type: "h2", text: "3. Tracking leaks hide your best campaigns" },
      { type: "list", items: ["Audit server-side events monthly", "Compare platform data against real revenue", "Cut campaigns on blended profit, not platform ROAS"] },
      { type: "p", text: "Fix these three and the same budget usually goes further than doubling it would." },
    ],
  },
  {
    slug: "brand-identity-that-lasts",
    title: "Building a brand identity that outlasts the trend cycle",
    excerpt: "Distinctiveness beats novelty. How we decide what a brand should keep, and what it should drop.",
    category: "Branding",
    date: "2025-02-24",
    readTime: "5 min read",
    author: "Pakharsangave",
    image: "/images/img1.jpg",
    content: [
      { type: "p", text: "Trends age quickly. A brand built on one looks dated within two years, and rebuilds are expensive." },
      { type: "h2", text: "Start with what stays constant" },
      { type: "p", text: "Positioning, tone and the single idea customers should remember. Visuals are the last layer, not the first." },
      { type: "quote", text: "A good identity is boring to change and impossible to confuse." },
      { type: "h2", text: "Design for the smallest use first" },
      { type: "list", items: ["A favicon at 16px", "A one-line email signature", "A single colour on a packaging label"] },
      { type: "p", text: "If it works there, it will work on a billboard." },
    ],
  },
  {
    slug: "technical-seo-checklist",
    title: "The technical SEO checklist we run before every launch",
    excerpt: "Twelve checks that catch most ranking problems before a site goes live.",
    category: "SEO",
    date: "2025-01-30",
    readTime: "8 min read",
    author: "Pakharsangave",
    image: "/images/img3.jpg",
    content: [
      { type: "p", text: "Most SEO damage happens at launch: a stray noindex, broken redirects, or a sitemap pointing at staging." },
      { type: "h2", text: "Crawl and index" },
      { type: "list", items: ["Robots.txt allows production", "Canonical tags resolve to live URLs", "Sitemap lists only indexable pages"] },
      { type: "h2", text: "Speed and structure" },
      { type: "p", text: "Check Core Web Vitals on real devices, keep one H1 per page, and make sure internal links use descriptive text." },
      { type: "quote", text: "Rankings are earned over months and lost in an afternoon." },
    ],
  },
  {
    slug: "designing-websites-that-convert",
    title: "Designing websites that convert without feeling pushy",
    excerpt: "Clear hierarchy, honest copy and one obvious next step. That's most of it.",
    category: "Web Design",
    date: "2024-12-18",
    readTime: "4 min read",
    author: "Pakharsangave",
    image: "/images/img2.jpg",
    content: [
      { type: "p", text: "High-converting design is rarely loud. It removes doubt and makes the next step obvious." },
      { type: "h2", text: "One page, one job" },
      { type: "p", text: "Every page should have a single primary action. Secondary links are fine, but they shouldn't compete." },
      { type: "quote", text: "If everything is highlighted, nothing is." },
      { type: "h2", text: "Show proof early" },
      { type: "list", items: ["Real client names and numbers", "Short case studies near the call to action", "Clear pricing or process, never a mystery"] },
    ],
  },
  {
    slug: "reading-your-ad-metrics",
    title: "Which ad metrics matter, and which are noise",
    excerpt: "A practical guide to the numbers worth checking daily, weekly and never.",
    category: "Growth",
    date: "2024-11-05",
    readTime: "5 min read",
    author: "Pakharsangave",
    image: "/images/img5.jpg",
    content: [
      { type: "p", text: "Dashboards show dozens of metrics. Only a handful change decisions." },
      { type: "h2", text: "Check daily" },
      { type: "list", items: ["Spend against pacing", "Cost per acquisition", "Conversion volume"] },
      { type: "h2", text: "Check weekly" },
      { type: "p", text: "Creative performance, audience overlap and landing page conversion rate." },
      { type: "quote", text: "Vanity metrics feel good. Profit metrics pay the bills." },
    ],
  },
  {
    slug: "agency-vs-in-house",
    title: "Agency or in-house: how to choose at your stage",
    excerpt: "Neither is always right. Here's how to decide based on spend, speed and skill gaps.",
    category: "Strategy",
    date: "2024-10-14",
    readTime: "6 min read",
    author: "Pakharsangave",
    image: "/images/img6.jpg",
    content: [
      { type: "p", text: "The honest answer depends on your spend and how fast you need to learn." },
      { type: "h2", text: "When an agency fits" },
      { type: "list", items: ["You need specialists across several channels", "You want to test quickly without hiring", "Your monthly spend is still growing"] },
      { type: "h2", text: "When in-house fits" },
      { type: "p", text: "When one channel drives most revenue and the work is steady enough to justify a full-time owner." },
    ],
  },
];

export const BLOG_CATEGORIES = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
