import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import CaseStudyDetailView from "@/components/sections/CaseStudiesDetailModal";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/data/CaseStudies";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({
    slug: item.slug,
  }));
}

async function CaseStudyContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailView caseStudy={caseStudy} />;
}

function CaseStudyLoadingFallback() {
  return (
    <main className="min-h-screen w-full bg-(--bg) px-6 sm:px-12 lg:px-20 py-14 animate-pulse">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="h-4 w-40 rounded bg-neutral-300/70" />
        <div className="h-16 sm:h-24 w-3/4 rounded-2xl bg-neutral-300/70" />
        <div className="h-8 w-2/3 rounded-xl bg-neutral-200/80" />
        <div className="w-full aspect-21/9 rounded-3xl bg-neutral-300/60 mt-4" />
      </div>
    </main>
  );
}

export default function CaseStudySlugPage({ params }: CaseStudyPageProps) {
  return (
    <Suspense fallback={<CaseStudyLoadingFallback />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}