import type { SkillMastery, Skill } from 'cv-graphql';
import { gql } from '@apollo/client';

export const USER_SKILLS_QUERY = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export type UserSkillsArgs = {
  userId: string;
};

export type UserSkillsResult = {
  profile: {
    skills: SkillMastery[];
  };
};

export const SKILLS_QUERY = gql`
  query Skills {
    skills {
      id
      name
      category {
        id
      }
    }
  }
`;

export type SkillsResult = {
  skills: Skill[];
};
