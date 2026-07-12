'use client';

import { LanguageList } from '@/src/entities/language/ui/LanguageList';
import { Language, LanguageProficiency } from 'cv-graphql';
import { useState } from 'react';
import { LanguagesActionButtons } from '../../languages-action-buttons';

type LanguagesAreaProps = {
  userId: string;
  profileLanguages: LanguageProficiency[];
  remainedLanguages: Language[];
};

export const InteractiveLanguagesArea = ({
  userId,
  profileLanguages,
  remainedLanguages,
}: LanguagesAreaProps) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (languageName: string) => {
    setSelectedIds((prev) =>
      prev.includes(languageName)
        ? prev.filter((id) => id !== languageName)
        : [...prev, languageName]
    );
  };

  return (
    <div>
      <LanguageList
        userId={userId}
        profileLanguages={profileLanguages}
        isDeleteMode={isDeleteMode}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelection}
      />
      <LanguagesActionButtons
        userId={userId}
        remainedLanguages={remainedLanguages}
        isDeleteMode={isDeleteMode}
        setIsDeleteMode={setIsDeleteMode}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
};
