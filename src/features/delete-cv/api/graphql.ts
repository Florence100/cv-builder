import { gql, TypedDocumentNode } from '@apollo/client';
import { DeleteCvInput, DeleteResult } from 'cv-graphql';

export type DeleteCvArgs = { cv: DeleteCvInput };
export type DeleteCvResult = { deleteProfileLanguage: DeleteResult };

export const DELETE_CV: TypedDocumentNode<DeleteCvResult, DeleteCvArgs> = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;
