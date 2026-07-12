import type { Department, Position, User } from 'cv-graphql';
import { gql, TypedDocumentNode } from '@apollo/client';

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
