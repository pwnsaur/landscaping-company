import { TypePostFields } from 'types';
import { client } from './client';

export const getStaticPaths = async () => {
  const res = await client.getEntries<TypePostFields>({
    content_type: 'post',
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
  params: TypePostFields;
}) => {
  const { items } = await client.getEntries({
    content_type: 'post',
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
    props: { post: items[0] },
    revalidate: 60,
  };
};
