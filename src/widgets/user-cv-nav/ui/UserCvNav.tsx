'use client';

import { Tabs, TabsList, TabsTrigger } from '@/src/shared/ui/tabs';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
export const UserCvNav = ({ cvId }: { cvId: string }) => {
  const t = useTranslations('widgets.userCvNav');
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = pathname?.split('/').pop();

  const handleTabChange = (page: string) => {
    router.push(`/cvs/${cvId}/${page}`);
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="pt-1.5">
      <TabsList variant="line">
        <TabsTrigger
          value="details"
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-px"
        >
          {t('detailsTab')}
        </TabsTrigger>
        <TabsTrigger
          value="skills"
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-px"
        >
          {t('skillsTab')}
        </TabsTrigger>
        <TabsTrigger
          value="projects"
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-px"
        >
          {t('projectsTab')}
        </TabsTrigger>
        <TabsTrigger
          value="preview"
          className="px-12 h-12 uppercase text-foreground data-[state=active]:text-primary after:bg-primary group-data-horizontal/tabs:after:-bottom-px"
        >
          {t('previewTab')}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
