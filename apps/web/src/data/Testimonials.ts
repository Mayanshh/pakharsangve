export type TestimonialTrack = "growth" | "mentorship";

export interface Testimonial {
  id: string;
  track: TestimonialTrack;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  showcaseImage: string;
  metricValue: string;
  metricLabel: string;
  quote: string;
  outcomeSummary: string;
  tag: string;
  timeframe: string;
  featured?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  // ================= GROWTH TRACK (6 ENTRIES) =================
  {
    id: "g-1",
    track: "growth",
    name: "Aarav Mehta",
    role: "Co-Founder & CEO",
    company: "Kanso Commerce",
    location: "Bengaluru",
    avatar: "/images/img2.jpg",
    showcaseImage: "/images/img1.jpg",
    metricValue: "+214%",
    metricLabel: "Organic Pipeline in 90 Days",
    quote:
      "They stripped away every redundant layer of our funnel and rebuilt our brand and storefront with surgical restraint. Conversion rate doubled within three weeks of launch.",
    outcomeSummary:
      "Re-architected storefront templates, technical SEO structure, and high-intent landing flows.",
    tag: "Brand + Web Architecture",
    timeframe: "90-Day Sprint",
    featured: true,
  },
  {
    id: "g-2",
    track: "growth",
    name: "Nandini Rao",
    role: "VP of Marketing",
    company: "Veloce Spatial",
    location: "Mumbai",
    avatar: "/images/img3.jpg",
    showcaseImage: "/images/img4.jpg",
    metricValue: "3.8x",
    metricLabel: "Return on Ad Spend",
    quote:
      "Zero agency bloat. Every sprint shipped tangible creative and performance assets that directly lowered our blended CAC.",
    outcomeSummary:
      "Aligned paid acquisition landing pages with cohort-level creative testing and event tracking.",
    tag: "Performance & PPC",
    timeframe: "Q3 Campaign",
  },
  {
    id: "g-3",
    track: "growth",
    name: "Rohan Deshmukh",
    role: "Founder",
    company: "Northstar Labs",
    location: "Pune",
    avatar: "/images/img5.jpg",
    showcaseImage: "/images/img6.jpg",
    metricValue: "-42%",
    metricLabel: "Customer Acquisition Cost",
    quote:
      "Our positioning finally matches the caliber of our product. Enterprise demos went from cold outbound to inbound within a single quarter.",
    outcomeSummary:
      "Reframed product narrative, comparison architecture, and search capture pages.",
    tag: "Positioning & SEO",
    timeframe: "1 Quarter",
  },
  {
    id: "g-4",
    track: "growth",
    name: "Meera Krishnan",
    role: "Head of Brand",
    company: "Solstice Studio",
    location: "Chennai",
    avatar: "/images/img7.jpg",
    showcaseImage: "/images/img7.jpg",
    metricValue: "1.9s",
    metricLabel: "Global Page Load Speed",
    quote:
      "Editorial elegance paired with ruthless technical performance. Our bounce rate dropped overnight and average session time tripled.",
    outcomeSummary:
      "Cut bundle overhead, optimized media delivery, and standardized design tokens.",
    tag: "Design Systems",
    timeframe: "6-Week Build",
  },
  {
    id: "g-5",
    track: "growth",
    name: "Devansh Patwardhan",
    role: "Managing Partner",
    company: "Harbor & Co. Advisors",
    location: "Mumbai",
    avatar: "/images/img8.jpg",
    showcaseImage: "/images/img8.jpg",
    metricValue: "+165%",
    metricLabel: "Qualified Advisory Inquiries",
    quote:
      "Clients now arrive on discovery calls already aligned on how we work and what engagements cost. Sales cycles shortened noticeably.",
    outcomeSummary:
      "Built case-study proof architecture and structured inbound qualification flows.",
    tag: "Brand + Web Architecture",
    timeframe: "8-Week Rollout",
  },
  {
    id: "g-6",
    track: "growth",
    name: "Priya Subramanian",
    role: "Growth Lead",
    company: "Kinetix Cloud",
    location: "Hyderabad",
    avatar: "/images/img9.jpg",
    showcaseImage: "/images/img9.jpg",
    metricValue: "+88%",
    metricLabel: "Demo-to-Trial Activation",
    quote:
      "Every interaction feels intentional and fast. Their engineering eye caught subtle friction points our previous agency completely missed.",
    outcomeSummary:
      "Streamlined interactive product walkthroughs and core web vitals across key routes.",
    tag: "Design Systems",
    timeframe: "60-Day Partner",
  },

