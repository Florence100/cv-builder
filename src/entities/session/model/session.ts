import { makeVar } from '@apollo/client';

let accessToken: string | null = null;

if (typeof window !== 'undefined') {
  try {
    accessToken = localStorage.getItem('accessToken');
  } catch {
    console.error('Access token reading failed');
  }
}

export const accessTokenVar = makeVar<string | null>(accessToken);
