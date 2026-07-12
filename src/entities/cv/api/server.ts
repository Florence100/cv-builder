import { query } from '@/src/shared/api/apollo-client';
import { GET_CV, GET_CVS } from './graphql';

export async function fetchCv(cvId: string) {
  const { data } = await query({
    query: GET_CV,
    variables: { cvId: cvId },
  });
  return data?.cv;
}

export async function fetchCvs() {
  const { data } = await query({ query: GET_CVS });
  return data?.cvs || [];
}
