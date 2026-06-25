import { SidebarProvider } from '@/src/shared/ui/sidebar';
import { AppSidebar } from '@/src/shared/ui/app-sidebar';

export function DesktopSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
