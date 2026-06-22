import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
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

        <form className="w-full flex flex-col gap-5">
          <Input
            type="email"
            placeholder={t('emailPlaceholder')}
            className="h-12 p-3 text-base placeholder:text-base bg-transparent border-border rounded-none"
          />
          <Input
            type="password"
            placeholder={t('passwordPlaceholder')}
            className="h-12 p-3 text-base placeholder:text-base bg-transparent border-border rounded-none"
          />
          <div>
            <Button />
            <Button />
          </div>
        </form>
      </div>
    </div>
  );
};
