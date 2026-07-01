import { gql, TypedDocumentNode } from '@apollo/client';
import type { Department, Position } from 'cv-graphql';

export type GetDepartmentsResult = { departments: Department[] };

export const GET_DEPARTMENTS: TypedDocumentNode<GetDepartmentsResult, never> = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`;

export type GetPositionsResult = { positions: Position[] };
export const GET_POSITIONS: TypedDocumentNode<GetPositionsResult, never> = gql`
  query GetPositions {
    positions {
      id
      name
    }
  }
`;
