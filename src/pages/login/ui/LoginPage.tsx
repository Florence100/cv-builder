import { LoginForm } from '@/src/features/auth-by-email';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function LoginPage() {
  const t = useTranslations('pages.login');

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col flex-1 items-center">
        <div className="flex flex-col w-full items-center mb-10 gap-6 text-foreground">
          <h1 className="text-4xl">{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>

        <LoginForm />

        <Link
          className="uppercase text-sm text-muted-foreground mt-6 focus:outline focus:outline-primary"
          href="#"
        >
          {t('forgetLink')}
        </Link>
      </div>
    </div>
  );
}
