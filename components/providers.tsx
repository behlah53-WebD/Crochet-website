"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#FFF9F4",
              border: "1px solid #EFC8D1",
              color: "#4C3437",
              fontFamily: "var(--font-dmsans)",
              borderRadius: "1rem",
              boxShadow: "0 10px 30px -5px rgba(185, 130, 145, 0.2)",
            },
          }}
        />
      </CartProvider>
    </SessionProvider>
  );
}
