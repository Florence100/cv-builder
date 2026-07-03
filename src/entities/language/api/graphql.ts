import { gql, TypedDocumentNode } from '@apollo/client';
import { AddProfileLanguageInput, Language, Profile } from 'cv-graphql';

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
