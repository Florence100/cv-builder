import { cn } from '@/src/shared/lib/class-names';
import { LanguageProficiency } from 'cv-graphql';

type LanguageItemProps = {
  languageData: LanguageProficiency;
  onToggleSelect: (name: string) => void;
  isSelected: boolean;
};

export const LanguageItem = ({ languageData, onToggleSelect, isSelected }: LanguageItemProps) => {
  const isNative = languageData.proficiency.toLowerCase() === 'native';

  return (
    <div
      onClick={() => onToggleSelect(languageData.name)}
      className={cn(
        'flex items-center gap-6 text-base cursor-pointer px-4 py-2 border rounded-md transition-all duration-200',
        isSelected ? 'bg-muted border-border' : 'bg-transparent border-transparent hover:bg-muted'
      )}
    >
      <span className={`w-16 ${isNative ? 'text-primary' : 'text-positive'}`}>
        {languageData.proficiency}
      </span>
      <span className={`${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
        {languageData.name}
      </span>
    </div>
  );
};
