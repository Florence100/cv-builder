'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from '@/src/shared/ui/sidebar';
import { AppNavigation } from '@/src/widgets/app-navigation/index';

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar>
      <SidebarContent className="pt-[2.75rem]">
        <AppNavigation />
      </SidebarContent>
      <SidebarFooter className="p-2 flex flex-col gap-4">
        <button className="flex gap-2 items-center">
          <p className="rounded-full w-10 h-10 bg-primary flex items-center justify-center text-white text-xl font-medium">
            U
          </p>
          <p className={`text-left truncate w-32 ${open ? 'block' : 'hidden'}`}>User Name</p>
        </button>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
