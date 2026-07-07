'use client';

import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Label } from '@/src/shared/ui/label';
import { Textarea } from '@/src/shared/ui/textarea';
import { Cv } from 'cv-graphql';
import { useForm } from 'react-hook-form';
import { UPDATE_CV } from '../api/graphql';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

type CvDetailsFormValues = {
  name: string;
  education: string;
  description: string;
};

export const CvDetailsForm = ({ cv, isOwner }: { cv: Cv; isOwner: boolean }) => {
  const t = useTranslations('features.updateCv');

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<CvDetailsFormValues>({
    defaultValues: {
      name: cv?.name || '',
      education: cv?.education || '',
      description: cv?.description || '',
    },
  });

  const [updateCv] = useMutation(UPDATE_CV);
  const router = useRouter();

  const onSubmit = async (data: CvDetailsFormValues) => {
    if (!isOwner) return;

    try {
      await updateCv({
        variables: {
          cv: {
            cvId: cv.id,
            name: data.name,
            education: data.education,
            description: data.description,
          },
        },
      });

      reset({
        name: data.name || '',
        education: data.education || '',
        description: data.description || '',
      });

      const textareaEl = document.getElementById('description-textarea');
      if (textareaEl) {
        textareaEl.scrollTop = 0;
      }

      router.refresh();
    } catch (error) {
      console.error(`${t('error')}:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col max-w-3xl gap-9">
        <div className="relative">
          <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
            {t('nameLabel')}
          </Label>
          <Input
            type="text"
            disabled={!isOwner}
            {...register('name')}
            className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
          />
        </div>
        <div className="relative">
          <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
            {t('educationLabel')}
          </Label>
          <Input
            type="text"
            disabled={!isOwner}
            {...register('education')}
            className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
          />
        </div>
        <div className="relative">
          <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
            {t('descriptionLabel')}
          </Label>
          <div className="h-48 p-10 bg-transparent border border-border rounded-none focus-within:border-border-focused hover:border-border-hovered transition-colors">
            <Textarea
              id="description-textarea"
              disabled={!isOwner}
              {...register('description')}
              className="h-full w-full p-0 border-none bg-transparent outline-none rounded-none resize-none focus-visible:ring-0 focus-visible:border-transparent scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            />
          </div>
        </div>
        {isOwner && (
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="w-[45%] h-12 text-base uppercase self-end bg-primary disabled:opacity-100 disabled:bg-black/12 hover:opacity-90 text-primary-foreground disabled:text-black/26 font-medium tracking-wide rounded-full"
          >
            {t('updateButton')}
          </Button>
        )}
      </div>
    </form>
  );
};
