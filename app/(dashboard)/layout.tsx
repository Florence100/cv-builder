import { DesktopSidebar } from '@/src/widgets/desktopSidebar';
import { MobileBottomNav } from '@/src/widgets/mobileBottomNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Desktop */}
      <DesktopSidebar className="hidden md:block">{children}</DesktopSidebar>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </>
  );
}
