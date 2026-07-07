'use client';

import { Skill, Mastery } from 'cv-graphql';
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
import { useAddProfileSkill } from '../api/mutations';
import { useRouter } from 'next/navigation';
import { DialogClose } from '@/src/shared/ui/dialog';

type FormValues = {
  userId: string;
  name: string;
  mastery: Mastery;
};

interface AddSkillModalProps {
  userId: string;
  skills: Skill[];
}

export const AddSkillForm = ({ userId, skills }: AddSkillModalProps) => {
  const t = useTranslations('features.addSkill');
  const [addProfileSkill] = useAddProfileSkill();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      userId: userId,
      name: '',
      mastery: Mastery.Novice,
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!userId) return;

    console.log('data: ', data);

    try {
      await addProfileSkill({
        variables: {
          skill: {
            userId: userId,
            name: data.name.split(' ')[0],
            categoryId: data.name.split(' ')[1] || null,
            mastery: data.mastery,
          },
        },
      });
    } catch (error) {
      console.error(`${t('error')}:`, error);
    }

    reset();
    router.refresh();
  };

  // const hasNoSkillsLeft = remainedSkills.length === 0;

  // if (hasNoSkillsLeft) {
  //   return (
  //     <div title={t('disabledButtonTitle')}>
  //       <AddButton value={t('addBtn')} className="opacity-50 cursor-default" disabled />
  //     </div>
  //   );
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-2 flex flex-col gap-6">
      <div className="relative">
        <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
          {t('skillLabel')}
        </Label>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-12 w-full bg-background border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {skills.map((skill) => (
                  <SelectItem
                    key={skill.id}
                    value={`${skill.name} ${skill.category ? skill.category.id : null}`}
                    className="bg-background focus:bg-select-item"
                  >
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
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
