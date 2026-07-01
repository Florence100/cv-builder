'use server';

import { cookies } from 'next/headers';

interface AuthCookiesData {
  accessToken: string;
  refreshToken: string;
}

export async function setAuthCookies(data: AuthCookiesData) {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', data.accessToken, {
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10, // 10 min
    path: '/',
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}
