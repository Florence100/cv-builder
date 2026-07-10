import { Button } from '@/src/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/shared/ui/popover';
import { SeeMoreIcon } from '@/src/shared/ui/icons/see-more-icon';
import { useTranslations } from 'next-intl';

export function PopoverDemo() {
  const t = useTranslations('entities.cvProject.table');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" aria-label="See more" className="w-12">
          <SeeMoreIcon color="gray" className="size-10" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-25">
        <div className="flex flex-col gap-1">
          <Button variant="ghost">{t('updateBtn')}</Button>
          <Button variant="ghost">{t('removeBtn')}</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
