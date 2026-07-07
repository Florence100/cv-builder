import { fetchCv } from '@/src/entities/cv/api/server';
import { CvDetailsForm } from '@/src/features/update-cv';

type CvDetailsPageProps = {
  cvId: string;
  loggedInUserId?: string;
};

export const CvDetailsPage = async ({ cvId, loggedInUserId }: CvDetailsPageProps) => {
  const cv = await fetchCv(cvId);

  if (!cv) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Could not find the CV you are looking for.</p>
      </div>
    );
  }

  const isOwner = loggedInUserId === cv?.user?.id;

  console.log(cv);

  return <CvDetailsForm cv={cv} isOwner={isOwner} />;
};
