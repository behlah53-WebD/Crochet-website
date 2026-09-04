"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  PackageCheck,
  Sparkles,
  TicketPercent,
  MessageSquareHeart,
  Settings,
  Store,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  HelpCircle,
  Heart,
  BookOpen,
  Palette,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Homepage CMS", href: "/admin/homepage", icon: Sparkles },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Orders", href: "/admin/orders", icon: PackageCheck },
    { name: "Custom Orders", href: "/admin/custom-orders", icon: Palette },
    { name: "Coupons", href: "/admin/coupons", icon: TicketPercent },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquareHeart },
    { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { name: "Testimonials", href: "/admin/testimonials", icon: Heart },
    { name: "Pages & Story", href: "/admin/pages", icon: BookOpen },
    { name: "Store Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile hamburger header */}
      <div className="lg:hidden bg-white border-b border-cream-300 p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blush-200 text-dustyrose font-serif font-bold flex items-center justify-center">
            L
          </div>
          <span className="font-serif font-bold text-sm text-cocoa-800">
            Loom & Love Admin
          </span>
        </div>
        <button
          suppressHydrationWarning
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl text-cocoa-600 hover:bg-cream-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-cocoa-900/40 backdrop-blur-sm z-30 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Desktop & Mobile Drawer */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-cream-300 z-40 flex flex-col justify-between p-5 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-2.5 pb-4 border-b border-cream-200">
            <div className="w-9 h-9 rounded-full bg-blush-200 text-dustyrose font-serif font-bold flex items-center justify-center shadow-sm">
              L
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-cocoa-800">Loom & Love</h2>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-dustyrose block">
                Atelier Management
              </span>
            </div>
          </div>

          {/* Links list */}
          <nav className="space-y-1">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-blush-100 text-dustyrose shadow-sm"
                      : "text-cocoa-700 hover:bg-cream-100 hover:text-dustyrose"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-cream-200 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-cocoa-700 hover:bg-cream-100 transition-colors"
          >
            <Store className="w-4 h-4 text-dustyrose" />
            <span>View Public Store</span>
          </Link>
          <button
            onClick={async () => {
              await signOut({ redirect: false });
              router.push("/login");
              router.refresh();
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
