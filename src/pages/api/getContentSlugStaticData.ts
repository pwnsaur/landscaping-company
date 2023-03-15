import { TypeProjectFields } from '@/types/contentfulTypes';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { client } from './client';

type ContentType = 'project' | 'service';

export function getStaticData(content_type: ContentType) {
  const getStaticPaths: GetStaticPaths = async () => {
    const res = await client.getEntries<TypeProjectFields>({
      content_type,
    });

    const paths = res.items.map((item) => {
      return {
        params: { slug: item.fields.slug },
      };
    });

    return { paths, fallback: false };
  };

  const getStaticProps: GetStaticProps = async ({
    params = {},
  }: {
    params?: ParsedUrlQuery;
  }) => {
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
      revalidate: 60,
    };
  };

  return { getStaticPaths, getStaticProps };
}
