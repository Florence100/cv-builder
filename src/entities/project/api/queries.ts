import { gql } from '@apollo/client';

export const PROJECTS_QUERY = gql`
  query Projects {
    projects {
      id
      name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`;

export const PROJECT_QUERY = gql`
  query Project($projectId: ID!) {
    project(projectId: $projectId) {
      id
      name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`;

export const CV_PROJECTS = gql`
  query Cv($cvId: ID!) {
    cv(cvId: $cvId) {
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
        description
        environment
        responsibilities
        project {
          id
        }
      }
    }
  }
`;
