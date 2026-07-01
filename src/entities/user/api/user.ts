import type { Department, Position, User } from 'cv-graphql';
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
      created_at
      email
      department {
        id
        name
      }
      position {
        id
        name
      }
      profile {
        id
        first_name
        last_name
        full_name
        avatar
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

export type GetDepartmentsResult = {
  departments: Department[];
};

export const GET_DEPARTMENTS: TypedDocumentNode<GetDepartmentsResult, Record<string, never>> = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`;

export async function fetchDepartments() {
  const { data } = await query({
    query: GET_DEPARTMENTS,
  });
  return data?.departments || [];
}

export type GetPositionsResult = {
  positions: Position[];
};

export const GET_POSITIONS: TypedDocumentNode<GetPositionsResult, Record<string, never>> = gql`
  query GetPositions {
    positions {
      id
      name
    }
  }
`;

export async function fetchPositions() {
  const { data } = await query({
    query: GET_POSITIONS,
  });
  return data?.positions || [];
}
