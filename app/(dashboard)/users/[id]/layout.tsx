import { UserProfileHeader } from '@/src/widgets/user-profile-header';
import { UserProfileNav } from '@/src/widgets/user-profile-nav';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id } = await params;
  return (
    <>
      <div className="px-6">
        <div className="pt-4 pb-1 pl-5">
          <UserProfileHeader userId={id} />
        </div>
        <UserProfileNav userId={id} />
      </div>
      <div className="h-full overflow-y-auto p-8">{children}</div>
    </>
  );
}
