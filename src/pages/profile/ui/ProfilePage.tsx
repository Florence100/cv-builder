import { fetchDepartments, fetchPositions, fetchUser } from '@/src/entities/user/api/user';
import { ProfileForm } from '@/src/features/update-profile';

export const ProfilePage = async ({ userId }: { userId: string }) => {
  const [user, departmentsRes, positionsRes] = await Promise.all([
    fetchUser(userId),
    fetchDepartments(),
    fetchPositions(),
  ]);

  const departments = departmentsRes || [];
  const positions = positionsRes || [];

  return <ProfileForm user={user || null} departments={departments} positions={positions} />;
};
