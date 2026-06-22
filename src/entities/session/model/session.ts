import { makeVar } from '@apollo/client';

let accessToken: string | null = null;

if (typeof window !== 'undefined') {
  try {
    accessToken = localStorage.getItem('accessToken');
  } catch {
    console.error('Access tocken reading failed');
  }
}

export const accessTokenVar = makeVar<string | null>(accessToken);
