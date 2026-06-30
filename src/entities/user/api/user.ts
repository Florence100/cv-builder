import type { User } from 'cv-graphql';
import { gql, TypedDocumentNode } from '@apollo/client';
import { query } from '@/src/shared/api/apollo-client';

export type GetUserArgs = {
  userId: string;
};

export type GetUserResult = {
  user: User;
};

export const GET_USER: TypedDocumentNode<GetUserResult, GetUserArgs> = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      email
      profile {
        id
        first_name
        last_name
        full_name
      }
    }
  }
`;

export async function fetchUser(userId: string) {
  const { data } = await query({
    query: GET_USER,
    variables: { userId: userId },
  });
  return data?.user;
}
