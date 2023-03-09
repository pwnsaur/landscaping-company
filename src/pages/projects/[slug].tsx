import { TypeProject } from 'types';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { getStaticPaths, getStaticProps } from '../api/projectData';
import ImageContainer from '@/components/ImageContainer';

const Project = ({ project }: { project: TypeProject }) => {
  const { content, coverImage, date, excerpt, title, images } = project.fields;

  const contentDocument = content as Document;

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`Brasika | ${title}`}
        description={excerpt}
      />
      <ProjectContainer>
        <CoverImage
          src={`https:${coverImage.fields.file.url}`}
          alt='cover image'
          width={coverImage.fields.file.details.image!.width}
          height={coverImage.fields.file.details.image!.height}
        />
        <Title>{title}</Title>
        <Desription>{documentToReactComponents(contentDocument)}</Desription>
        <ImageContainer images={images} />
      </ProjectContainer>
    </>
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
