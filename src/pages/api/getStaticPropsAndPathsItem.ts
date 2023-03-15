import { TypeProjectFields, TypeServiceFields } from '@/types/contentfulTypes';
import { client } from './client';

export async function getStaticPathsItem(content_type: string) {
  const res = await client.getEntries<TypeProjectFields | TypeServiceFields>({
    content_type,
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return { paths, fallback: false };
}

interface GetStaticProps {
  params: TypeProjectFields | TypeServiceFields;
  content_type: string;
}

export async function getStaticPropsItem({
  content_type,
  params,
}: GetStaticProps) {
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
    props: { content_type: items[0] },
    revalidate: 60,
  };
}
