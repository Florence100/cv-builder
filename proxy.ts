import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;
  const isGuestRoute = pathname.startsWith('/auth') || pathname.startsWith('/reset-password');

  if (token) {
    if (pathname === '/' || isGuestRoute) {
      return NextResponse.redirect(new URL('/users', request.url));
    }
  } else {
    if (!isGuestRoute || pathname === '/auth') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
