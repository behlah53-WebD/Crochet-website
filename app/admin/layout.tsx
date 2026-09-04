import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Atelier — Loom & Love",
  description: "Loom & Love e-commerce store administration dashboard",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // Strict server-side verification: only users with role === 'ADMIN' can access
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/login?error=AccessDenied");
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF6F3] text-[#4C3437]">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
