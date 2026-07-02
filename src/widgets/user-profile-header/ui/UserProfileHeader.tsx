import { fetchUser } from '@/src/entities/user/api/user';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/src/shared/ui/breadcrumb';
import { PersonIcon } from '@/src/shared/ui/icons/person-icon';
import { getTranslations } from 'next-intl/server';

export const UserProfileHeader = async ({ userId }: { userId: string }) => {
  const t = await getTranslations('widgets.userProfileHeader');
  const user = await fetchUser(userId);

  const firstName = user?.profile?.first_name || '';
  const lastName = user?.profile?.last_name || '';
  const displayName = `${firstName} ${lastName}`.trim() || 'User Name';

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/users" className="text-base">
            {t('employeesTab')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/users/${user?.id}/profile`}
            className="text-base text-primary/60 hover:text-primary/80"
          >
            <div className="flex justify-center items-center gap-1.5">
              <PersonIcon />
              <span>{displayName}</span>
            </div>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
