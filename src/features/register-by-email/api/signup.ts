import { gql, TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { AuthInput, AuthResult } from 'cv-graphql';

type SignupArgs = {
  auth: AuthInput;
};

type SignupResult = {
  signup: AuthResult;
};

export const SIGNUP: TypedDocumentNode<SignupResult, SignupArgs> = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`;

export const useSignup = () => {
  return useMutation(SIGNUP);
};
