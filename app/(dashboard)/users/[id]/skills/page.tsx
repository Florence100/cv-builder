import { SkillsPage } from '@/src/pages/skills';
import { cookies } from 'next/headers';

export default async function Skills({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const loggedInUserId = cookieStore.get('userId')?.value;

  return <SkillsPage userId={id} loggedInUserId={loggedInUserId} />;
}
