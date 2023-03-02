import { TypePost, TypePostFields } from 'types';
import React from 'react';
import Image from 'next/image';
import { getStaticPaths, getStaticProps } from '../api/projectData';

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

export { getStaticPaths, getStaticProps };
export default Project;
