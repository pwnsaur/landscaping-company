import React from 'react';
import Image from 'next/image';
import { TypePost } from 'types';
import { getStaticPaths, getStaticProps } from '../api/projectData';

const Project = ({ project }: { project: TypePost }) => {
  const { content, coverImage, date, excerpt, slug, title } = project.fields;

  return (
    <>
      <div>{project.fields.title}</div>
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
