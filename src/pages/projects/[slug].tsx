import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

import { TypeProject } from '@/types/contentfulTypes';
import ImageContainer from '@components/ImageContainer';
import { getStaticData } from '@pages/api/getStaticDataSlug';

const { getStaticPaths, getStaticProps } = getStaticData('project');

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
          width={coverImage.fields.file.details.image!.width / 1.5}
          height={coverImage.fields.file.details.image!.height / 1.5}
          quality={50}
          priority
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

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 3rem 5rem;

  ${({ theme }) =>
    theme.isMobile &&
    `
      width: 100%;
      padding: 0 1rem;
      margin: 6rem 0;
  `}
`;

const Title = styled.h3`
  font-size: ${({ theme }) => `
    clamp(${theme.normalClamp.min},
      ${theme.normalClamp.preferred},
      ${theme.normalClamp.max})
  `};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
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
