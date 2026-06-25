import { SidebarProvider } from '@/src/shared/ui/sidebar';
import { AppSidebar } from '@/src/shared/ui/app-sidebar';

type DesktopSidebarProps = {
  children: React.ReactNode;
  className?: string;
};

export function DesktopSidebar({ children }: DesktopSidebarProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
