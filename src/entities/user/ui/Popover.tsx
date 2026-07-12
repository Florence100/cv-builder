import { Button } from '@/src/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/shared/ui/popover';
import { SeeMoreIcon } from '@/src/shared/ui/icons/see-more-icon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface PopoverDemoProps {
  id: string;
}

export function PopoverDemo({ id }: PopoverDemoProps) {
  const t = useTranslations('entities.user.table');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" aria-label="See the profile" className="w-12">
          <SeeMoreIcon color="gray" className="size-10" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-25">
        <div className="flex flex-col gap-1">
          <Button variant="ghost">
            <Link href={`/users/${id}/profile`}>{t('profileBtn')}</Link>
          </Button>
          <Button variant="ghost">{t('updateBtn')}</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
