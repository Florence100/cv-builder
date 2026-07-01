import { fetchDepartments, fetchPositions, fetchUser } from '@/src/entities/user/api/user';
import { ProfileForm } from '@/src/features/update-profile';
import { cookies } from 'next/headers';

export const ProfilePage = async ({ userId }: { userId: string }) => {
  const [user, departmentsRes, positionsRes] = await Promise.all([
    fetchUser(userId),
    fetchDepartments(),
    fetchPositions(),
  ]);

  const departments = departmentsRes || [];
  const positions = positionsRes || [];

  const cookieStore = await cookies();
  const loggedInUserId = cookieStore.get('userId')?.value;

  const isOwner = loggedInUserId === userId;

  return (
    <ProfileForm
      user={user || null}
      departments={departments}
      positions={positions}
      isOwner={isOwner}
    />
  );
};
