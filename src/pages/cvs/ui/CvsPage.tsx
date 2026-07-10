import { fetchCvs } from '@/src/entities/cv/api/server';
import { CvsWidget } from '@/src/widgets/cvs-widget';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const CvsPage = async () => {
  const cookieStore = await cookies();
  const currentUserId = cookieStore.get('userId')?.value;

  if (!currentUserId) {
    console.error('The user is not logged in.');
    redirect('/auth/login');
  }

  const cvs = await fetchCvs();

  return (
    <div className="px-6">
      <h1 className="pt-4 pl-5 text-muted-foreground">CVs</h1>
      <CvsWidget currentUserId={currentUserId} cvs={cvs} />
    </div>
  );
};
