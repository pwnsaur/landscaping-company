import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styled from 'styled-components';

import { getServiceBySlug } from '@/lib/contentfulData';

type Props = {
  params: {
    slug: string;
  };
};

export const metadata: Metadata = {
  title: 'Pakalpojums',
  description: 'Pakalpojums',
};

const ServicePage = async ({ params }: Props) => {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const { coverImage, description, title } = service.fields;
  const descriptionDocument = description as Document;

  return (
    <ServiceContainer>
      <CoverImage
        src={`https:${coverImage.fields.file.url}`}
        alt='cover image'
        width={coverImage.fields.file.details.image!.width}
        height={coverImage.fields.file.details.image!.height}
        priority
        quality={75}
      />
      <Title>{title}</Title>
      <Description>{documentToReactComponents(descriptionDocument)}</Description>
    </ServiceContainer>
  );
};

export default ServicePage;

const ServiceContainer = styled.div`
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
      margin: 5rem 0;
  `}
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.larger};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 1rem;
`;

const CoverImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: 1rem 0;
`;

const Description = styled.div`
  margin: 1rem 0;
  width: 80%;
`;
