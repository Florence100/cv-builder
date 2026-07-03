import { query } from '@/src/shared/api/apollo-client';
import { GET_LANGUAGES } from './graphql';

export async function fetchLanguages() {
  const { data } = await query({ query: GET_LANGUAGES });
  return data?.languages || [];
}
