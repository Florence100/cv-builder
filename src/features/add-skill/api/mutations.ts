import { gql, TypedDocumentNode } from '@apollo/client';
import type { AddProfileSkillInput, Profile, AddCvSkillInput, Cv } from 'cv-graphql';
import { useMutation } from '@apollo/client/react';

export type AddSkillArgs = {
  skill: AddProfileSkillInput;
};

export type AddSkillResult = {
  profile: Profile;
};

export const useAddProfileSkill = () => {
  return useMutation(ADD_PROFILE_SKILL);
};

export type AddCvSkillArgs = {
  skill: AddCvSkillInput;
};

export type AddCvSkillResult = {
  cv: Cv;
};

export const ADD_PROFILE_SKILL: TypedDocumentNode<AddSkillResult, AddSkillArgs> = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const ADD_CV_SKILL: TypedDocumentNode<AddCvSkillResult, AddCvSkillArgs> = gql`
  mutation addCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
      name
    }
  }
`;

export const useAddCvSkill = () => {
  return useMutation(ADD_CV_SKILL);
};
