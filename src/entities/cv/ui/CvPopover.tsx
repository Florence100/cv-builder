import { Button } from '@/src/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/shared/ui/popover';
import { SeeMoreIcon } from '@/src/shared/ui/icons/see-more-icon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface CvPopoverProps {
  cvId: string;
}

export function CvPopover({ cvId }: CvPopoverProps) {
  const t = useTranslations('entities.cv.cvsTable');

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
            <Link href={`/cvs/${cvId}/details`}>{t('updateBtn')}</Link>
          </Button>
          <Button variant="ghost">{t('deleteBtn')}</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
