import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { User } from 'cv-graphql';

const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      department_name
      position_name
      profile {
        avatar
        first_name
        last_name
        full_name
      }
    }
  }
`;

type UserResult = {
  users: User[];
};

export const useUsers = () => {
  return useLazyQuery<UserResult>(USERS_QUERY);
};
