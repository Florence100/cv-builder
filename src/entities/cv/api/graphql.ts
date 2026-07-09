import { gql, TypedDocumentNode } from '@apollo/client';
import { Cv } from 'cv-graphql';

export type GetCvArgs = {
  cvId: string;
};

export type GetCvResult = {
  cv: Cv;
};

export const GET_CV: TypedDocumentNode<GetCvResult, GetCvArgs> = gql`
  query Cv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      languages {
        name
        proficiency
      }
      projects {
        id
        description
        domain
        name
        start_date
        end_date
        roles
        environment
        responsibilities
      }
      skills {
        name
        categoryId
      }
      user {
        id
        position_name
        profile {
          first_name
          last_name
          full_name
        }
      }
    }
  }
`;

export type GetCvsResult = {
  cvs: Cv[];
};

export const GET_CVS: TypedDocumentNode<GetCvsResult, Record<string, never>> = gql`
  query GetCvs {
    cvs {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`;
