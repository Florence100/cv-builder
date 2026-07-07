import { getClient } from '@/src/shared/api/apollo-client';
import { USER_SKILLS_QUERY, SKILLS_QUERY, UserSkillsResult, SkillsResult } from './queries';

export async function getUserSkills(userId: string) {
  const client = getClient();

  const { data } = await client.query<UserSkillsResult>({
    query: USER_SKILLS_QUERY,
    variables: {
      userId: userId,
    },
  });

  return data?.profile.skills;
}

export async function getSkills() {
  const client = getClient();

  const { data } = await client.query<SkillsResult>({
    query: SKILLS_QUERY,
  });

  return data?.skills;
}
