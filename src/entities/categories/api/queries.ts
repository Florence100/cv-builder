import type { SkillCategory } from 'cv-graphql';
import { gql } from '@apollo/client';

export const CATEGORIES_QUERY = gql`
  query SkillCategories {
    skillCategories {
      id
      name
      order
      parent {
        id
        name
      }
    }
  }
`;

export type SkillCategoriesResult = {
  skillCategories: SkillCategory[];
};
