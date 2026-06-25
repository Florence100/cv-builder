'use client';

import { HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';

function makeClient() {
  const httpLink = new HttpLink({
    // uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    uri: 'https://cv-project-js.inno.ws/api/graphql',
    fetchOptions: {
      // Optional: Next.js-specific fetch options
      // Note: This doesn't work with `export const dynamic = "force-static"`
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
