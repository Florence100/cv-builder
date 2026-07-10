import { UpdateCvProjectInput, Cv } from 'cv-graphql';
import { gql, TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

export type UpdateCvProjectProps = {
  project: UpdateCvProjectInput;
};

export type UpdateCvProjectResult = {
  cv: Cv;
};

export const UPDATE_CV_PROJECT: TypedDocumentNode<UpdateCvProjectResult, UpdateCvProjectProps> =
  gql`
    mutation UpdateCvProject($project: UpdateCvProjectInput!) {
      updateCvProject(project: $project) {
        projects {
          id
        }
      }
    }
  `;

export const useUpdateCvProject = () => {
  return useMutation(UPDATE_CV_PROJECT);
};
