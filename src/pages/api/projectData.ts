import { client } from './client';
import { TypeProjectFields } from '@/types/contentfulTypes';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.getEntries<TypeProjectFields>({
    content_type: 'project',
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params = {},
}: {
  params?: ParsedUrlQuery;
}) => {
  const { items } = await client.getEntries({
    content_type: 'project',
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
    props: { project: items[0] },
    revalidate: 60,
  };
};
