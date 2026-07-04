'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/src/shared/ui/sidebar';
import { EmployeeIcon, SkillsIcon, CVsIcon, LanguagesIcon } from '@/src/shared/ui/icons/nav-icons';

interface AppNavigationProps {
  userId?: string;
}

function NavigationList({ userId }: AppNavigationProps) {
  const t = useTranslations('widgets.appNavigation');
  const { open } = useSidebar();
  const pathname = usePathname() || '';

  const NAV_ITEMS = [
    { href: '/users', labelKey: 'employeersTab', Icon: EmployeeIcon },
    { href: `/users/${userId}/skills`, labelKey: 'skillsTab', Icon: SkillsIcon },
    { href: '/languages', labelKey: 'languagesTab', Icon: LanguagesIcon },
    { href: '/cvs', labelKey: 'CVsTab', Icon: CVsIcon },
  ];

  const listItems = NAV_ITEMS.map((item) => {
    const Icon = item.Icon;

    const isActive = (href: string) => {
      if (href === '/users') {
        return pathname === '/users';
      }

      if (href.includes('/skills')) {
        return /^\/users\/\d+\/skills$/.test(pathname);
      }

      return pathname === href;
    };
    console.log(isActive);

    return (
      <Link
        href={item.href}
        key={item.href}
        className={`p-2 lg:pl-4 flex h-10 w-full justify-center lg:justify-start lg:h-[3.5rem] gap-2 lg:gap-4 items-center rounded-full lg:rounded-l-none hover:bg-neutral-subtle ${
          isActive(item.href) ? 'bg-neutral-subtle text-foreground' : 'text-muted-foreground'
        }`}
      >
        <Icon fill={isActive(item.href) ? '#2e2e2e' : '#00000099'} className="size-6 shrink-0" />
        <p className={`text-left truncate lg:w-full ${open ? 'block' : 'hidden'}`}>
          {t(item.labelKey)}
        </p>
      </Link>
    );
  });

  return listItems;
}

export const AppNavigation = ({ userId }: AppNavigationProps) => {
  return (
    <nav className="flex gap-2 lg:flex-col lg:gap-4">
      <NavigationList userId={userId} />
    </nav>
  );
};
