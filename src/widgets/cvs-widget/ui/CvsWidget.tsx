import { cvColumns, CvsTable } from '@/src/entities/cv';
import { fetchCvs } from '@/src/entities/cv/api/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const CvsWidget = async () => {
  const cookieStore = await cookies();
  const currentUserId = cookieStore.get('userId')?.value;

  if (!currentUserId) {
    console.error('The user is not logged in.');
    redirect('/auth/login');
  }

  const cvs = await fetchCvs();
  const cvsList = cvs.map((cv) => ({
    ...cv,
    isCurrentUserCv: cv.user?.id === currentUserId,
  }));

  return (
    <div className="w-full mx-auto lg:container">
      <CvsTable columns={cvColumns} data={cvsList} currentUserId={currentUserId} />
    </div>
  );
};
