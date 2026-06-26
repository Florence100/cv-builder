'use client';

import { accessTokenVar } from '@/src/entities/session/model/session';
import { AuthNavigation } from '@/src/widgets/auth-navigation';
import { useReactiveVar } from '@apollo/client/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useReactiveVar(accessTokenVar);
  const [isMounted, setIsMounted] = useState(false);

  const showNavigation = pathname === '/auth/login' || pathname === '/auth/signup';

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (accessToken) {
      router.replace('/users');
    }
  }, [accessToken, router]);

  if (!isMounted || accessToken) return null;

  return (
    <main className="flex flex-col flex-1 gap-4 w-140 max-w-full">
      {showNavigation && <AuthNavigation />}
      {children}
    </main>
  );
}
