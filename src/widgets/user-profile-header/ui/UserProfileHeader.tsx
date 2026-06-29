import { fetchUser } from '@/src/entities/user/api/user';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/src/shared/ui/breadcrumb';
import { PersonIcon } from '@/src/shared/ui/icons/person-icon';

export const UserProfileHeader = async ({ userId }: { userId: string }) => {
  const user = await fetchUser(userId);

  console.log(user);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="text-base">
            Employees
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="text-base text-primary/60 hover:text-primary/80">
            <div className="flex justify-center items-center gap-1.5">
              <PersonIcon />
              <span>{user?.profile.full_name ? user?.profile.full_name : 'User Name'}</span>
            </div>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-base">Profile</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
