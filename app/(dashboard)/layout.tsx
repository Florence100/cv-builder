import { SidebarProvider } from '@/src/shared/ui/sidebar';
import { AppSidebar } from '@/src/shared/ui/app-sidebar';
import { MobileBottomNav } from '@/src/widgets/mobileBottomNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        <main className="flex-1 pb-16 md:pb-0">{children}</main>

        <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
          <MobileBottomNav />
        </div>
      </SidebarProvider>
    </>
  );
}
