import type { SkillMastery, SkillCategory } from 'cv-graphql';
import { gql } from '@apollo/client';

export const SKILLS_QUERY = gql`
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

export type SkillsArgs = {
  userId: string;
};

export type SkillsResult = {
  profile: {
    skills: SkillMastery[];
  };
};
