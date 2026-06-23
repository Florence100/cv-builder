'use client';

import { accessTokenVar } from '@/src/entities/session/model/session';
import { useReactiveVar } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function App() {
  const router = useRouter();
  const accessToken = useReactiveVar(accessTokenVar);

  useEffect(() => {
    if (accessToken) {
      router.replace('/users');
    } else {
      router.replace('/auth/login');
    }
  }, [accessToken, router]);

  return null;
}
