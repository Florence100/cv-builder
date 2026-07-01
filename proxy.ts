import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { refreshTokens } from '@/src/shared/api/refresh-token';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const response = NextResponse.next();

  if (refreshToken) {
    let needsRefresh = false;

    if (!accessToken) {
      needsRefresh = true; //acceessToken was deleted
    } else {
      const decoded: { exp: number } = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp - currentTime < 10) {
        needsRefresh = true; //The access token is still valid, but it will expire soon. (less 10s)
      }
    }

    if (needsRefresh) {
      try {
        const data = await refreshTokens(refreshToken);

        response.cookies.set('accessToken', data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 10,
          path: '/',
        });

        response.cookies.set('refreshToken', data.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });

        accessToken = data.access_token;
        console.log('Tokens refreshed successfully in Proxy!');
      } catch (error) {
        console.error('Proxy auto-refresh failed, clearing session:', error);

        const loginUrl = new URL('/auth/login', request.url);
        const redirectResponse = NextResponse.redirect(loginUrl);
        redirectResponse.cookies.delete('accessToken');
        redirectResponse.cookies.delete('refreshToken');
        return redirectResponse;
      }
    }
  }

  const isGuestRoute = pathname.startsWith('/auth') || pathname.startsWith('/reset-password');

  if (accessToken) {
    if (pathname === '/' || isGuestRoute) {
      const redirectResponse = NextResponse.redirect(new URL('/users', request.url));
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie);
      });
      return redirectResponse;
    }
  } else {
    if (!isGuestRoute || pathname === '/auth') {
      const redirectResponse = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie);
      });
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
