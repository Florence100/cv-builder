import { UserProfileHeader } from '@/src/widgets/user-profile-header';
import { UserProfileNav } from '@/src/widgets/user-profile-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="px-6">
        <div className="pt-4 pb-1 pl-5">
          <UserProfileHeader />
        </div>
        <UserProfileNav />
      </div>
      <div className="p-8">{children}</div>
    </>
  );
}
