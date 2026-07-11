import { Button } from '@/src/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/shared/ui/popover';
import { SeeMoreIcon } from '@/src/shared/ui/icons/see-more-icon';
import { useTranslations } from 'next-intl';
import type { CvProject } from 'cv-graphql';
import { DeleteCvProjectModal } from '@/src/features/delete-cv-project';

type PopoverDemoProps = {
  onEdit(cvProject: CvProject): void;
  cvProject: CvProject;
};

export function PopoverDemo({ onEdit, cvProject }: PopoverDemoProps) {
  const t = useTranslations('entities.cvProject.table');

  console.log('cvProject: ', cvProject);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" aria-label="See more" className="w-12">
          <SeeMoreIcon color="gray" className="size-10" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-25">
        <div className="flex flex-col gap-1">
          <Button
            onClick={() => {
              onEdit(cvProject);
            }}
            variant="ghost"
          >
            {t('updateBtn')}
          </Button>
          <DeleteCvProjectModal projectId={cvProject.project.id} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
