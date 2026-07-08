import { gql, TypedDocumentNode } from '@apollo/client';
import type { UpdateProfileSkillInput, Profile } from 'cv-graphql';
import { useMutation } from '@apollo/client/react';

export type UpdateSkillArgs = {
  skill: UpdateProfileSkillInput;
};

export type UpdateSkillResult = {
  progile: Profile;
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

export const useUpdateProfileSkill = () => {
  return useMutation(UPDATE_PROFILE_SKILL);
};
