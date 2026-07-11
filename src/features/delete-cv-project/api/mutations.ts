import { gql, TypedDocumentNode } from '@apollo/client';
import { RemoveCvProjectInput, Cv } from 'cv-graphql';

export type RemoveProjectCvArgs = { project: RemoveCvProjectInput };
export type RemoveProjectCvResult = { cv: Cv };

export const REMOVE_CV_PROJECT: TypedDocumentNode<RemoveProjectCvResult, RemoveProjectCvArgs> = gql`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
    }
  }
`;
