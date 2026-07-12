'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AuthNavigation = () => {
  const t = useTranslations('widgets.authNavigation');
  const pathname = usePathname();

  return (
    <nav className="flex justify-center pt-1.5">
      <Link
        className={`w-37.5 h-12 flex items-center justify-center uppercase text-sm font-semibold focus:outline-none focus-visible:bg-(--primary-transparent) ${pathname === '/auth/login' && ' border-b-2 border-primary text-primary'}`}
        href="./login"
      >
        {t('loginTab')}
      </Link>

      <Link
        className={`w-37.5 h-12 flex items-center justify-center uppercase text-sm font-semibold focus:outline-none focus-visible:bg-(--primary-transparent) ${pathname === '/auth/signup' && ' border-b-2 border-primary text-primary'}`}
        href="./signup"
      >
        {t('signupTab')}
      </Link>
    </nav>
  );
};
