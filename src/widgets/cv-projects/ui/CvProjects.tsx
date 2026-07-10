import type { CvProject, Project, Skill } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { CvProjectTable } from '@/src/entities/project';
import { columns } from '@/src/entities/project/ui/Columns';
import { CreateCvProjectModal } from '@/src/features/create-cv-project';

interface CvProjectsProps {
  cvProjects: CvProject[];
  projectList: Project[];
  skills: Skill[];
  cvId: string;
}

export function CvProjects({ cvProjects, projectList, skills, cvId }: CvProjectsProps) {
  const t = useTranslations('widgets.cvProjects');

  return (
    <div className="relative">
      <div className="absolute top-4 right-0">
        <CreateCvProjectModal projectList={projectList} skills={skills} cvId={cvId} />
      </div>
      {cvProjects.length === 0 && <p className="text-gray-500">{t('noProjects')}</p>}
      {cvProjects.length > 0 && <CvProjectTable data={cvProjects} columns={columns} />}
    </div>
  );
}
