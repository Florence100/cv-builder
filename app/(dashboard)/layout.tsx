import { SidebarProvider } from '@/src/shared/ui/sidebar';
import { AppSidebar } from '@/src/shared/ui/app-sidebar';
import { AppNavigation } from '@/src/widgets/app-navigation';
import { UserButton } from '@/src/shared/ui/user-button';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="hidden lg:block bg-background">
        <AppSidebar />
      </div>

      <main className="flex-1 h-dvh pb-16 lg:pb-0 bg-background overflow-hidden">{children}</main>

      <div className="flex gap-2 lg:hidden fixed bottom-0 left-0 right-0 z-50 p-2 pl-4 pr-4 bg-background">
        <div className="flex-4">
          <AppNavigation />
        </div>
        <div className="flex-1">
          <UserButton />
        </div>
      </div>
    </SidebarProvider>
  );
}
