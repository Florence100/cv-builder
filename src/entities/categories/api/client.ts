import { useLazyQuery } from '@apollo/client/react';
import { CATEGORIES_QUERY, SkillCategoriesResult } from './queries';

export const useCategories = () => {
  return useLazyQuery<SkillCategoriesResult>(CATEGORIES_QUERY);
};
