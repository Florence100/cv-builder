'use client';

import { DELETE_PROFILE_LANGUAGE } from '@/src/entities/language/api/graphql';
import { AddLanguageModal } from '@/src/features/add-language';
import { Button } from '@/src/shared/ui/button';
import { RemoveButton } from '@/src/shared/ui/removeButton';
import { useMutation } from '@apollo/client/react';
import { Language } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type LanguagesActionButtonsProps = {
  userId: string;
  remainedLanguages: Language[];
  isDeleteMode: boolean;
  setIsDeleteMode: (mode: boolean) => void;
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
};

export const LanguagesActionButtons = ({
  userId,
  remainedLanguages,
  isDeleteMode,
  setIsDeleteMode,
  selectedIds,
  setSelectedIds,
}: LanguagesActionButtonsProps) => {
  const t = useTranslations('widgets.languagesActionButtons');
  const selectedCount = selectedIds.length;
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteProfileLanguage] = useMutation(DELETE_PROFILE_LANGUAGE);

  const handleDelete = async () => {
    if (selectedCount === 0) return;

    setIsDeleting(true);

    try {
      await deleteProfileLanguage({
        variables: {
          language: {
            userId: userId,
            name: selectedIds,
          },
        },
      });

      setSelectedIds([]);
      setIsDeleteMode(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete languages:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end mt-4">
      {isDeleteMode ? (
        <div className="flex items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
          <Button
            variant="outline"
            disabled={isDeleting}
            onClick={() => {
              setIsDeleteMode(false);
              setSelectedIds([]);
            }}
            className="rounded-full px-10 h-10 bg-transparent border-border hover:border-border-hovered text-muted-foreground hover:bg-gray-150 font-medium tracking-wide uppercase text-sm"
          >
            {t('closeButton')}
          </Button>

          <Button
            onClick={handleDelete}
            disabled={selectedCount === 0 || isDeleting}
            className="rounded-full px-10 h-10 bg-primary hover:bg-primary/80 text-white border-none font-medium tracking-wide uppercase text-sm"
          >
            {isDeleting ? t('deletingButton') : t('deleteButton')}
            {selectedCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 ml-1 bg-white text-primary rounded-full text-xs font-bold">
                {selectedCount}
              </span>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex gap-6">
          <AddLanguageModal userId={userId} remainedLanguages={remainedLanguages} />
          <RemoveButton onClick={() => setIsDeleteMode(true)} value={t('removeButton')} />
        </div>
      )}
    </div>
  );
};
