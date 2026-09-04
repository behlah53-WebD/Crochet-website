import React from "react";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { ProductCard } from "@/components/storefront/ProductCard";
import { getProducts, getCategories } from "@/lib/products";
import Link from "next/link";
import {
  Sparkles,
  X,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: "featured" | "latest" | "price-low" | "price-high" | "best-selling";
    minPrice?: string;
    maxPrice?: string;
    madetoorder?: string;
  }>;
}

export default async function ShopPage(props: ShopPageProps) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams?.category || "all";
  const searchQuery = searchParams?.search || "";
  const selectedSort = searchParams?.sort || "featured";
  const minPrice = searchParams?.minPrice ? parseInt(searchParams.minPrice) : undefined;
  const maxPrice = searchParams?.maxPrice ? parseInt(searchParams.maxPrice) : undefined;
  const isMadeToOrder =
    searchParams?.madetoorder === "true"
      ? true
      : searchParams?.madetoorder === "false"
      ? false
      : undefined;

  const categories = await getCategories();
  const products = await getProducts({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    search: searchQuery,
    sort: selectedSort,
    minPrice,
    maxPrice,
    isMadeToOrder,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-clay-600">
              The Artisan Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso-800 font-bold">
              Slow Stitches, Made to Cherish
            </h1>
            <p className="text-xs sm:text-sm text-espresso-600 font-sans leading-relaxed">
              Explore slow-made crochet bags, bouquets, nursery plushies, and custom gifts lovingly crafted one loop at a time from certified milk cotton yarn.
            </p>
          </div>

          {/* Category Pill Navigation */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <Link
              href={`/shop?${new URLSearchParams({
                ...(searchQuery ? { search: searchQuery } : {}),
                ...(selectedSort ? { sort: selectedSort } : {}),
              }).toString()}`}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                selectedCategory === "all"
                  ? "bg-clay-500 text-[#FAF6F0] border-clay-500 shadow-linen"
                  : "bg-[#FDFBF7] text-espresso-700 border-[#E5DAC6] hover:border-clay-300"
              }`}
            >
              All Pieces
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}&${new URLSearchParams({
                  ...(searchQuery ? { search: searchQuery } : {}),
                  ...(selectedSort ? { sort: selectedSort } : {}),
                }).toString()}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedCategory === cat.slug
                    ? "bg-clay-500 text-[#FAF6F0] border-clay-500 shadow-linen"
                    : "bg-[#FDFBF7] text-espresso-700 border-[#E5DAC6] hover:border-clay-300"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Filter & Sort Toolbar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-xs text-espresso-600 font-medium">
              <span className="font-serif font-bold text-espresso-800 text-sm">
                {products.length} {products.length === 1 ? "Creation" : "Creations"} Found
              </span>
              {searchQuery && (
                <span className="bg-clay-100 text-clay-700 px-2.5 py-1 rounded-full text-[11px] font-sans flex items-center gap-1 border border-clay-200">
                  Search: “{searchQuery}”
                  <Link href={`/shop?category=${selectedCategory}`} className="hover:text-espresso-800">
                    <X className="w-3 h-3" />
                  </Link>
                </span>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-xs text-espresso-500 hidden sm:inline">Sort by:</span>
              <form suppressHydrationWarning method="GET" action="/shop" className="w-full sm:w-auto">
                {selectedCategory !== "all" && (
                  <input suppressHydrationWarning type="hidden" name="category" value={selectedCategory} />
                )}
                {searchQuery && <input suppressHydrationWarning type="hidden" name="search" value={searchQuery} />}
                <select
                  suppressHydrationWarning
                  name="sort"
                  defaultValue={selectedSort}
                  className="w-full sm:w-auto text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500 font-medium shadow-2xs"
                >
                  <option suppressHydrationWarning value="featured">Featured Curations</option>
                  <option suppressHydrationWarning value="best-selling">Best Selling</option>
                  <option suppressHydrationWarning value="latest">Latest Stitches</option>
                  <option suppressHydrationWarning value="price-low">Price: Low to High</option>
                  <option suppressHydrationWarning value="price-high">Price: High to Low</option>
                </select>
                <noscript>
                  <button suppressHydrationWarning type="submit" className="ml-2 text-xs px-2 py-1 bg-oat-200 rounded">
                    Sort
                  </button>
                </noscript>
              </form>
            </div>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="py-20 text-center rounded-4xl bg-[#FDFBF7] border border-[#E5DAC6] p-8 space-y-4 shadow-studio-float">
              <div className="w-20 h-20 rounded-full bg-clay-100 text-clay-600 flex items-center justify-center mx-auto border border-clay-200">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-espresso-800">
                No handcrafted pieces found
              </h3>
              <p className="text-xs text-espresso-500 max-w-sm mx-auto font-sans">
                We could not find any items matching your current filters. Try resetting the filters or exploring all categories!
              </p>
              <Link
                href="/shop"
                className="btn-thread-wrap inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
