"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const all: Product[] = await res.json();
        setProducts(all.filter((p) => wishlist.includes(p._id)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [wishlist]);

  const handleMoveToBag = (product: Product) => {
    addToCart({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      selectedColor: product.variants?.[0]?.name,
    });
    toggleWishlist(product._id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
              Your Loved Pieces
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-cocoa-800 font-bold mt-1">
              Handcrafted Wishlist ({wishlist.length})
            </h1>
          </div>

          {wishlist.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-white border border-[#EFC8D1]/40 p-8 space-y-4 max-w-md mx-auto shadow-card">
              <div className="w-16 h-16 rounded-full bg-blush-100 text-dustyrose flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-cocoa-800">
                Your wishlist is empty
              </h2>
              <p className="text-xs text-cocoa-500 font-sans">
                Click the little heart on any product to save it here for later.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-dustyrose text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:bg-[#A3707F] transition-all"
              >
                <span>Discover Creations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-3xl border border-[#EFC8D1]/40 shadow-card overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-cream-100">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-red-500 hover:bg-white shadow-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-serif text-sm font-semibold text-cocoa-800 hover:text-dustyrose transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="font-serif text-base font-bold text-cocoa-800 mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="w-full py-2.5 rounded-full bg-blush-200 hover:bg-blush-300 text-cocoa-800 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4 text-dustyrose" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
