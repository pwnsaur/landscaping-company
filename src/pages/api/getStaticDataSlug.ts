import { ParsedUrlQuery } from 'querystring';

import { GetServerSideProps } from 'next';

import { getContentfulClient } from '@pages/api/client';

type ContentType = 'project' | 'service';

export function getServerData(content_type: ContentType) {
  const getServerSideProps: GetServerSideProps = async ({
    params = {},
  }: {
    params?: ParsedUrlQuery;
  }) => {
    try {
      const client = getContentfulClient();
      const { items } = await client.getEntries({
        content_type,
        'fields.slug': params.slug,
      });

      if (!items.length) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      return {
        props: { [content_type]: items[0] },
      };
    } catch (error) {
      console.error(
        `[getServerData] Failed to fetch "${content_type}" by slug`,
        error
      );
      return { notFound: true };
    }
  };

  return { getServerSideProps };
}
