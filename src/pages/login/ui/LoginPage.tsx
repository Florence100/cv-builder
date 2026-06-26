import { LoginForm } from '@/src/features/auth-by-email';
import { useTranslations } from 'next-intl';
import { Button } from '@/src/shared/ui/button';
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

        <Button
          variant="ghost"
          className="w-55 h-12 mt-2 uppercase rounded-full text-muted-foreground"
          asChild
        >
          <Link href="/auth/forgot-password">{t('forgetLink')}</Link>
        </Button>
      </div>
    </div>
  );
}
