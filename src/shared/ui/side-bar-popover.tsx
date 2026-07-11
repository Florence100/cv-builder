'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/src/shared/ui/popover';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { UserButton } from '@/src/shared/ui/user-button';
import { User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/src/shared/ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface SideBarPopoverProps {
  userId: string;
}

export function SideBarPopover({ userId }: SideBarPopoverProps) {
  const t = useTranslations('shared.ui.sideBarPopover');
  const router = useRouter();

  const onLogoutClickHandler = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/auth/login');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <UserButton />
      </PopoverTrigger>
      <PopoverContent className="w-50">
        <div className="flex flex-col gap-1">
          <Link
            href={`/users/${userId}/profile`}
            className="p-2 flex w-full justify-start gap-2 items-center text-muted-foreground hover:text-foreground"
          >
            <User />
            <p className="text-left truncate text-lg">{t('profile')}</p>
          </Link>
          <Link
            href={`/settings`}
            className="p-2 flex w-full justify-start gap-2 items-center text-muted-foreground hover:text-foreground"
          >
            <Settings />
            <p className="text-left truncate text-lg">{t('settings')}</p>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-primary"
            onClick={onLogoutClickHandler}
          >
            <LogOut className="size-5" />
            <p className="text-left truncate text-lg font-normal">{t('logout')}</p>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
