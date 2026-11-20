import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/sections/BlogPostView";
import { BLOG_POSTS } from "@/data/Blogs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Pakharsangave`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

async function BlogPostContent({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) -
        Number(a.category === post.category)
    )
    .slice(0, 3);

  return <BlogPostView post={post} related={related} />;
}

function BlogPostFallback() {
  return (
    <main className="min-h-screen w-full bg-(--bg) px-6 sm:px-12 lg:px-20 py-14 animate-pulse">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="h-4 w-32 rounded bg-neutral-300/70" />
        <div className="h-14 w-3/4 rounded-2xl bg-neutral-300/70" />
        <div className="h-6 w-2/3 rounded-xl bg-neutral-200/80" />
        <div className="w-full aspect-21/9 rounded-3xl bg-neutral-300/60 mt-4" />
      </div>
    </main>
  );
}

export default function BlogPostPage({ params }: Props) {
  return (
    <Suspense fallback={<BlogPostFallback />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}