import { client } from './client';

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: 'post' });

  return {
    props: { projects: res.items },
    revalidate: 60,
  };
}
