import { client } from './client';
import { GetStaticProps } from 'next';

export function getStaticPropsPage(content_type: string): GetStaticProps {
  return async () => {
    const res = await client.getEntries({ content_type });

    return {
      props: { [`${content_type}s`]: res.items },
      revalidate: 60,
    };
  };
}
