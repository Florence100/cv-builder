import { CombinedGraphQLErrors } from '@apollo/client';
import { CombinedProtocolErrors } from '@apollo/client';
import { ApolloLink } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

const authLink = new SetContextLink(async ({ headers }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      console.error(message);
      // if (message === 'Unauthorized') {
      //   redirect('/auth/login');
      // }
    });
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`
      )
    );
  } else {
    console.error(`[Network error]: ${error}`);
  }
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, errorLink, httpLink]),
  });
});
