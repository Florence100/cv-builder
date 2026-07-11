import { ThemeSwitcher } from '@/src/features/switch-language';
import { cookies } from 'next/headers';

export const SettingsWidget = async () => {
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get('theme')?.value || 'light';

  return (
    <div className="p-8 w-full flex flex-col items-center">
      <ThemeSwitcher initialTheme={currentTheme} />
    </div>
  );
};
