import { gql, TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { ForgotPasswordInput } from 'cv-graphql';

type ForgotPasswordData = {
  forgotPassword: null;
};

type ForgotPasswordArgs = {
  auth: ForgotPasswordInput;
};

export const FORGOT_PASSWORD: TypedDocumentNode<ForgotPasswordData, ForgotPasswordArgs> = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth)
  }
`;

export const useForgotPasswordHook = () => {
  return useMutation(FORGOT_PASSWORD);
};
