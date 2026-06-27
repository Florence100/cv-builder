import { Tabs, TabsList, TabsTrigger } from '@/src/shared/ui/tabs';
export const UserProfileNav = () => {
  return (
    <Tabs defaultValue="profile" className="pt-1.5">
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
