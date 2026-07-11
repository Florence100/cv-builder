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
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { REMOVE_CV_PROJECT } from '../api/mutations';

interface DeleteCvProjectModalProps {
  projectId: string;
}

export const DeleteCvProjectModal = ({ projectId }: DeleteCvProjectModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('features.deleteCvProject');
  const router = useRouter();
  const params = useParams<{ cvId: string; item: string }>();

  const cvId = params?.cvId;

  const [removeCvProject] = useMutation(REMOVE_CV_PROJECT);

  const onDelete = async (e?: React.SubmitEvent) => {
    e?.preventDefault();
    if (!cvId || !projectId) return;

    try {
      await removeCvProject({
        variables: {
          project: {
            cvId: cvId,
            projectId: projectId,
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
          <p>Are you sure you want to delete CV Project?</p>

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
