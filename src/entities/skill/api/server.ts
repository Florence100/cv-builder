import { getClient } from '@/src/shared/api/apollo-client';
import { SKILLS_QUERY, SkillsResult } from './queries';

export async function getSkills(userId: string) {
  const client = getClient();

  const { data } = await client.query<SkillsResult>({
    query: SKILLS_QUERY,
    variables: {
      userId: userId,
    },
  });

  return data?.profile.skills;
}
