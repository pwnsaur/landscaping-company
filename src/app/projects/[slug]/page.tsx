import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styled from 'styled-components';

import { getProjectBySlug } from '@/lib/contentfulData';
import ImageContainer from '@components/ImageContainer';

type Props = {
  params: {
    slug: string;
  };
};

export const metadata: Metadata = {
  title: 'Projekts',
  description: 'Projekts',
};

const ProjectPage = async ({ params }: Props) => {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const { content, coverImage, title, images } = project.fields;
  const contentDocument = content as Document;

  return (
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
      <Description>{documentToReactComponents(contentDocument)}</Description>
      <ImageContainer images={images} />
    </ProjectContainer>
  );
};

export default ProjectPage;

const ProjectContainer = styled.div`
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

const Description = styled.div`
  margin: 1rem 0;
  width: 80%;
`;
