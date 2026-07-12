'use server';

import { EXPORT_PDF } from '@/src/entities/cv/api/graphql';
import { getClient } from '@/src/shared/api/apollo-client';

export async function exportPdf(htmlString: string) {
  const { data } = await getClient().mutate({
    mutation: EXPORT_PDF,
    variables: {
      pdf: {
        html: htmlString,
        margin: {
          top: '1in',
          bottom: '1in',
          left: '1in',
          right: '1in',
        },
      },
    },
  });
  return data;
}
