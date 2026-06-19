import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { useTranslations } from 'next-intl';

export const SignupPage = () => {
  const t = useTranslations('pages.signup');

  return (
    <div>
      <div>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
        <div>
          <Input />
          <Input />
        </div>
        <div>
          <Button />
          <Button />
        </div>
      </div>
    </div>
  );
};
