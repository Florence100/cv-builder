import { getClient } from '@/src/shared/api/apollo-client';
import type { CvProject, Project } from 'cv-graphql';
import { PROJECTS_QUERY, PROJECT_QUERY, CV_PROJECTS } from './queries';

type ProjectsResult = {
  projects: Project[];
};

type ProjectResult = {
  project: Project;
};

type CvProjectResult = {
  cv: {
    projects: CvProject[];
  };
};

export async function getProjects() {
  const client = getClient();

  const { data } = await client.query<ProjectsResult>({
    query: PROJECTS_QUERY,
  });

  return data?.projects;
}

export async function getProject(projectId: string) {
  const client = getClient();

  const { data } = await client.query<ProjectResult>({
    query: PROJECT_QUERY,
    variables: {
      projectId: projectId,
    },
  });

  return data?.project;
}

export async function getCvProjects(cvId: string) {
  const client = getClient();

  const { data } = await client.query<CvProjectResult>({
    query: CV_PROJECTS,
    variables: {
      cvId: cvId,
    },
  });

  return data?.cv.projects;
}
