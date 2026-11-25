import { Suspense } from "react";
import { notFound } from "next/navigation";
import FreeResourceDetailView from "@/components/sections/FreeResourceDetailView";
import {
  FREE_RESOURCES,
  getFreeResourceBySlug,
  getRelatedFreeResources,
} from "@/data/FreeResources";

export function generateStaticParams() {
  return FREE_RESOURCES.map((resource) => ({
    slug: resource.slug,
  }));
}

function FreeResourceDetailFallback() {
  return (
    <main className="min-h-screen w-full max-lg:overflow-x-clip bg-(--bg) text-neutral-900 px-5 sm:px-12 lg:px-20 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-start animate-pulse">
        <div className="lg:col-span-5 h-[34rem] rounded-4xl bg-white/80 border border-neutral-200/80" />
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="w-full aspect-16/10 rounded-3xl bg-neutral-200/80" />
          <div className="h-48 rounded-3xl bg-white/80 border border-neutral-200/80" />
        </div>
      </div>
    </main>
  );
}

async function ResolvedFreeResourceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getFreeResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const relatedResources = getRelatedFreeResources(resource);

  return (
    <FreeResourceDetailView
      resource={resource}
      relatedResources={relatedResources}
    />
  );
}

export default function FreeResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<FreeResourceDetailFallback />}>
      <ResolvedFreeResourceDetail params={params} />
    </Suspense>
  );
}