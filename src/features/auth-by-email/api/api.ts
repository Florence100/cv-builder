import type { AuthInput, AuthResult } from 'cv-graphql';
import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';

const LOGIN_QUERY = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;

type LoginArgs = {
  auth: AuthInput;
};

type LoginResult = {
  login: AuthResult;
};

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN_QUERY);
};
