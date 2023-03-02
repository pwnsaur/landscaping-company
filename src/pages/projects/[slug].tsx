import { createClient } from 'contentful';
import { TypePost, TypePostFields } from 'types';
import React from 'react';
import Image from 'next/image';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: 'master',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

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

interface PostDetailsParams {
  params: {
    slug: string;
  };
}

export const getStaticProps = async ({ params }: PostDetailsParams) => {
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

const Project = ({ post }: { post: TypePost }) => {
  const { content, coverImage, date, excerpt, slug, title } = post.fields;

  return (
    <>
      <div>{post.fields.title}</div>
      <Image
        src={`https:${coverImage.fields.file.url}`}
        alt='food'
        width={coverImage.fields.file.details.image!.width}
        height={coverImage.fields.file.details.image!.height}
        className='recipe-image'
      />
    </>
  );
};

export default Project;
