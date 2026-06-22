'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AuthNavigation = () => {
  const t = useTranslations('widgets.auth-navigation');
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex justify-center">
      <Link
        className={`w-[150px] h-[3rem] flex items-center justify-center uppercase text-sm font-semibold focus:outline-none focus-visible:bg-[var(--primary-transporent)] ${pathname === '/auth/login' && ' border-b-2 border-primary text-primary'}`}
        href="./login"
      >
        {t('loginTab')}
      </Link>

      <Link
        className={`w-[150px] h-[3rem] flex items-center justify-center uppercase text-sm font-semibold focus:outline-none focus-visible:bg-[var(--primary-transporent)] ${pathname === '/auth/signup' && ' border-b-2 border-primary text-primary'}`}
        href="./signup"
      >
        {t('signupTab')}
      </Link>
    </nav>
  );
};
