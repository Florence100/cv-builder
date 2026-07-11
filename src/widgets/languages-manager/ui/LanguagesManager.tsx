import { fetchLanguages } from '@/src/entities/language/api/server-fetch';
import { LanguageList } from '@/src/entities/language/ui/LanguageList';
import { fetchProfile } from '@/src/entities/profile/api/server-fetch';
import { InteractiveLanguagesArea } from '../../interactive-languages-area';
import { getTranslations } from 'next-intl/server';

type LanguagesManagerProps = {
  userId: string;
  loggedInUserId?: string;
};

export const LanguagesManager = async ({ userId, loggedInUserId }: LanguagesManagerProps) => {
  const t = await getTranslations('widgets.languagesManager');
  const profile = await fetchProfile(userId);
  const isOwner = loggedInUserId === userId;
  const allLanguages = await fetchLanguages();
  const userLanguageNames = profile?.languages.map((lang) => lang.name) || [];
  const remainedLanguages = allLanguages.filter((lang) => !userLanguageNames.includes(lang.name));

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden items-center">
      {userLanguageNames.length === 0 && (
        <div className="w-full flex justify-start">
          <p className="text-muted-foreground">{t('noLanguages')}</p>
        </div>
      )}
      <div className="felx-1 flex flex-col w-3xl pt-10 gap-8">
        {isOwner ? (
          <InteractiveLanguagesArea
            userId={userId}
            profileLanguages={profile?.languages || []}
            remainedLanguages={remainedLanguages}
          />
        ) : (
          <LanguageList userId={userId} profileLanguages={profile?.languages || []} />
        )}
      </div>
    </div>
  );
};
