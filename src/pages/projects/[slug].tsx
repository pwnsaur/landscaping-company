import Image from 'next/image';
import { TypeProject } from 'types';
import { getStaticPaths, getStaticProps } from '../api/projectData';
import styled from 'styled-components';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

const Project = ({ project }: { project: TypeProject }) => {
  const { content, coverImage, date, excerpt, title, images } = project.fields;

  const contentDocument = content as Document;

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => <strong>{text}</strong>,
      [MARKS.UNDERLINE]: (text: ReactNode) => <u>{text}</u>,
    },
  };

  return (
    <ProjectContainer>
      <CoverImage
        src={`https:${coverImage.fields.file.url}`}
        alt='cover image'
        width={coverImage.fields.file.details.image!.width}
        height={coverImage.fields.file.details.image!.height}
      />
      <Title>{title}</Title>
      <Desription>
        {documentToReactComponents(contentDocument, options)}
      </Desription>
    </ProjectContainer>
  );
};

export { getStaticPaths, getStaticProps };
export default Project;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 3rem 5rem 0;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 1rem 0;
`;

const CoverImage = styled(Image)`
  margin-bottom: 1rem;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Desription = styled.div`
  margin: 1rem 0;
  width: 80%;
`;
