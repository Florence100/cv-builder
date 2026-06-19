import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const AuthNavigation = () => {
  const t = useTranslations('widgets.auth-navigation');
  return (
    <nav className="flex gap-2">
      <Link href="./login">{t('loginTab')}</Link>
      <Link href="./signup">{t('signupTab')}</Link>
    </nav>
  );
};
