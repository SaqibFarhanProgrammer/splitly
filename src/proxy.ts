import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('splitly-token')?.value;
  const { pathname } = request.nextUrl;

  const protectedPrefixes = [
    '/dashboard',
    '/allgroups',
    '/group',
    '/profile',
    '/settings',
  ];
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtected && !token) {
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === '/auth') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/allgroups/:path*',
    '/group/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/auth',
  ],
};
