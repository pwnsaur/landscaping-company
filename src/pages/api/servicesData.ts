import { client } from './client';

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: 'service' });

  return {
    props: { services: res.items },
    revalidate: 60,
  };
}
