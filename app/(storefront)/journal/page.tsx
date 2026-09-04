import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";

export default function JournalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 text-dustyrose text-xs font-semibold uppercase tracking-widest border border-blush-200">
              <BookOpen className="w-3.5 h-3.5" /> The Crochet Journal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cocoa-800 font-bold">
              Behind the Stitches
            </h1>
            <p className="text-xs sm:text-sm text-cocoa-600 font-sans leading-relaxed">
              Stories, care rituals, slow fashion reflections, and styling inspirations directly from our craft atelier.
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {MOCK_BLOG_POSTS.map((post) => (
              <article
                key={post._id}
                className="group flex flex-col bg-white rounded-4xl border border-[#EFC8D1]/40 shadow-card hover:shadow-float hover:border-[#EFC8D1] overflow-hidden transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-dustyrose text-xs font-semibold uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-cocoa-400">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>

                    <Link href={`/journal/${post.slug}`}>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-cocoa-800 group-hover:text-dustyrose transition-colors leading-snug">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-xs text-cocoa-600 font-sans leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                    <span className="text-xs text-cocoa-500 italic">By {post.author}</span>
                    <Link
                      href={`/journal/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-dustyrose hover:underline"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
