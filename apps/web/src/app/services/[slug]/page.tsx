import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/Services";
import ServiceDetailView from "@/components/sections/ServiceDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

async function ServiceContent({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES[slug];

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}

export default function ServicePage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-var(--bg)" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}