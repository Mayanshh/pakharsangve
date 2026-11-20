import type { Metadata } from "next";
import BlogIndexView from "@/components/sections/BlogIndexView";

export const metadata: Metadata = {
  title: "Journal | Pakharsangave",
  description: "Notes on ads, branding, SEO and growth from the work we do every day.",
};

export default function BlogPage() {
  return <BlogIndexView />;
}