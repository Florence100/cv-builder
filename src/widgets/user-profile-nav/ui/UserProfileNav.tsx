'use client';

import { Tabs, TabsList, TabsTrigger } from '@/src/shared/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';
export const UserProfileNav = ({ userId }: { userId: string }) => {
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
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-[1px]"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="skills"
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-[1px]"
        >
          Skills
        </TabsTrigger>
        <TabsTrigger
          value="languages"
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-[1px]"
        >
          Languages
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
