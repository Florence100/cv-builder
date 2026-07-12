'use client';

import { SUPPORTED_LOCALES } from '@/src/shared/i18n/config';
import { Label } from '@/src/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/select';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LanguageSwitcherProps {
  initialLocale: string;
}

export const LanguageSwitcher = ({ initialLocale }: LanguageSwitcherProps) => {
  const router = useRouter();
  const t = useTranslations('features.switchLanguage');

  const [locale, setLocale] = useState<string>(initialLocale);

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <div className="relative w-full max-w-3xl">
      <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
        {t('label')}
      </Label>
      <Select value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="h-12 w-full bg-background border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          {SUPPORTED_LOCALES.map((loc) => (
            <SelectItem
              key={loc.value}
              value={loc.value}
              className="bg-background focus:bg-select-item"
            >
              {loc.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
