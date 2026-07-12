import { getClient } from '@/src/shared/api/apollo-client';
import {
  PROFILE_SKILLS_QUERY,
  SKILLS_QUERY,
  CV_SKILLS_QUERY,
  ProfileSkillsResult,
  SkillsResult,
  CvSkillsResult,
} from './queries';

export async function getProfileSkills(userId: string) {
  const client = getClient();

  const { data } = await client.query<ProfileSkillsResult>({
    query: PROFILE_SKILLS_QUERY,
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

export async function getCvSkills(cvId: string) {
  const client = getClient();

  const { data } = await client.query<CvSkillsResult>({
    query: CV_SKILLS_QUERY,
    variables: {
      cvId: cvId,
    },
  });

  return data?.cv;
}
