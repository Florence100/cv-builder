import { Sidebar, SidebarContent, SidebarFooter, SidebarTrigger } from '@/src/shared/ui/sidebar';
import { AppNavigation } from '@/src/widgets/app-navigation/index';
import { SideBarPopover } from './side-bar-popover';

interface AppSidebarProps {
  userId: string;
}

export function AppSidebar({ userId }: AppSidebarProps) {
  return (
    <Sidebar className="p-0">
      <SidebarContent className="pt-11 bg-background">
        <AppNavigation userId={userId} />
      </SidebarContent>
      <SidebarFooter className="p-2 flex flex-col gap-4 bg-background">
        <SideBarPopover userId={userId} />
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
