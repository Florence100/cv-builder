import { gql, TypedDocumentNode } from '@apollo/client';
import type { DeleteProfileSkillInput, Profile } from 'cv-graphql';
import { useMutation } from '@apollo/client/react';

export type DeleteSkillArgs = {
  skill: DeleteProfileSkillInput;
};

export type DeleteSkillResult = {
  profile: Profile;
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

export const useDeleteProfileSkill = () => {
  return useMutation(DELETE_PROFILE_SKILL);
};
