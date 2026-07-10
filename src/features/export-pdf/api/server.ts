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
          top: '1',
          bottom: '1',
          left: '1',
          right: '1',
        },
      },
    },
  });
  return data;
}
