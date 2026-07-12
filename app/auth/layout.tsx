'use client';

import { AuthNavigation } from '@/src/widgets/auth-navigation';
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavigation = pathname === '/auth/login' || pathname === '/auth/signup';

  return (
    <main className="flex flex-col flex-1 gap-4 w-140 max-w-full">
      {showNavigation && <AuthNavigation />}
      {children}
    </main>
  );
}
