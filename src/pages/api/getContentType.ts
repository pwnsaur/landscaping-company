import { client } from './client';
import { TypeProjectFields, TypeServiceFields } from 'types';

type ContentType = 'project' | 'service';

interface GetStaticProps {
  params: TypeProjectFields | TypeServiceFields;
  content_type: string;
}

const getContentTypeData = (contentType: ContentType) => {
  const contentTypeId = contentType === 'project' ? 'project' : 'service';

  const getStaticPaths = async () => {
    const res = await client.getEntries<TypeProjectFields | TypeServiceFields>(
      contentType === 'project'
        ? {
            content_type: 'project',
          }
        : {
            content_type: 'service',
          }
    );

    const paths = res.items.map((item) => {
      return {
        params: { slug: item.fields.slug },
      };
    });

    return { paths, fallback: false };
  };

  const getStaticProps = async ({
    params,
  }: {
    params: TypeProjectFields | TypeServiceFields;
  }) => {
    const { items } = await client.getEntries({
      content_type: contentTypeId,
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
      props: { [contentType]: items[0] },
      revalidate: 60,
    };
  };

  return { getStaticPaths, getStaticProps };
};

export default getContentTypeData;
