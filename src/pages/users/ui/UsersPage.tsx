import { columns } from '@/src/entities/user';
import { UserTable } from '@/src/entities/user';
import { getUsers } from '@/src/entities/user';

export async function UsersPage() {
  const usersList = await getUsers();

  return (
    <div className="w-full mx-auto lg:container">
      <UserTable columns={columns} data={usersList} />
    </div>
  );
}
