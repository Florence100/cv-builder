import { AddCvProjectInput, Cv } from 'cv-graphql';
import { gql, TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

export type AddCvProjectProps = {
  project: AddCvProjectInput;
};

export type AddCvProjectResult = {
  cv: Cv;
};

export const ADD_CV_PROJECT: TypedDocumentNode<AddCvProjectResult, AddCvProjectProps> = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      projects {
        id
      }
    }
  }
`;

export const useAddCvProject = () => {
  return useMutation(ADD_CV_PROJECT);
};
