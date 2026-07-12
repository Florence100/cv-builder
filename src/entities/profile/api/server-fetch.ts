import { query } from '@/src/shared/api/apollo-client';
import { GET_PROFILE } from './graphql';

export async function fetchProfile(userId: string) {
  const { data } = await query({
    query: GET_PROFILE,
    variables: { userId: userId },
  });
  return data?.profile;
}
