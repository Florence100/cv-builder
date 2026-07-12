import { gql, TypedDocumentNode } from '@apollo/client';
import { Cv, UpdateCvInput } from 'cv-graphql';

export type UpdateCvArgs = { cv: UpdateCvInput };
export type UpdateCvResult = { updateCv: Cv };

export const UPDATE_CV: TypedDocumentNode<UpdateCvResult, UpdateCvArgs> = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;
