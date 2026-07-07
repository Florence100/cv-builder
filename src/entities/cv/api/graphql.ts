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
      user {
        id
      }
    }
  }
`;
