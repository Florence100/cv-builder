import { Button } from '@/src/shared/ui/button';
import { FloatingInput } from '@/src/shared/ui/floating-input';
import { PasswordInput } from '@/src/shared/ui/password-input';
import { useTranslations } from 'next-intl';

export const SignupForm = () => {
  const t = useTranslations('features.registerByEmail');

  return (
    <form className="w-full flex flex-col gap-5 items-center">
      <FloatingInput type="email" label={t('emailPlaceholder')} />
      <PasswordInput label={t('passwordPlaceholder')} />

      <Button className="w-55 h-12 rounded-full uppercase text-sm mt-10 shadow-sm hover:bg-btn-hovered cursor-pointer">
        {t('submitButton')}
      </Button>
    </form>
  );
};
