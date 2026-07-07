import { gql, TypedDocumentNode } from '@apollo/client';
import type { AddProfileSkillInput, Profile } from 'cv-graphql';
import { useMutation } from '@apollo/client/react';

export type AddSkillArgs = {
  skill: AddProfileSkillInput;
};

export type AddSkillResult = {
  addProfileSkill: Profile;
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

export const useAddProfileSkill = () => {
  return useMutation(ADD_PROFILE_SKILL);
};
