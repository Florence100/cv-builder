import { Sidebar, SidebarContent, SidebarFooter, SidebarTrigger } from '@/src/shared/ui/sidebar';
import { UserButton } from '@/src/shared/ui/user-button';
import { AppNavigation } from '@/src/widgets/app-navigation/index';
import { cookies } from 'next/headers';

export async function AppSidebar() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  return (
    <Sidebar>
      <SidebarContent className="pt-[2.75rem] bg-background">
        <AppNavigation userId={userId} />
      </SidebarContent>
      <SidebarFooter className="p-2 flex flex-col gap-4 bg-background">
        <UserButton />
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
