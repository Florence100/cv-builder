import { ProfilePage } from '@/src/pages/profile/ui/ProfilePage';

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProfilePage userId={id} />;
}
