import { gql, TypedDocumentNode } from '@apollo/client';
import { Profile } from 'cv-graphql';

export type GetProfileArgs = {
  userId: string;
};

export type GetProfileResult = {
  profile: Profile;
};

export const GET_PROFILE: TypedDocumentNode<GetProfileResult, GetProfileArgs> = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      languages {
        name
        proficiency
      }
    }
  }
`;
