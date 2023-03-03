import { client } from './client';

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: 'project' });

  return {
    props: { projects: res.items },
    revalidate: 60,
  };
}
