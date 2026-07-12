import { getCvProjects, getProjects } from '@/src/entities/project/api/server';
import { CvProjects } from '@/src/widgets/cv-projects';
import { getSkills } from '@/src/entities/skill/api/server';

type CvProjectPageProps = {
  cvId: string;
};

export const CvProjectsPage = async ({ cvId }: CvProjectPageProps) => {
  const cvProjects = (await getCvProjects(cvId)) || [];
  const projectsList = (await getProjects()) || [];
  const skills = (await getSkills()) || [];

  return (
    <div className="p-6">
      <CvProjects cvProjects={cvProjects} projectList={projectsList} skills={skills} cvId={cvId} />
    </div>
  );
};
