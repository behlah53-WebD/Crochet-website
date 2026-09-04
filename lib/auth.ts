import "@/lib/auth-env";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User as UserModel } from "@/models/User";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();
        const adminEmail = (process.env.ADMIN_EMAIL || "admin@loomandlove.com").toLowerCase().trim();
        const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

        // 1. Environment-configured Master Admin verification
        if (email === adminEmail && credentials.password === adminPassword) {
          return {
            id: "admin-env-master",
            name: "Loom & Love Master Admin",
            email: adminEmail,
            role: "ADMIN",
          };
        }

        // 2. Query MongoDB for registered customers or additional admin accounts
        try {
          const db = await connectToDatabase();
          if (db && UserModel) {
            const user = await UserModel.findOne({ email });
            if (user && user.passwordHash) {
              const isMatch = await bcrypt.compare(credentials.password, user.passwordHash);
              if (isMatch) {
                return {
                  id: user._id.toString(),
                  name: user.name,
                  email: user.email,
                  role: user.role || "CUSTOMER",
                };
              }
            }
          }
        } catch (err) {
          console.error("Auth DB error:", err);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "CUSTOMER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = (token.role as string) || "CUSTOMER";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {}
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "loom_and_love_handcrafted_secret_key_2024_blush_luxury",
};

import { getServerSession } from "next-auth";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return null;
  }
  return session;
}

