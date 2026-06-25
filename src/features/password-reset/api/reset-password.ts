import { gql, TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { ResetPasswordInput } from 'cv-graphql';

type ResetPasswordData = {
  resetPassword: null;
};

type ResetPasswordArgs = {
  auth: ResetPasswordInput;
};

export const RESET_PASSWORD: TypedDocumentNode<ResetPasswordData, ResetPasswordArgs> = gql`
  mutation ResetPassword($auth: ResetPasswordInput!) {
    resetPassword(auth: $auth)
  }
`;

export const useResetPasswordHook = () => {
  return useMutation(RESET_PASSWORD);
};
