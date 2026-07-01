import { gql, TypedDocumentNode } from '@apollo/client';
import type { User, Profile, UpdateUserInput, UpdateProfileInput } from 'cv-graphql';

export type UpdateProfileArgs = { profile: UpdateProfileInput };
export type UpdateProfileResult = { updateProfile: Profile };

export const UPDATE_PROFILE: TypedDocumentNode<UpdateProfileResult, UpdateProfileArgs> = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`;

export type UpdateUserArgs = { user: UpdateUserInput };
export type UpdateUserResult = { updateUser: User };
export const UPDATE_USER: TypedDocumentNode<UpdateUserResult, UpdateUserArgs> = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;
