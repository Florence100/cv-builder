import { query } from '@/src/shared/api/apollo-client';
import { GET_USER, GET_DEPARTMENTS, GET_POSITIONS } from './queries';

export async function fetchUser(userId: string) {
  const { data } = await query({
    query: GET_USER,
    variables: { userId: userId },
  });
  return data?.user;
}

export async function fetchDepartments() {
  const { data } = await query({ query: GET_DEPARTMENTS });
  return data?.departments || [];
}

export async function fetchPositions() {
  const { data } = await query({ query: GET_POSITIONS });
  return data?.positions || [];
}
