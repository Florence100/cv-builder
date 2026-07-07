import { CvDetailsPage } from '@/src/pages/cv-details';
import { cookies } from 'next/headers';

export default async function CvDetails({ params }: { params: Promise<{ cvId: string }> }) {
  const { cvId } = await params;

  const cookieStore = await cookies();
  const loggedInUserId = cookieStore.get('userId')?.value;
  return <CvDetailsPage cvId={cvId} loggedInUserId={loggedInUserId} />;
}
