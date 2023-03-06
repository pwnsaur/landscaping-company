import { client } from './client';

export function getStaticPropsPage(content_type: string) {
  return async () => {
    const res = await client.getEntries({ content_type });

    return {
      props: { [`${content_type}s`]: res.items },
      revalidate: 60,
    };
  };
}
