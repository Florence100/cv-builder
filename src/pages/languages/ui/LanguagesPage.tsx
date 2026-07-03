import { LnaguagesManager } from '@/src/widgets/languages-manager/ui/LnaguagesManager';

type LanguagesPageProps = {
  userId: string;
  loggedInUserId?: string;
};

export const LanguagesPage = ({ userId, loggedInUserId }: LanguagesPageProps) => {
  return <LnaguagesManager userId={userId} loggedInUserId={loggedInUserId} />;
};
