'use client';

import { Label } from '@/src/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/select';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Cookies from 'js-cookie';

interface ThemeSwitcherProps {
  initialTheme: string;
}

export const ThemeSwitcher = ({ initialTheme }: ThemeSwitcherProps) => {
  const t = useTranslations('features.switchTheme');
  const [theme, setTheme] = useState<string>(initialTheme);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    Cookies.set('theme', newTheme, { expires: 365, path: '/' });

    const root = window.document.documentElement;
    root.classList.remove('dark');

    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'device') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isSystemDark) {
        root.classList.add('dark');
      }
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
        {t('appearance')}
      </Label>
      <Select value={theme} onValueChange={handleThemeChange}>
        <SelectTrigger className="h-12 w-full bg-background border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectItem value="light" className="bg-background focus:bg-select-item">
            {t('lightTheme')}
          </SelectItem>
          <SelectItem value="dark" className="bg-background focus:bg-select-item">
            {t('darkTheme')}
          </SelectItem>
          <SelectItem value="device" className="bg-background focus:bg-select-item">
            {t('deviceTheme')}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
