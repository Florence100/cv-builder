import { gql, TypedDocumentNode } from '@apollo/client';
import type { DeleteProfileSkillInput, Profile, DeleteCvSkillInput, Cv } from 'cv-graphql';
import { useMutation } from '@apollo/client/react';

export type DeleteSkillArgs = {
  skill: DeleteProfileSkillInput;
};

export type DeleteSkillResult = {
  profile: Profile;
};

export type DeleteCvSkillArgs = {
  skill: DeleteCvSkillInput;
};

export type DeleteCvSkillResult = {
  cv: Cv;
};

export const DELETE_PROFILE_SKILL: TypedDocumentNode<DeleteSkillResult, DeleteSkillArgs> = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const DELEYE_CV_SKILL: TypedDocumentNode<DeleteCvSkillResult, DeleteCvSkillArgs> = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
      name
    }
  }
`;

export const useDeleteProfileSkill = () => {
  return useMutation(DELETE_PROFILE_SKILL);
};

export const useDeleteCvSkill = () => {
  return useMutation(DELEYE_CV_SKILL);
};
