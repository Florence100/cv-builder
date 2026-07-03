import { getClient } from '@/src/shared/api/apollo-client';
import { CATEGORIES_QUERY, SkillCategoriesResult } from './queries';

export async function getCategories() {
  const client = getClient();

  const { data } = await client.query<SkillCategoriesResult>({
    query: CATEGORIES_QUERY,
  });

  return data?.skillCategories;
}
