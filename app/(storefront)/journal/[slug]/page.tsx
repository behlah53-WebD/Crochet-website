import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { ChevronRight, Clock, ArrowLeft, Heart, Share2 } from "lucide-react";

export default async function JournalPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params?.slug;
  if (!slug) {
    notFound();
  }
  const decodedSlug = decodeURIComponent(slug);
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug || p.slug === decodedSlug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-cocoa-500">
            <Link href="/" className="hover:text-dustyrose">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-cocoa-300" />
            <Link href="/journal" className="hover:text-dustyrose">Journal</Link>
            <ChevronRight className="w-3.5 h-3.5 text-cocoa-300" />
            <span className="font-semibold text-cocoa-800 line-clamp-1">{post.title}</span>
          </nav>

          {/* Header */}
          <div className="space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-blush-100 text-dustyrose text-xs font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cocoa-800 font-bold leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-cocoa-500 pb-4 border-b border-cream-200">
              <span>{post.author}</span>
              <span>•</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] rounded-4xl overflow-hidden shadow-float border-2 border-white bg-cream-100">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>

          {/* Article Content */}
          <div className="prose prose-stone max-w-none text-cocoa-700 leading-relaxed font-sans space-y-6 pt-4 text-sm sm:text-base whitespace-pre-line">
            {post.content}
          </div>

          {/* Back link */}
          <div className="pt-8 border-t border-cream-200 flex justify-between items-center">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-xs font-semibold text-dustyrose uppercase tracking-wider hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journal</span>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
