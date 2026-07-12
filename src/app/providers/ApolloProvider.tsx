'use client';

import { CombinedProtocolErrors } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client';
import { ApolloLink } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { refreshTokens } from '@/src/shared/api/refresh-token';

type RefreshResponse = {
  access_token: string;
  refresh_token: string;
};

let refreshPromise: Promise<RefreshResponse> | null = null;

const authLink = new SetContextLink(async ({ headers }) => {
  let accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  if (refreshToken) {
    let needRefresh = false;

    if (!accessToken) {
      needRefresh = true;
    } else {
      try {
        const decoded = jwtDecode<{ exp: number }>(accessToken);

        if (decoded.exp - Math.floor(Date.now() / 1000) < 30) {
          needRefresh = true;
        }
      } catch {
        needRefresh = true;
      }
    }

    if (needRefresh) {
      try {
        if (!refreshPromise) {
          refreshPromise = refreshTokens(refreshToken).finally(() => {
            refreshPromise = null;
          });
        }

        const tokens = await refreshPromise;

        Cookies.set('accessToken', tokens.access_token);
        Cookies.set('refreshToken', tokens.refresh_token);

        console.log('Tokens were updated on the client!');

        accessToken = tokens.access_token;
      } catch {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }

        throw new Error('Unable to refresh token');
      }
    }
  }

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
        Cookies.remove('refreshToken');
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

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, errorLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
