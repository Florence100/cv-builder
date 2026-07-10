import { cvColumns, CvsTable } from '@/src/entities/cv';
import { CreateCvModal } from '@/src/features/create-cv';
import { Cv } from 'cv-graphql';
import { useTranslations } from 'next-intl';

interface CvProjectsProps {
  currentUserId: string;
  cvs: Cv[];
}

export const CvsWidget = ({ currentUserId, cvs }: CvProjectsProps) => {
  const t = useTranslations('widgets.cvsWidget');

  const cvsList = cvs.map((cv) => ({
    ...cv,
    isCurrentUserCv: cv.user?.id === currentUserId,
  }));

  return (
    <div className="w-full mx-auto lg:container relative">
      <div className="absolute top-4 right-0">
        <CreateCvModal userId={currentUserId} />
      </div>
      {cvs.length === 0 && <p className="py-4 px-5 text-muted-foreground">{t('noCvs')}</p>}
      {cvs.length > 0 && <CvsTable columns={cvColumns} data={cvsList} />}
    </div>
  );
};
