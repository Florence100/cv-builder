import { gql, TypedDocumentNode } from '@apollo/client';
import { Cv, CreateCvInput } from 'cv-graphql';

export type CreateCvArgs = { cv: CreateCvInput };
export type CreateCvResult = { createCv: Cv };

export const CREATE_CV: TypedDocumentNode<CreateCvResult, CreateCvArgs> = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;
