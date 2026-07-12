import { LanguageSwitcher } from '@/src/features/switch-language';
import { ThemeSwitcher } from '@/src/features/switch-theme';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';

export const SettingsWidget = async () => {
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get('theme')?.value || 'light';

  const currentLocale = await getLocale();

  return (
    <div className="p-8 w-full flex flex-col items-center gap-8">
      <ThemeSwitcher initialTheme={currentTheme} />
      <LanguageSwitcher initialLocale={currentLocale} />
    </div>
  );
};
