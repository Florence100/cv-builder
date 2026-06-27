import { CombinedGraphQLErrors } from '@apollo/client';
import { CombinedProtocolErrors } from '@apollo/client';
import { ApolloLink } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import Cookies from 'js-cookie';

const authLink = new SetContextLink(({ headers }) => {
  const accessToken = Cookies.get('accessToken');

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
      if (message === 'Unauthorized') {
        Cookies.remove('accessToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }
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

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
