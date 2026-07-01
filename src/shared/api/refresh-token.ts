export async function refreshTokens(refreshToken: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    },
    body: JSON.stringify({
      query: `
        mutation RefreshSession {
          updateToken {
            access_token
            refresh_token
          }
        }
      `,
    }),
  });

  const { data, errors } = await response.json();

  if (errors || !data?.updateToken) {
    throw new Error('Refresh failed');
  }

  return data.updateToken;
}
