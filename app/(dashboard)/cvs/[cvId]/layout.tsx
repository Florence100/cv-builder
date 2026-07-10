import { UserCvHeader } from '@/src/widgets/user-cv-header';
import { UserCvNav } from '@/src/widgets/user-cv-nav/ui/UserCvNav';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ cvId: string }>;
  children: React.ReactNode;
}) {
  const { cvId } = await params;
  return (
    <>
      <div className="px-6">
        <div className="pt-4 pb-1 pl-5">
          <UserCvHeader cvId={cvId} />
        </div>
        <UserCvNav cvId={cvId} />
      </div>
      <div className="h-full overflow-y-auto">{children}</div>
    </>
  );
}
