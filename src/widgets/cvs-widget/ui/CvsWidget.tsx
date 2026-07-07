import { cvColumns, CvsTable } from '@/src/entities/cv';
import { fetchCvs } from '@/src/entities/cv/api/server';
import { cookies } from 'next/headers';

export const CvsWidget = async () => {
  const cookieStore = await cookies();
  const currentUserId = cookieStore.get('userId')?.value || '';

  const cvs = await fetchCvs();
  console.log(cvs);
  const cvsList = cvs.map((cv) => ({
    ...cv,
    isCurrentUserCv: cv.user?.id === currentUserId,
  }));

  return (
    <div className="w-full mx-auto lg:container">
      <CvsTable columns={cvColumns} data={cvsList} />
    </div>
  );
};
