'use client';

import { Mastery, SkillMastery } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/src/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/select';
import { Button } from '@/src/shared/ui/button';
import { MASTERY_LIST } from '@/src/entities/skill';
import { useUpdateProfileSkill } from '../api/mutations';
import { useRouter } from 'next/navigation';
import { DialogClose } from '@/src/shared/ui/dialog';
// import { SetStateAction, Dispatch } from 'react';

type FormValues = {
  userId: string;
  name: string;
  categoryId: string;
  mastery: Mastery;
};

interface AddSkillModalProps {
  userId: string;
  skill: SkillMastery;
  setIsUpdatedMode(isUpdatedMode: boolean): void;
  // setIsUpdatedMode: Dispatch<SetStateAction<boolean>>;
}

export const UpdateSkillForm = ({ userId, skill, setIsUpdatedMode }: AddSkillModalProps) => {
  const t = useTranslations('features.addSkill');
  const [updateProfileSkill] = useUpdateProfileSkill();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: skill.name,
      mastery: Mastery[skill.mastery],
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!userId) return;

    try {
      await updateProfileSkill({
        variables: {
          skill: {
            userId: userId,
            name: skill.name,
            categoryId: skill.categoryId,
            mastery: data.mastery,
          },
        },
      });
      reset();
      router.refresh();
    } catch (error) {
      console.error(`${t('error')}:`, error);
    } finally {
      setIsUpdatedMode(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-2 flex flex-col gap-6">
      <div className="relative">
        <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
          {t('skillLabel')}
        </Label>
        <Select disabled>
          <SelectTrigger className="h-12 w-full bg-background border-border rounded-none cursor-default">
            <SelectValue placeholder={skill.name} />
          </SelectTrigger>
        </Select>
      </div>
      <div className="relative">
        <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
          {t('masterLabel')}
        </Label>
        <Controller
          name="mastery"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-12 w-full bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {MASTERY_LIST.map((item) => (
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
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-10 h-10 bg-primary hover:bg-primary/80 text-white border-none font-medium tracking-wide uppercase text-sm"
          >
            {t('cancelButton')}
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={!isValid}
          className="rounded-full px-10 h-10 bg-primary hover:bg-primary/80 text-white border-none font-medium tracking-wide uppercase text-sm"
        >
          {t('confirmButton')}
        </Button>
      </div>
    </form>
  );
};
