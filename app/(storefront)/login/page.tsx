"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { Heart, Lock, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const errorParam = searchParams.get("error");
  React.useEffect(() => {
    if (errorParam === "AccessDenied") {
      toast.error("Access Restricted: Storefront buyers cannot access the administration atelier.");
    }
  }, [errorParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password,
      });

      if (!res || res.error) {
        toast.error("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      toast.success("Welcome back to Loom & Love 🌸");

      // Verify session role to redirect properly
      let userRole = "CUSTOMER";
      try {
        const session = await getSession();
        if (session?.user) {
          userRole = (session.user as any).role || "CUSTOMER";
        }
      } catch (err) {
        console.warn("Could not read session role:", err);
      }

      if (userRole === "ADMIN") {
        router.push("/admin");
      } else {
        if (callbackUrl && !callbackUrl.startsWith("/admin") && callbackUrl !== "/login") {
          router.push(callbackUrl);
        } else {
          router.push("/account");
        }
      }
      router.refresh();
      setLoading(false);
    } catch (err: any) {
      console.error("Sign in error:", err);
      toast.error(err?.message || "An unexpected error occurred during sign in.");
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 py-14 sm:py-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-blush-200 text-dustyrose flex items-center justify-center mx-auto shadow-sm">
            <Heart className="w-6 h-6 fill-dustyrose" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800">
            Welcome Back
          </h1>
          <p className="text-xs text-cocoa-500 font-sans">
            Sign in to manage your handcrafted orders and saved wishlist.
          </p>
        </div>

        <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-float space-y-6">
          <form suppressHydrationWarning onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa-400" />
                <input
                  suppressHydrationWarning
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa-400" />
                <input
                  suppressHydrationWarning
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>
            </div>

            <button
              suppressHydrationWarning
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? "Signing In..." : "Sign In to Loom & Love"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-cocoa-500 pt-2 border-t border-cream-200">
            Don’t have an account yet?{" "}
            <Link href="/register" className="text-dustyrose font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
      <Footer />
    </div>
  );
}
