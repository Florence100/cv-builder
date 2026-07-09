import { fetchCv } from '@/src/entities/cv/api/server';
import { CvDetailsForm } from '@/src/features/update-cv';
import { getTranslations } from 'next-intl/server';

type CvDetailsPageProps = {
  cvId: string;
  loggedInUserId?: string;
};

export const CvDetailsPage = async ({ cvId, loggedInUserId }: CvDetailsPageProps) => {
  const cv = await fetchCv(cvId);
  const t = await getTranslations('pages.cvDetails');

  if (!cv) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>{t('noCv')}</p>
      </div>
    );
  }

  const isOwner = loggedInUserId === cv?.user?.id;

  return (
    <div className="p-8 pt-10">
      <CvDetailsForm cv={cv} isOwner={isOwner} />;
    </div>
  );
};
