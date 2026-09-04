import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Strict Admin Authorization
    // Buyers / Customers cannot access any /admin page or subpath
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "ADMIN") {
        const url = new URL("/login", req.url);
        url.searchParams.set("error", "AccessDenied");
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        if (pathname.startsWith("/admin")) {
          return !!token && token.role === "ADMIN";
        }
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
