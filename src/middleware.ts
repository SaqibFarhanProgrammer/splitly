import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  if (token && pathname === "/auth") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  const protectedRoutes = ["/dashboard", "/profile", "/admin", "/allgroups"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/allgroups/:path*",

    "/profile/:path*",
    "/admin/:path*",
    "/auth/:path*",
  ],
};
