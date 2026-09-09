"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Sparkles, BookOpen, Feather, User } from "lucide-react";
import { useSpring } from "framer-motion";
import { useCart } from "@/lib/cart-context";

interface NavTab {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
}

const TABS: NavTab[] = [
  { id: "home", label: "Home", href: "/", icon: Home, x: 38 },
  { id: "shop", label: "Shop", href: "/shop", icon: ShoppingBag, x: 95 },
  { id: "custom", label: "Custom Studio", href: "/custom-order", icon: Sparkles, x: 152 },
  { id: "story", label: "Our Story", href: "/about", icon: BookOpen, x: 208 },
  { id: "journal", label: "Journal", href: "/journal", icon: Feather, x: 265 },
  { id: "account", label: "Account", href: "/account", icon: User, x: 322 },
];

/**
 * Generates an SVG path for a 360x60 pill bar with a smooth,
 * organic concave cutout scoop centered at horizontal position `x`.
 */
function generateNotchPath(x: number, width = 360, height = 60, r = 30): string {
  const safeX = Math.max(38, Math.min(width - 38, x));
  const notchWidth = 28; // half-width of the notch scoop
  const notchDepth = 25; // depth of the scoop

  const leftStart = safeX - notchWidth;
  const rightEnd = safeX + notchWidth;

  return [
    `M ${r} 0`,
    `L ${leftStart} 0`,
    `C ${safeX - 16} 0 ${safeX - 18} ${notchDepth} ${safeX - 9} ${notchDepth + 2}`,
    `C ${safeX - 3} ${notchDepth + 4} ${safeX + 3} ${notchDepth + 4} ${safeX + 9} ${notchDepth + 2}`,
    `C ${safeX + 18} ${notchDepth} ${safeX + 16} 0 ${rightEnd} 0`,
    `L ${width - r} 0`,
    `A ${r} ${r} 0 0 1 ${width} ${r}`,
    `A ${r} ${r} 0 0 1 ${width - r} ${height}`,
    `L ${r} ${height}`,
    `A ${r} ${r} 0 0 1 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    `Z`,
  ].join(" ");
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isCartOpen } = useCart();

  // Determine active tab index from current route
  const getActiveIndex = () => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/shop") || pathname.startsWith("/category") || pathname.startsWith("/products")) return 1;
    if (pathname.startsWith("/custom-order")) return 2;
    if (pathname.startsWith("/about")) return 3;
    if (pathname.startsWith("/journal")) return 4;
    if (pathname.startsWith("/account") || pathname === "/login" || pathname === "/register") return 5;
    return 0;
  };

  const initialIndex = getActiveIndex();
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Smooth physical spring driving the horizontal notch and bubble glide
  const xSpring = useSpring(TABS[initialIndex]?.x ?? 38, {
    stiffness: 380,
    damping: 30,
    mass: 0.8,
  });

  const [currentX, setCurrentX] = useState(TABS[initialIndex]?.x ?? 38);

  // Synchronize route changes with the spring
  useEffect(() => {
    const nextIdx = getActiveIndex();
    setActiveIndex(nextIdx);
    xSpring.set(TABS[nextIdx].x);
  }, [pathname]);

  // Subscribe to spring frame updates for fluid notch & bubble motion
  useEffect(() => {
    const unsubscribe = xSpring.on("change", (latestVal) => {
      setCurrentX(latestVal);
    });
    return () => unsubscribe();
  }, [xSpring]);

  // Hide on admin portal routes or when cart drawer is open
  if (pathname.startsWith("/admin") || isCartOpen) return null;

  const ActiveIcon = TABS[activeIndex]?.icon ?? Home;

  return (
    <aside
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
    >
      <nav
        suppressHydrationWarning
        className="relative w-full max-w-[360px] h-[60px] pointer-events-auto select-none"
      >
        {/* SVG Curved Pill Bar with Animated Cutout Scoop */}
        <svg
          viewBox="0 0 360 60"
          className="absolute inset-0 w-full h-full drop-shadow-[0_12px_28px_rgba(43,35,32,0.14)]"
          preserveAspectRatio="none"
        >
          <path
            d={generateNotchPath(currentX, 360, 60, 30)}
            fill="#FFFFFF"
            stroke="#EFC8D1"
            strokeWidth="1"
            className="transition-colors"
          />
        </svg>

        {/* Elevated Floating Circular Active Bubble */}
        <div
          style={{ left: `${currentX}px` }}
          className="absolute -top-3.5 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-tr from-[#B85C38] via-[#C77B58] to-[#E2886C] flex items-center justify-center text-white shadow-[0_10px_22px_-2px_rgba(184,92,56,0.5),0_4px_8px_rgba(184,92,56,0.25)] ring-2 ring-white/60 pointer-events-none z-10 transition-transform active:scale-95"
        >
          <ActiveIcon className="w-5 h-5 stroke-[2.3] text-white" />
        </div>

        {/* Inactive Tab Buttons (6 Slots) */}
        <div className="absolute inset-0 flex items-center justify-between px-2.5">
          {TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeIndex === idx;

            return (
              <Link
                key={tab.id}
                href={tab.href}
                suppressHydrationWarning
                onClick={() => {
                  setActiveIndex(idx);
                  xSpring.set(tab.x);
                }}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-opacity duration-200 ${
                  isActive ? "opacity-0 pointer-events-none" : "opacity-80 hover:opacity-100 text-[#2B2320]"
                }`}
                aria-label={tab.label}
              >
                <Icon className="w-4.5 h-4.5 stroke-[1.85]" />
              </Link>
            );
          })}
          

        </div>
      </nav>
    </aside>
  );
}
