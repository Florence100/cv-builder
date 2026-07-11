'use client';

import type { CvProject, Project, Skill } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { CvProjectTable } from '@/src/entities/project';
import { getColumns } from '@/src/entities/project/ui/Columns';
import { CreateCvProjectModal } from '@/src/features/create-cv-project';
import { UpdateCvProjectModal } from '@/src/features/update-cv-project';
import { useMemo, useState } from 'react';

interface CvProjectsProps {
  cvProjects: CvProject[];
  projectList: Project[];
  skills: Skill[];
  cvId: string;
}

export function CvProjects({ cvProjects, projectList, skills, cvId }: CvProjectsProps) {
  const t = useTranslations('widgets.cvProjects');
  const [editingProject, setEditingProject] = useState<CvProject | null>(null);

  const cvProjectNames = cvProjects.map((item) => item.name);
  const notAddedProjects = projectList.filter((p) => !cvProjectNames.includes(p.name));

  const columns = useMemo(
    () =>
      getColumns({
        onEdit: setEditingProject,
      }),
    []
  );

  return (
    <div className="relative">
      <div className="absolute top-4 right-0">
        <CreateCvProjectModal projectList={notAddedProjects} skills={skills} cvId={cvId} />
        <UpdateCvProjectModal
          open={editingProject !== null}
          project={editingProject}
          projectList={projectList}
          skills={skills}
          cvId={cvId}
          onOpenChange={(open) => {
            if (!open) {
              setEditingProject(null);
            }
          }}
        />
      </div>
      {cvProjects.length === 0 && <p className="text-gray-500">{t('noProjects')}</p>}
      {cvProjects.length > 0 && <CvProjectTable data={cvProjects} columns={columns} />}
    </div>
  );
}
