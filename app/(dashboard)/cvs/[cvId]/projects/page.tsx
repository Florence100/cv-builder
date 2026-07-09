import { CvProjectsPage } from '@/src/pages/cv-projects';
import { cookies } from 'next/headers';

export default async function CvProjects({ params }: { params: Promise<{ cvId: string }> }) {
  const { cvId } = await params;

  const cookieStore = await cookies();
  const loggedInUserId = cookieStore.get('userId')?.value;
  return <CvProjectsPage cvId={cvId} loggedInUserId={loggedInUserId} />;
}
