import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { ProductCard } from "@/components/storefront/ProductCard";
import { getProducts, getCategories } from "@/lib/products";
import { Sparkles, ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const slug = params?.slug;
  if (!slug) {
    notFound();
  }

  const categories = await getCategories();
  const decodedSlug = decodeURIComponent(slug);
  const currentCategory = categories.find((c) => c.slug === slug || c.slug === decodedSlug);

  if (!currentCategory) {
    notFound();
  }

  const products = await getProducts({ category: slug });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-espresso-500 mb-6">
            <Link href="/" className="hover:text-clay-600">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-espresso-300" />
            <Link href="/shop" className="hover:text-clay-600">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-espresso-300" />
            <span className="font-semibold text-espresso-800">{currentCategory.name}</span>
          </nav>

          {/* Editorial Category Header */}
          <div className="relative rounded-4xl overflow-hidden bg-gradient-to-r from-[#F5ECE1] to-[#FAF6F0] border border-[#E5DAC6] p-8 sm:p-12 mb-12 shadow-studio-float flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDFBF7] text-clay-700 text-xs font-semibold uppercase tracking-widest border border-clay-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Category Showcase
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso-800 font-bold">
                {currentCategory.name}
              </h1>
              <p className="text-xs sm:text-sm text-espresso-600 font-sans leading-relaxed">
                {currentCategory.description}
              </p>
            </div>

            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden shadow-studio-float border-4 border-[#FDFBF7] flex-shrink-0 bg-oat-100">
              <Image
                src={currentCategory.image}
                alt={currentCategory.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
