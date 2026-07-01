import { gql } from '@apollo/client';
import type { User } from 'cv-graphql';
import { getClient } from '@/src/shared/api/apollo-client';

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

export async function getUsers() {
  const client = getClient();

  const { data } = await client.query<UserResult>({
    query: USERS_QUERY,
  });

  return data?.users || [];
}
