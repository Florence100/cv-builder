import { gql, TypedDocumentNode } from '@apollo/client';
import type { UpdateProfileSkillInput, Profile, UpdateCvSkillInput, Cv } from 'cv-graphql';
import { useMutation } from '@apollo/client/react';

export type UpdateSkillArgs = {
  skill: UpdateProfileSkillInput;
};

export type UpdateSkillResult = {
  progile: Profile;
};

export type UpdateCvSkillArgs = {
  skill: UpdateCvSkillInput;
};

export type UpdateCvSkillResult = {
  cv: Cv;
};

export const UPDATE_PROFILE_SKILL: TypedDocumentNode<UpdateSkillResult, UpdateSkillArgs> = gql`
  mutation updateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const UPDATE_CV_SKILL: TypedDocumentNode<UpdateCvSkillResult, UpdateCvSkillArgs> = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      name
    }
  }
`;

export const useUpdateProfileSkill = () => {
  return useMutation(UPDATE_PROFILE_SKILL);
};

export const useUpdateCvSkill = () => {
  return useMutation(UPDATE_CV_SKILL);
};
