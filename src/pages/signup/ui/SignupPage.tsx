import { SignupForm } from '@/src/features/register-by-email/ui/SignupForm';
import { useTranslations } from 'next-intl';

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
      </div>
    </div>
  );
};
