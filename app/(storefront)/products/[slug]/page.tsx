import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { ProductDetailClient } from "@/components/storefront/ProductDetailClient";
import { getProductBySlug, getProducts } from "@/lib/products";
import { ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params?.slug;
  if (!slug) {
    return { title: "Product Not Found — Loom & Love" };
  }

  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found — Loom & Love" };
  }

  return {
    title: `${product.title} — Loom & Love Luxury Crochet`,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: product.images && product.images.length > 0 ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) {
    notFound();
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p._id !== product._id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-cocoa-500 mb-8">
            <Link href="/" className="hover:text-dustyrose">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-cocoa-300" />
            <Link href="/shop" className="hover:text-dustyrose">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-cocoa-300" />
            <Link href={`/category/${product.category}`} className="hover:text-dustyrose">
              {product.categoryName || product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-cocoa-300" />
            <span className="font-semibold text-cocoa-800 line-clamp-1">
              {product.title}
            </span>
          </nav>

          <ProductDetailClient product={product} relatedProducts={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
