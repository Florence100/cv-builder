import { getCvProjects } from '@/src/entities/project/api/server';
import { CvProjects } from '@/src/widgets/cv-projects';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type CvProjectPageProps = {
  cvId: string;
};

export const CvProjectsPage = async ({ cvId }: CvProjectPageProps) => {
  const cookieStore = await cookies();
  const currentUserId = cookieStore.get('userId')?.value;

  if (!currentUserId) {
    console.error('The user is not logged in.');
    redirect('/auth/login');
  }

  const cvProjects = (await getCvProjects(cvId)) || [];
  console.log('cvProjects', cvProjects);

  return <CvProjects cvProjects={cvProjects} />;
};
