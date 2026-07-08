'use client';

import { Button } from '@/src/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/dialog';
import { Label } from '@/src/shared/ui/label';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CREATE_CV } from '../api/graphql';
import { Input } from '@/src/shared/ui/input';
import { Textarea } from '@/src/shared/ui/textarea';
import { CreateButton } from '@/src/shared/ui/create-button';

type CreateCvFormValues = {
  name: string;
  education: string;
  description: string;
};

interface CreateCvModalProps {
  userId: string;
}

export const CreateCvModal = ({ userId }: CreateCvModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('features.createCv');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateCvFormValues>({
    defaultValues: {
      name: '',
      education: '',
      description: '',
    },
  });

  const [createCv] = useMutation(CREATE_CV);

  const onSubmit = async (data: CreateCvFormValues) => {
    if (!userId) return;

    try {
      await createCv({
        variables: {
          cv: {
            userId: userId,
            name: data.name,
            education: data.education,
            description: data.description,
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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="w-55">
          <CreateButton value={t('createButton').toUpperCase()} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 py-4 px-6 bg-background rounded-sm border-none text-foreground shadow-xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal tracking-wide text-foreground">
            {t('header')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="py-2 flex flex-col gap-6">
          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              {t('nameLabel')}
            </Label>
            <Input
              type="text"
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
              {...register('education')}
              className="h-12 bg-transparent border-border rounded-none hover:border-border-hovered focus-visible:border-border-focused"
            />
          </div>
          <div className="relative">
            <Label className="absolute -top-2 left-3 bg-background px-1 text-xs text-muted-foreground font-normal z-10">
              {t('descriptionLabel')}
            </Label>
            <div className="h-48 p-3 bg-transparent border border-border rounded-none focus-within:border-border-focused hover:border-border-hovered transition-colors">
              <Textarea
                id="description-textarea"
                {...register('description')}
                className="h-full w-full p-0 border-none bg-transparent outline-none rounded-none resize-none focus-visible:ring-0 focus-visible:border-transparent scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              />
            </div>
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
              disabled={!isValid}
              className="rounded-full px-10 h-10 bg-primary hover:bg-primary/80 text-white border-none font-medium tracking-wide uppercase text-sm"
            >
              {t('submitButton')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
