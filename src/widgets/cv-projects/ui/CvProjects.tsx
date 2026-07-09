import type { CvProject } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { CvProjectTable } from '@/src/entities/project';
import { columns } from '@/src/entities/project/ui/Columns';

interface CvProjectsProps {
  cvProjects: CvProject[];
}

export function CvProjects({ cvProjects }: CvProjectsProps) {
  const t = useTranslations('widgets.cvProjects');

  return (
    <div>
      {cvProjects.length === 0 && <p className="text-gray-500">{t('noProjects')}</p>}
      {cvProjects.length > 0 && <CvProjectTable data={cvProjects} columns={columns} />}
    </div>
  );
}
