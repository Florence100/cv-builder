import { Button } from '@/src/shared/ui/button';
import { useTranslations } from 'next-intl';
import { PasswordInput } from '@/src/shared/ui/password-input';
import { FloatingInput } from '@/src/shared/ui/floating-input';

export function LoginForm() {
  const t = useTranslations('pages.login');

  return (
    <form className="w-full flex flex-col gap-5 items-center">
      <FloatingInput type="email" label={t('emailPlaceholder')} />
      <PasswordInput label={t('passwordPlaceholder')} />

      <Button className="cursor-pointer w-55 h-12 rounded-[40px] uppercase text-sm mt-8 shadow-sm hover:bg-btn-hovered">
        {t('button')}
      </Button>
    </form>
  );
}
