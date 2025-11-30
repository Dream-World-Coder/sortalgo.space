import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const url = req.nextUrl;

  // Don't rewrite static assets, API routes, or Next.js internals
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/static") ||
    url.pathname.match(/\.(ico|png|jpg|jpeg|svg|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  const parts = host.split(".");
  const subdomain = parts.length > 2 ? parts[0] : null;

  // Only rewrite if there's a subdomain
  if (subdomain && subdomain !== "www") {
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
