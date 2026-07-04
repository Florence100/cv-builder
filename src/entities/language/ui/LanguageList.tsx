import { UpdateLanguageModal } from '@/src/features/update-language';
import { LanguageProficiency } from 'cv-graphql';

type LanguageListProps = {
  userId: string;
  languages: LanguageProficiency[];
};

export const LanguageList = ({ userId, languages }: LanguageListProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-32 gap-y-3 w-fit h-fit">
      {languages.map((item) => {
        return <UpdateLanguageModal key={item.name} userId={userId} languageData={item} />;
      })}
    </div>
  );
};
