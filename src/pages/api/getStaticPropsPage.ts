import { GetServerSideProps } from 'next';

import { getContentfulClient } from '@pages/api/client';

export function getStaticPropsPage(content_type: string): GetServerSideProps {
  return async () => {
    try {
      const client = getContentfulClient();
      const res = await client.getEntries({ content_type });

      return {
        props: { [`${content_type}s`]: res.items },
      };
    } catch (error) {
      console.error(
        `[getStaticPropsPage] Failed to fetch "${content_type}" entries`,
        error
      );

      return {
        props: { [`${content_type}s`]: [] },
      };
    }
  };
}
