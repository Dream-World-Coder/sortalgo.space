import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const url = req.nextUrl;

  const parts = host.split(".");
  const subdomain = parts.length > 2 ? parts[0] : null;

  /*
  if (subdomain === "animations") {
    url.pathname = `/animations${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  // return NextResponse.next();
  */

  url.pathname = `/${subdomain}${url.pathname}`;
  return NextResponse.rewrite(url);
}
