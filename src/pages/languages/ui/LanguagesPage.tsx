import { LanguagesManager } from '@/src/widgets/languages-manager/ui/LanguagesManager';

type LanguagesPageProps = {
  userId: string;
  loggedInUserId?: string;
};

export const LanguagesPage = ({ userId, loggedInUserId }: LanguagesPageProps) => {
  return <LanguagesManager userId={userId} loggedInUserId={loggedInUserId} />;
};
