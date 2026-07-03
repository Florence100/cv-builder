import { LanguageProficiency } from 'cv-graphql';

export const LanguageList = ({ languages }: { languages: LanguageProficiency[] }) => {
  return (
    <div className="grid grid-cols-2 gap-x-32 gap-y-4 w-fit h-fit">
      {languages.map((item) => {
        const isNative = item.proficiency.toLowerCase() === 'native';
        return (
          <div key={item.name} className="flex items-center gap-6 text-base">
            <span className={`w-16 ${isNative ? 'text-primary' : 'text-positive'}`}>
              {item.proficiency}
            </span>
            <span className="text-muted-foreground">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};
