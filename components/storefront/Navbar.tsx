"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "./CartDrawer";
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  LogOut,
  Package,
  ArrowRight,
  Gift,
  Flower2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICON_MAP: Record<string, any> = {
  Sparkles,
  Package,
  Flower2,
  Gift,
  Heart,
  ShieldCheck,
};

const DEFAULT_ANNOUNCEMENTS = [
  { text: "Handmade with love in small batches 🌸", icon: Sparkles },
  { text: "Free express shipping on all orders over ₹999 📦", icon: Package },
  { text: "Bespoke made-to-order creations tailored for you ✨", icon: Flower2 },
  { text: "Complimentary luxury gift wrapping & card notes 🎀", icon: Gift },
];

const DEFAULT_MEGA_CATEGORIES = [
  {
    name: "Crochet Bags",
    href: "/category/crochet-bags",
    desc: "Whimsical totes & pearl clutches",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
    count: "4 items",
  },
  {
    name: "Flower Bouquets",
    href: "/category/flower-bouquets",
    desc: "Forever blooming tulips & daisies",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
    count: "3 items",
  },
  {
    name: "Amigurumi & Plushies",
    href: "/category/amigurumi-plushies",
    desc: "Lovingly stitched cuddly plushies",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop",
    count: "3 items",
  },
  {
    name: "Keychains & Charms",
    href: "/category/keychains-charms",
    desc: "Dainty puffs & floral pendants",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600&auto=format&fit=crop",
    count: "2 items",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { cartCount, wishlistCount, setIsCartOpen } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [shopMegaOpen, setShopMegaOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [announcements, setAnnouncements] = useState<any[]>(DEFAULT_ANNOUNCEMENTS);
  const [megaCategories, setMegaCategories] = useState<any[]>(DEFAULT_MEGA_CATEGORIES);
  const [brandName, setBrandName] = useState("Loom & Love");
  const [tagline, setTagline] = useState("Handmade Softness, Woven with Heart");

  // Load dynamic settings and categories from live API
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.storeName) setBrandName(data.storeName);
        if (data?.tagline) setTagline(data.tagline);
        if (data?.announcements && Array.isArray(data.announcements) && data.announcements.length > 0) {
          setAnnouncements(
            data.announcements.map((a: any) => ({
              text: a.text,
              icon: ICON_MAP[a.iconName] || Sparkles,
              link: a.link,
            }))
          );
        }
      })
      .catch(() => {});

    fetch("/api/categories")
      .then((res) => res.json())
      .then((cats) => {
        if (Array.isArray(cats) && cats.length > 0) {
          setMegaCategories(
            cats.slice(0, 4).map((c: any) => ({
              name: c.name,
              href: `/category/${c.slug}`,
              desc: c.description || "Handcrafted creation",
              image: c.image || "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
              count: `${c.itemCount || 3}+ creations`,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  // Rotating Announcement ticker
  useEffect(() => {
    if (announcements.length === 0) return;
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Scroll detection for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isHome = pathname === "/";

  return (
    <>
      {/* 1. Announcement Thread Bar */}
      <div className="bg-gradient-to-r from-[#B85C38] via-[#C77B58] to-[#B85C38] text-[#FAF6F0] text-[11px] sm:text-xs py-2 px-4 text-center font-sans tracking-wide relative z-40 overflow-hidden shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#FAF6F0]/80">
            <span>Atelier No. 108</span>
            <span>•</span>
            <span>Slow-Crafted</span>
          </div>

          <div className="flex-1 flex items-center justify-center h-5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnnouncement}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex items-center justify-center gap-2 font-medium"
              >
                {announcements[currentAnnouncement]?.icon &&
                  React.createElement(announcements[currentAnnouncement].icon, {
                    className: "w-3.5 h-3.5 text-amber-200 animate-pulse-subtle",
                  })}
                <span>{announcements[currentAnnouncement]?.text}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[10px] tracking-wider text-[#FAF6F0]/90">
            <Link href="/track-order" className="hover:underline">
              Track Order
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:underline">
              Care Guide
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF6F0]/95 backdrop-blur-md shadow-linen border-b border-[#E5DAC6] py-2.5"
            : isHome
            ? "bg-[#FAF6F0]/90 backdrop-blur-sm border-b border-[#E5DAC6]/60 py-3.5"
            : "bg-[#FAF6F0] border-b border-[#E5DAC6]/60 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo with artisan thread badge */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-clay-100 to-clay-200 flex items-center justify-center text-clay-700 shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 border border-clay-300/80">
                  <span className="font-serif font-bold text-lg text-espresso-800">
                    {brandName.charAt(0) || "L"}
                  </span>
                </div>
                {/* Tiny terracotta thread bead */}
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-clay-500 border border-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-espresso-800 group-hover:text-clay-600 transition-colors whitespace-nowrap">
                  {brandName.includes("&") ? (
                    <>
                      {brandName.split("&")[0]} <span className="text-clay-500 font-light italic">&</span> {brandName.split("&")[1]}
                    </>
                  ) : (
                    brandName
                  )}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-espresso-400 font-sans hidden sm:block -mt-0.5">
                  {tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-wider uppercase font-medium text-espresso-700">
              <Link
                href="/"
                className={`py-2 transition-colors relative hover:text-clay-600 ${
                  pathname === "/" ? "text-clay-600 font-semibold" : ""
                }`}
              >
                Home
                {pathname === "/" && (
                  <motion.div
                    layoutId="activeNavThread"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-clay-500 rounded-full"
                  />
                )}
              </Link>

              {/* Shop with Mega Menu */}
              <div
                className="relative py-2"
                onMouseEnter={() => setShopMegaOpen(true)}
                onMouseLeave={() => setShopMegaOpen(false)}
              >
                <Link
                  href="/shop"
                  className={`flex items-center gap-1.5 transition-colors hover:text-clay-600 ${
                    pathname.startsWith("/shop") || pathname.startsWith("/category")
                      ? "text-clay-600 font-semibold"
                      : ""
                  }`}
                >
                  <span>Shop Creations</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopMegaOpen ? "rotate-180 text-clay-600" : ""}`} />
                  {(pathname.startsWith("/shop") || pathname.startsWith("/category")) && (
                    <motion.div
                      layoutId="activeNavThread"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-clay-500 rounded-full"
                    />
                  )}
                </Link>

                {/* Luxury Mega Menu */}
                <AnimatePresence>
                  {shopMegaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-studio-float p-6 z-50 normal-case"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-oat-300 mb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-clay-600 font-bold">
                            The Handcrafted Catalog
                          </span>
                          <h4 className="font-serif text-base font-bold text-espresso-800">
                            Explore by Category
                          </h4>
                        </div>
                        <Link
                          href="/shop"
                          onClick={() => setShopMegaOpen(false)}
                          className="text-xs text-clay-600 font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>View all products</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* Mega Category Cards Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {megaCategories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            onClick={() => setShopMegaOpen(false)}
                            className="group/card flex items-center gap-3 p-2.5 rounded-2xl bg-[#F5ECE1]/60 hover:bg-[#FAF6F0] border border-[#E5DAC6] hover:border-clay-300 transition-all shadow-xs"
                          >
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                              <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-serif font-bold text-sm text-cocoa-800 group-hover/card:text-dustyrose transition-colors truncate">
                                {cat.name}
                              </p>
                              <p className="text-[11px] text-cocoa-500 truncate">
                                {cat.desc}
                              </p>
                              <span className="inline-block text-[10px] text-dustyrose font-semibold mt-0.5">
                                {cat.count}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Quick Collections Strip */}
                      <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between text-xs text-cocoa-600">
                        <div className="flex items-center gap-4">
                          <Link
                            href="/shop?sort=best-selling"
                            onClick={() => setShopMegaOpen(false)}
                            className="hover:text-dustyrose transition-colors flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-gold-500" /> Best Sellers
                          </Link>
                          <Link
                            href="/shop?maxPrice=999"
                            onClick={() => setShopMegaOpen(false)}
                            className="hover:text-dustyrose transition-colors flex items-center gap-1"
                          >
                            <Gift className="w-3 h-3 text-dustyrose" /> Gifts Under ₹999
                          </Link>
                        </div>
                        <span className="text-[10px] text-cocoa-400">Slow fashion in India</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/custom-order"
                className={`py-2 transition-colors relative hover:text-dustyrose flex items-center gap-1 ${
                  pathname === "/custom-order" ? "text-dustyrose font-semibold" : ""
                }`}
              >
                <Sparkles className="w-3 h-3 text-gold-500" />
                <span>Custom Studio</span>
                {pathname === "/custom-order" && (
                  <motion.div
                    layoutId="activeNavThread"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-dustyrose rounded-full"
                  />
                )}
              </Link>

              <Link
                href="/about"
                className={`py-2 transition-colors relative hover:text-dustyrose ${
                  pathname === "/about" ? "text-dustyrose font-semibold" : ""
                }`}
              >
                Our Story
                {pathname === "/about" && (
                  <motion.div
                    layoutId="activeNavThread"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-dustyrose rounded-full"
                  />
                )}
              </Link>

              <Link
                href="/journal"
                className={`py-2 transition-colors relative hover:text-dustyrose ${
                  pathname === "/journal" ? "text-dustyrose font-semibold" : ""
                }`}
              >
                Journal
                {pathname === "/journal" && (
                  <motion.div
                    layoutId="activeNavThread"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-dustyrose rounded-full"
                  />
                )}
              </Link>
            </nav>

            {/* Utility Action Icons with Tooltips */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5 text-cocoa-700">
              {/* Search button with tooltip */}
              <div className="relative group/tip">
                <button
                  suppressHydrationWarning
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-2xl hover:bg-blush-100 hover:text-dustyrose transition-colors"
                  aria-label="Search creations"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-cocoa-800 text-white text-[10px] opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                  Search
                </span>
              </div>

              {/* Wishlist Link with tooltip */}
              <div className="relative group/tip">
                <Link
                  href="/wishlist"
                  className="p-2.5 rounded-2xl hover:bg-blush-100 hover:text-dustyrose transition-colors relative block"
                  aria-label="Wishlist"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 bg-dustyrose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-cocoa-800 text-white text-[10px] opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                  Wishlist
                </span>
              </div>

              {/* User Account / Admin Dropdown */}
              <div className="relative group/tip">
                <button
                  suppressHydrationWarning
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-2.5 rounded-2xl hover:bg-blush-100 hover:text-dustyrose transition-colors flex items-center gap-1.5"
                  aria-label="Account menu"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  {mounted && session?.user && (
                    <span className="hidden md:inline text-xs font-semibold text-cocoa-800 max-w-[80px] truncate">
                      {session.user.name?.split(" ")[0]}
                    </span>
                  )}
                </button>
                {!userDropdownOpen && (
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-cocoa-800 text-white text-[10px] opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                    Account
                  </span>
                )}

                {/* Account popup */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <>
                      <div
                        onClick={() => setUserDropdownOpen(false)}
                        className="fixed inset-0 z-20"
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-3xl shadow-atelier border border-[#EFC8D1]/60 p-2 z-30 text-xs text-cocoa-700 font-sans"
                      >
                        {session?.user ? (
                          <div className="space-y-1">
                            <div className="px-3 py-2.5 border-b border-cream-200">
                              <p className="font-serif font-bold text-sm text-cocoa-800 truncate">
                                {session.user.name}
                              </p>
                              <p className="text-[11px] text-cocoa-500 truncate">
                                {session.user.email}
                              </p>
                            </div>

                            <Link
                              href="/account"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blush-50 hover:text-dustyrose transition-colors"
                            >
                              <Package className="w-4 h-4 text-dustyrose" />
                              My Orders & Details
                            </Link>

                            {(session.user as any).role === "ADMIN" && (
                              <Link
                                href="/admin"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blush-100/70 text-dustyrose font-semibold hover:bg-blush-100 transition-colors"
                              >
                                <ShieldCheck className="w-4 h-4" />
                                Admin Atelier Suite
                              </Link>
                            )}

                            <button
                              suppressHydrationWarning
                              onClick={async () => {
                                setUserDropdownOpen(false);
                                await signOut({ redirect: false });
                                if (pathname.startsWith("/account") || pathname.startsWith("/admin")) {
                                  router.push("/");
                                } else {
                                  router.refresh();
                                }
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2 p-2">
                            <div className="text-center py-1">
                              <p className="font-serif font-bold text-sm text-cocoa-800">
                                Welcome to Atelier
                              </p>
                              <p className="text-[11px] text-cocoa-500">
                                Sign in to access your orders & saved pieces
                              </p>
                            </div>
                            <Link
                              href="/login"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block w-full text-center py-2.5 rounded-full bg-dustyrose text-white text-xs font-semibold hover:bg-[#A3707F] transition-colors shadow-sm"
                            >
                              Sign In
                            </Link>
                            <Link
                              href="/register"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block w-full text-center py-2 rounded-full border border-cream-300 text-cocoa-700 hover:bg-cream-100 transition-colors text-xs"
                            >
                              Create Account
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Shopping Bag Trigger with bounce badge and tooltip */}
              <div className="relative group/tip">
                <button
                  suppressHydrationWarning
                  onClick={() => setIsCartOpen(true)}
                  className="p-2.5 rounded-2xl bg-blush-100/60 hover:bg-blush-200/80 text-cocoa-800 hover:text-dustyrose transition-all flex items-center gap-2 relative border border-[#EFC8D1]/40"
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-dustyrose" />
                  <span className="text-xs font-bold hidden sm:inline text-cocoa-800">
                    Bag
                  </span>
                  {mounted && cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-dustyrose text-white text-[10px] font-bold flex items-center justify-center shadow-xs"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-cocoa-800 text-white text-[10px] opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                  Cart Drawer
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Global Fullscreen Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-cocoa-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-atelier p-6 border border-[#EFC8D1] space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-cream-200">
                <span className="font-serif text-lg font-bold text-cocoa-800 flex items-center gap-2">
                  <Search className="w-5 h-5 text-dustyrose" /> Search Loom & Love
                </span>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-full text-cocoa-400 hover:text-cocoa-700 hover:bg-cream-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  suppressHydrationWarning
                  type="text"
                  autoFocus
                  placeholder="Search handbags, tulip bouquets, amigurumi bunnies, keychains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm pl-4 pr-12 py-3.5 rounded-2xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
                <button
                  suppressHydrationWarning
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-dustyrose text-white rounded-xl hover:bg-[#A3707F]"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                <span className="text-cocoa-500 text-[11px] uppercase tracking-wider font-semibold">
                  Popular Searches:
                </span>
                {["Pink Tote", "Tulips", "Cloud Bunny", "Coasters", "Gift Set"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      router.push(`/shop?search=${encodeURIComponent(item)}`);
                      setSearchOpen(false);
                    }}
                    className="px-3 py-1 rounded-full bg-cream-100 hover:bg-blush-100 text-cocoa-700 hover:text-dustyrose transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Fullscreen Mobile Drawer Menu with Decorative Elements */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-cocoa-900/50 backdrop-blur-xs"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="relative w-4/5 max-w-sm bg-[#FFF9F4] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto p-6"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-cream-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blush-200 text-dustyrose font-serif font-bold flex items-center justify-center">
                      L
                    </div>
                    <span className="font-serif font-bold text-lg text-cocoa-800">
                      Loom & Love
                    </span>
                  </div>
                  <button
                    suppressHydrationWarning
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-blush-100 text-cocoa-600"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Links */}
                <nav className="mt-6 space-y-4 text-sm font-medium text-cocoa-800">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 hover:text-dustyrose"
                  >
                    Home
                  </Link>

                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 hover:text-dustyrose"
                  >
                    All Creations
                  </Link>

                  <div className="space-y-1 pl-3 border-l-2 border-blush-200">
                    <p className="text-[11px] uppercase tracking-wider text-dustyrose font-semibold py-1">
                      Categories
                    </p>
                    {megaCategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-xs text-cocoa-600 hover:text-dustyrose"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/custom-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-dustyrose font-semibold"
                  >
                    <Sparkles className="w-4 h-4 text-gold-500" />
                    Custom Studio
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 hover:text-dustyrose"
                  >
                    Meet the Maker
                  </Link>

                  <Link
                    href="/journal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 hover:text-dustyrose"
                  >
                    Atelier Journal
                  </Link>

                  <Link
                    href="/track-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 hover:text-dustyrose"
                  >
                    Track My Parcel
                  </Link>
                </nav>
              </div>

              {/* Bottom Details */}
              <div className="pt-6 border-t border-cream-300 space-y-3">
                {session?.user ? (
                  <div className="space-y-2">
                    <p className="text-xs text-cocoa-600 truncate">
                      Signed in as <strong>{session.user.name}</strong>
                    </p>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 rounded-xl bg-blush-100 text-dustyrose text-xs font-semibold"
                    >
                      Account Dashboard
                    </Link>
                    <button
                      suppressHydrationWarning
                      onClick={async () => {
                        setMobileMenuOpen(false);
                        await signOut({ redirect: false });
                        if (pathname.startsWith("/account") || pathname.startsWith("/admin")) {
                          router.push("/");
                        } else {
                          router.refresh();
                        }
                      }}
                      className="w-full text-center py-2 rounded-xl border border-cream-300 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 rounded-xl bg-dustyrose text-white text-center text-xs font-semibold"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 rounded-xl border border-cream-300 text-center text-xs font-semibold text-cocoa-700"
                    >
                      Register
                    </Link>
                  </div>
                )}
                <p className="text-[10px] text-center text-cocoa-400">
                  © Loom & Love • Handmade slowly with heart
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Sliding Cart Drawer */}
      <CartDrawer />
    </>
  );
}
