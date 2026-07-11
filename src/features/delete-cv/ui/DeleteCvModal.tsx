'use client';

import { Button } from '@/src/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/dialog';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DELETE_CV } from '../api/graphql';

interface DeleteCvModalProps {
  cvId: string;
  name: string;
}

export const DeleteCvModal = ({ cvId, name }: DeleteCvModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('features.deleteCv');
  const router = useRouter();

  const [deleteCv] = useMutation(DELETE_CV);

  const onDelete = async (e?: React.SubmitEvent) => {
    e?.preventDefault();
    if (!cvId) return;

    try {
      await deleteCv({
        variables: {
          cv: {
            cvId: cvId,
          },
        },
      });
    } catch (error) {
      console.error(`${t('error')}:`, error);
    }

    setIsOpen(false);
    router.refresh();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onDelete();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">{t('deleteButton')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 py-4 px-6 bg-background rounded-sm border-none text-foreground shadow-xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal tracking-wide text-foreground">
            {t('header')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onDelete} onKeyDown={handleKeyDown} className="flex flex-col gap-6">
          <p>
            {t('question')} <strong>{name}</strong>?
          </p>

          <div className="flex justify-center sm:justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="rounded-full px-10 h-10 bg-transparent border-border hover:border-border-hovered text-muted-foreground hover:bg-gray-150 font-medium tracking-wide uppercase text-sm"
            >
              {t('cancelButton')}
            </Button>
            <Button
              type="submit"
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
