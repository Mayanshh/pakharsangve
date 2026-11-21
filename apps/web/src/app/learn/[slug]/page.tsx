import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/sections/ProductDetailView";
import {
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/Products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.title} | Learn`,
    description: product.subtitle,
    openGraph: {
      title: product.title,
      description: product.subtitle,
      images: [product.heroImage],
    },
  };
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <ProductDetailView
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}

function ProductLoadingFallback() {
  return (
    <main className="min-h-screen w-full bg-(--bg) px-6 sm:px-12 lg:px-20 py-14 animate-pulse">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 h-120 rounded-4xl bg-neutral-300/60" />
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="w-full aspect-16/10 rounded-3xl bg-neutral-300/70" />
          <div className="h-10 w-2/3 rounded-xl bg-neutral-300/70" />
          <div className="h-32 w-full rounded-2xl bg-neutral-200/80" />
        </div>
      </div>
    </main>
  );
}

export default function ProductSlugPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductLoadingFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}