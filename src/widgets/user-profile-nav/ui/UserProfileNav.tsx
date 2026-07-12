'use client';

import { Tabs, TabsList, TabsTrigger } from '@/src/shared/ui/tabs';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
export const UserProfileNav = ({ userId }: { userId: string }) => {
  const t = useTranslations('widgets.userProfileNav');
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = pathname?.split('/').pop();

  const handleTabChange = (page: string) => {
    router.push(`/users/${userId}/${page}`);
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="pt-1.5">
      <TabsList variant="line">
        <TabsTrigger
          value="profile"
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-px"
        >
          {t('profileTab')}
        </TabsTrigger>
        <TabsTrigger
          value="skills"
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-px"
        >
          {t('skillsTab')}
        </TabsTrigger>
        <TabsTrigger
          value="languages"
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-px"
        >
          {t('languagesTab')}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
