'use client';

import { GroupedCategory } from '@/src/entities/skill/lib/groupSkillsByRootCategory';
import { exportPdf } from '@/src/features/export-pdf/api/server';
import { useExportPdf } from '@/src/features/export-pdf/lib/useExportPdf';
import { FormattedSkill } from '@/src/pages/cv-preview/lib/formatSkillsForTable';
import { Button } from '@/src/shared/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/table';
import { CvProject, LanguageProficiency } from 'cv-graphql';
import { useRef } from 'react';

interface CvData {
  fullName: string;
  position: string;
  education: string;
  languages: LanguageProficiency[];
  projects: CvProject[];
  cvName: string;
  cvDescription: string;
  cvSkillGroups: GroupedCategory[];
  tableSKillGroups: {
    categoryName: string;
    skills: FormattedSkill[];
  }[];
}

export const CvPreviewWidget = ({ cvData }: { cvData: CvData }) => {
  const cvRef = useRef<HTMLDivElement>(null);

  const { handleExport } = useExportPdf();
  const {
    fullName,
    position,
    education,
    languages,
    projects,
    cvName,
    cvDescription,
    cvSkillGroups,
    tableSKillGroups,
  } = cvData;

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-10 text-foreground">
      <div className="absolute top-10 right-6">
        <Button
          onClick={() => handleExport(cvRef, cvData.fullName)}
          variant="outline"
          className="rounded-full h-10 px-10 py-4 text-primary border-primary hover:bg-red-50 hover:text-primary uppercase"
        >
          Export PDF
        </Button>
      </div>
      <div ref={cvRef} className="flex flex-col gap-8">
        <header className="flex flex-col break-after-avoid">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-normal">{fullName}</h1>
          </div>
          <p className="uppercase">{position}</p>
        </header>

        <section className="grid grid-cols-[240px_1fr] gap-x-6">
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-bold">Education</h3>
              <p>{education}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Language proficiency</h3>
              {languages.map((language) => (
                <div key={language.name} className="grid grid-cols-2">
                  <p>{language.name}</p>
                  <p>{language.proficiency}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Domains</h3>
              {projects.map((project) => (
                <p key={project.id}>{project.domain}</p>
              ))}
            </div>
          </div>

          <div className="border-l border-primary pl-6 space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-bold">{cvName}</h3>
              <p>{cvDescription}</p>
            </div>
            {cvSkillGroups.map((group) => (
              <div key={group.id} className="space-y-2">
                <h3 className="font-bold">{group.name}</h3>
                <p>{group.skills.map((skill) => skill.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-4xl font-normal break-after-avoid">Projects</h2>

          {projects.map((project) => (
            <div key={project.id} className="grid grid-cols-[240px_1fr] gap-x-6 break-inside-avoid">
              <div className="space-y-2 py-4">
                <h4 className="font-bold text-primary uppercase">{project.name}</h4>
                <p>{project.description}</p>
              </div>

              <div className="border-l border-primary pl-6 space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="font-bold">Project roles</h3>
                  <p>{project.roles.join(', ')}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Period</h3>
                  <p>
                    {project.start_date} — {project.end_date}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Responsibilities</h3>
                  <ul className="ml-2 space-y-1.5 ">
                    {project.responsibilities.map((resp) => (
                      <li
                        key={resp}
                        className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-foreground"
                      >
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Environment</h3>
                  <p>{project.environment.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-4xl break-after-avoid">Professional skills</h2>

          <Table>
            <TableHeader className="[&_tr]:border-primary">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="w-65 text-sm font-medium h-10 align-top px-4 py-2.5">
                  SKILLS
                </TableHead>
                <TableHead className="text-sm font-medium h-10 align-bottom px-4 py-2.5"></TableHead>
                <TableHead className="text-sm font-medium text-center h-10 align-bottom px-4 py-2.5 w-37.5">
                  EXPERIENCE
                  <br />
                  IN YEARS
                </TableHead>
                <TableHead className="text-sm font-medium text-center h-10 align-top px-4 py-2.5 w-37.5">
                  LAST USED
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr]:border-border-table">
              {tableSKillGroups.map((group) => (
                <TableRow
                  key={group.categoryName}
                  className="border-b hover:bg-transparent break-inside-avoid"
                >
                  <TableCell className="text-primary font-medium align-top px-4 pt-2.5 pb-7">
                    {group.categoryName}
                  </TableCell>

                  <TableCell className="align-top font-medium px-4 pt-2.5 pb-7">
                    <div className="flex flex-col gap-4">
                      {group.skills.map((skill) => (
                        <span key={skill.id}>{skill.name}</span>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="text-center align-top px-4 pt-2.5 pb-7">
                    <div className="flex flex-col gap-4">
                      {group.skills.map((skill) => (
                        <span key={`exp-${skill.id}`}>{skill.experienceInYears}</span>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="text-center align-top px-4 pt-2.5 pb-7">
                    <div className="flex flex-col gap-4">
                      {group.skills.map((skill) => (
                        <span key={`lastUsed-${skill.id}`}>{skill.lastUsed}</span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  );
};
