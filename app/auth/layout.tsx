import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('AuthPage');

  return (
    <main className="flex flex-col gap-4">
      <nav className="flex gap-2">
        <Link href="./login">{t('loginTab')}</Link>
        <Link href="./signup">{t('signupTab')}</Link>
      </nav>
      {children}
    </main>
  );
}
