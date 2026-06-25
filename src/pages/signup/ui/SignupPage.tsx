import { SignupForm } from '@/src/features/register-by-email';
import { Button } from '@/src/shared/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const SignupPage = () => {
  const t = useTranslations('pages.signup');

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col flex-1 max-w-[560] justify-center items-center">
        <div className="flex flex-col w-full items-center mb-10 gap-6 text-foreground">
          <h1 className="text-4xl">{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>
        <SignupForm />
        <Button variant="ghost" className="w-55 h-12 mt-2 uppercase text-muted-foreground" asChild>
          <Link href="/auth/login">{t('haveAccountButton')}</Link>
        </Button>
      </div>
    </div>
  );
};
