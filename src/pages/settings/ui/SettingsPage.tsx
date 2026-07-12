import { SettingsWidget } from '@/src/widgets/settings-widget';
import { useTranslations } from 'next-intl';

export const SettingsPage = () => {
  const t = useTranslations('pages.settings');

  return (
    <div className="px-6">
      <h1 className="pt-4 pl-5 text-muted-foreground">{t('title')}</h1>
      <SettingsWidget />
    </div>
  );
};
