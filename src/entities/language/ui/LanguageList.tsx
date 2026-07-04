import { UpdateLanguageModal } from '@/src/features/update-language';
import { LanguageProficiency } from 'cv-graphql';
import { LanguageItem } from './LanguageItem';

type LanguageListProps = {
  userId: string;
  profileLanguages: LanguageProficiency[];
  isDeleteMode?: boolean;
  selectedIds?: string[];
  onToggleSelect?: (name: string) => void;
};

export const LanguageList = ({
  userId,
  profileLanguages,
  isDeleteMode,
  selectedIds,
  onToggleSelect,
}: LanguageListProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-32 gap-y-3 w-fit h-fit">
      {profileLanguages.map((item) => {
        if (isDeleteMode && onToggleSelect && selectedIds) {
          const isSelected = selectedIds?.includes(item.name);
          return (
            <LanguageItem
              key={item.name}
              languageData={item}
              onToggleSelect={onToggleSelect}
              isSelected={isSelected}
            />
          );
        }
        return <UpdateLanguageModal key={item.name} userId={userId} languageData={item} />;
      })}
    </div>
  );
};
