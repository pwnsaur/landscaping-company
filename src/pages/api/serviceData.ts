import { TypeServiceFields } from 'types';
import { client } from './client';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.getEntries<TypeServiceFields>({
    content_type: 'service',
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
    content_type: 'service',
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
    props: { service: items[0] },
    revalidate: 60,
  };
};
