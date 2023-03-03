import React from 'react';
import Image from 'next/image';
import { TypeProject } from 'types';
import { getStaticPaths, getStaticProps } from '../api/projectData';

const Project = ({ project }: { project: TypeProject }) => {
  const { content, coverImage, date, excerpt, slug, title } = project.fields;

  return (
    <div className='project'>
      <h2>{project.fields.title}</h2>
      <Image
        src={`https:${coverImage.fields.file.url}`}
        alt='cover image'
        width={coverImage.fields.file.details.image!.width / 3}
        height={coverImage.fields.file.details.image!.height / 3}
      />
      <style jsx>{`
        .project {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export { getStaticPaths, getStaticProps };
export default Project;
