'use client';

import { UPDATE_PROFILE_LANGUAGE } from '@/src/entities/language/api/graphql';
import { PROFICIENCIES_LIST } from '@/src/entities/language/model/constants';
import { Button } from '@/src/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/dialog';
import { Label } from '@/src/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/select';
import { useMutation } from '@apollo/client/react';
import { LanguageProficiency, Proficiency } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
  proficiency: Proficiency | '';
};

interface UpdateLanguageModalProps {
  userId: string;
  languageData: LanguageProficiency;
}

export const UpdateLanguageModal = ({ userId, languageData }: UpdateLanguageModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('features.updateLanguage');
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<FormValues>({
    values: {
      proficiency: languageData.proficiency,
    },
  });

  const [updateProfileLanguage] = useMutation(UPDATE_PROFILE_LANGUAGE);

  const onSubmit = async (data: FormValues) => {
    if (!userId) return;

    try {
      await updateProfileLanguage({
        variables: {
          language: {
            userId: userId,
            name: languageData.name,
            proficiency: data.proficiency as Proficiency,
          },
        },
      });
    } catch (error) {
      console.error(`${t('error')}:`, error);
    }

    setIsOpen(false);
    reset();
    router.refresh();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset();
    }
  };

  const isNative = languageData.proficiency.toLowerCase() === 'native';

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-6 text-base cursor-pointer px-4 py-2 rounded-md hover:bg-muted">
          <span className={`w-16 ${isNative ? 'text-primary' : 'text-positive'}`}>
            {languageData.proficiency}
          </span>
          <span className="text-muted-foreground">{languageData.name}</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 p-4 bg-background rounded-sm border-none text-foreground shadow-xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal tracking-wide text-foreground">
            {t('header')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="py-2 flex flex-col gap-6">
          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground/60 font-normal z-10">
              {t('languageLabel')}
            </Label>
            <Select disabled>
              <SelectTrigger className="h-12 w-full bg-background border-border rounded-none cursor-default">
                <SelectValue placeholder={languageData.name} />
              </SelectTrigger>
            </Select>
          </div>
          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              {t('proficiencyLabel')}
            </Label>
            <Controller
              name="proficiency"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 w-full bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {PROFICIENCIES_LIST.map((item) => (
                      <SelectItem
                        key={item.label}
                        value={item.value}
                        className="bg-background focus:bg-select-item"
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex justify-center sm:justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="rounded-full px-10 h-10 bg-transparent border-border hover:border-border-hovered text-muted-foreground hover:bg-gray-150 font-medium tracking-wide uppercase text-sm"
            >
              {t('cancelButton')}
            </Button>
            <Button
              type="submit"
              disabled={!isValid || !isDirty}
              className="rounded-full px-10 h-10 bg-primary hover:bg-primary/80 text-white border-none font-medium tracking-wide uppercase text-sm"
            >
              {t('confirmButton')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
