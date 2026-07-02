import { ProfilePage } from '@/src/pages/profile/ui/ProfilePage';
import { cookies } from 'next/headers';

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const loggedInUserId = cookieStore.get('userId')?.value;
  return <ProfilePage userId={id} loggedInUserId={loggedInUserId} />;
}
