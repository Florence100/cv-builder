import { makeVar } from '@apollo/client';
import Cookies from 'js-cookie';

let accessToken: string | null = null;

if (typeof window !== 'undefined') {
  try {
    accessToken = Cookies.get('accessToken') || null;
  } catch {
    console.error('Access token reading failed');
  }
}

export const accessTokenVar = makeVar<string | null>(accessToken);
