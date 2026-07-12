import { columns } from '@/src/entities/user';
import { UserTable } from '@/src/entities/user';
import { getUsers } from '@/src/entities/user';
import { cookies } from 'next/headers';

export async function UsersPage() {
  const cookieStore = await cookies();
  const currentUserId = cookieStore.get('userId')?.value || '';

  const users = await getUsers();
  const usersList = users.map((user) => ({
    ...user,
    isCurrentUser: user.id === currentUserId,
  }));

  return (
    <div className="w-full mx-auto lg:container">
      <UserTable columns={columns} data={usersList} />
    </div>
  );
}
