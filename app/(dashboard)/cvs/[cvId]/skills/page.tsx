import { CvSkillsPage } from '@/src/pages/cv-skills';
import { cookies } from 'next/headers';

export default async function CvSkills({ params }: { params: Promise<{ cvId: string }> }) {
  const { cvId } = await params;

  const cookieStore = await cookies();
  const loggedInUserId = cookieStore.get('userId')?.value;
  return <CvSkillsPage cvId={cvId} loggedInUserId={loggedInUserId} />;
}
