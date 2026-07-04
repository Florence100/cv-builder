import { gql, TypedDocumentNode } from '@apollo/client';
import { AddProfileLanguageInput, Language, Profile, UpdateProfileLanguageInput } from 'cv-graphql';

export type GetLanguagesResult = {
  languages: Language[];
};

export const GET_LANGUAGES: TypedDocumentNode<GetLanguagesResult, Record<string, never>> = gql`
  query GetLanguages {
    languages {
      id
      name
    }
  }
`;

export type AddProfileLanguageArgs = { language: AddProfileLanguageInput };
export type AddProfileLanguageResult = { addProfileLanguage: Profile };

export const ADD_PROFILE_LANGUAGE: TypedDocumentNode<
  AddProfileLanguageResult,
  AddProfileLanguageArgs
> = gql`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export type UpdateProfileLanguageArgs = { language: UpdateProfileLanguageInput };
export type UpdateProfileLanguageResult = { updateProfileLanguage: Profile };

export const UPDATE_PROFILE_LANGUAGE: TypedDocumentNode<
  UpdateProfileLanguageResult,
  UpdateProfileLanguageArgs
> = gql`
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;
