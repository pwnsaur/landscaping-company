import { TypeProjectFields } from 'types';
import { client } from './client';

export const getStaticPaths = async () => {
  const res = await client.getEntries<TypeProjectFields>({
    content_type: 'service',
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return { paths, fallback: true };
};

export const getStaticProps = async ({
  params,
}: {
  params: TypeProjectFields;
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
