import { getClient } from '@/src/shared/api/apollo-client';
import { CREATE_CV } from '../../create-cv/api/graphql';

export const createCV = async (userId: string) => {
  try {
    const client = getClient();

    const { data } = await client.mutate({
      mutation: CREATE_CV,
      variables: {
        cv: {
          name: 'My cv name',
          education: 'My education',
          description: 'My cv description',
          userId: userId,
        },
      },
    });

    console.log('CV was created successfully');
    return data;
  } catch (error) {
    console.error('Failed to create cv:', error);
    throw error;
  }
};
