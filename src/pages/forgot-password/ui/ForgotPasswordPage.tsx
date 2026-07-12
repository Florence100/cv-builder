import { PasswordRecoveryForm } from '@/src/features/password-recovery/ui/PasswordRecoveryForm';
import { Button } from '@/src/shared/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const ForgotPasswordPage = () => {
  const t = useTranslations('pages.forgotPassword');

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col flex-1 max-w-[560] justify-center items-center">
        <div className="flex flex-col w-full items-center mb-10 gap-6 text-foreground">
          <h1 className="text-4xl">{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>

        <PasswordRecoveryForm />

        <Button
          variant="ghost"
          className="w-55 h-12 mt-2 rounded-full uppercase text-muted-foreground"
          asChild
        >
          <Link href="/auth/login">{t('cancelButton')}</Link>
        </Button>
      </div>
    </div>
  );
};
