import { useTranslations } from 'next-intl';

export const MobileFallback = () => {
  const t = useTranslations('shared.ui.mobileFallback');
  return (
    <div className="flex md:hidden min-h-dvh flex-col items-center justify-center p-12 text-center">
      <h1 className="mb-4 text-3xl">{t('title')}</h1>
      <p className="text-muted-foreground">{t('subtitle')}</p>
    </div>
  );
};