  // ================= MENTORSHIP TRACK (6 ENTRIES) =================
  {
    id: "m-1",
    track: "mentorship",
    name: "Siddharth Kulkarni",
    role: "Independent Product Designer",
    company: "Ex-Fintech Lead",
    location: "Pune",
    avatar: "/images/img10.jpg",
    showcaseImage: "/images/img10.jpg",
    metricValue: "3x",
    metricLabel: "Average Project Retainer",
    quote:
      "Before the mentorship, I was underpricing custom builds and drowning in scope creep. One teardown of my positioning and proposal system changed my entire trajectory.",
    outcomeSummary:
      "Rebuilt portfolio case studies, scope boundaries, and three-tier proposal pricing.",
    tag: "1:1 Agency Blueprint",
    timeframe: "4-Week Track",
    featured: true,
  },
  {
    id: "m-2",
    track: "mentorship",
    name: "Ananya Sharma",
    role: "Creative Developer",
    company: "Studio Ananya",
    location: "Delhi NCR",
    avatar: "/images/img8.jpg",
    showcaseImage: "/images/img7.jpg",
    metricValue: "14 Days",
    metricLabel: "To First International Client",
    quote:
      "No vague motivational fluff—just honest, line-by-line feedback on my portfolio, motion craft, and outbound pitch until it landed.",
    outcomeSummary:
      "Refined motion pacing, live demos, and targeted teardown outreach messages.",
    tag: "Portfolio & Craft Critique",
    timeframe: "1-Month Sprint",
  },
  {
    id: "m-3",
    track: "mentorship",
    name: "Vikramaditya Joshi",
    role: "Solo Founder",
    company: "Draftline UI",
    location: "Bengaluru",
    avatar: "/images/img6.jpg",
    showcaseImage: "/images/img6.jpg",
    metricValue: "$18k",
    metricLabel: "First Productized Launch",
    quote:
      "The playbook frameworks gave me the confidence to turn years of client work into a repeatable, high-margin digital product.",
    outcomeSummary:
      "Packaged UI components, documentation, and launch positioning into a flagship release.",
    tag: "Productized Systems",
    timeframe: "6-Week Build",
  },
  {
    id: "m-4",
    track: "mentorship",
    name: "Kavya Nair",
    role: "Brand Strategist",
    company: "Independent",
    location: "Kochi",
    avatar: "/images/img4.jpg",
    showcaseImage: "/images/mentorship/img5.jpg",
    metricValue: "100%",
    metricLabel: "Inbound Referral Pipeline",
    quote:
      "Learning how to articulate design decisions in business outcomes completely shifted how founders treat me in discovery calls.",
    outcomeSummary:
      "Structured 25-minute discovery calls and client handoff retainers.",
    tag: "Founder Advisory",
    timeframe: "4-Week Track",
  },
  {
    id: "m-5",
    track: "mentorship",
    name: "Aditya Verma",
    role: "Frontend Engineer",
    company: "Stackline",
    location: "Gurugram",
    avatar: "/images/img2.jpg",
    showcaseImage: "/images/img1.jpg",
    metricValue: "2 Offers",
    metricLabel: "Senior & Staff Final Rounds",
    quote:
      "Pair-reviewing my architecture decisions and UI polish turned a scattered GitHub profile into a cohesive engineering narrative.",
    outcomeSummary:
      "Audited codebase quality, performance metrics, and technical case-study writeups.",
    tag: "Portfolio & Craft Critique",
    timeframe: "4-Week Track",
  },
  {
    id: "m-6",
    track: "mentorship",
    name: "Tara Menon",
    role: "Design Director",
    company: "Formwork Collective",
    location: "Mumbai",
    avatar: "/images/img9.jpg",
    showcaseImage: "/images/img9.jpg",
    metricValue: "+70%",
    metricLabel: "Proposal Close Rate",
    quote:
      "Tightening our scope templates and async review cadence freed up hours every week while raising client trust immediately.",
    outcomeSummary:
      "Standardized delivery milestones, async Loom reviews, and client onboarding.",
    tag: "1:1 Agency Blueprint",
    timeframe: "4-Week Track",
  },
];

export function getTestimonialsByTrack(track: TestimonialTrack): Testimonial[] {
  return TESTIMONIALS.filter((item) => item.track === track);
}

export function getTrackTags(track: TestimonialTrack): string[] {
  const unique = new Set(
    getTestimonialsByTrack(track).map((item) => item.tag)
  );
  return ["All", ...Array.from(unique)];
}