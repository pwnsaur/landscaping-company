import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styled from 'styled-components';

import { getServiceBySlug } from '@/lib/contentfulData';
import { theme } from '@/styles/theme';
import { getAssetImageData } from '@/utils/contentfulAsset';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Pakalpojums',
  description: 'Pakalpojums',
};

const ServicePage = async ({ params }: Props) => {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { coverImage, description, title } = service.fields;
  const descriptionDocument = description as Document;
  const coverImageData = getAssetImageData(coverImage);

  return (
    <ServiceContainer>
      {coverImageData && (
        <CoverImage
          src={coverImageData.src}
          alt='cover image'
          width={coverImageData.width}
          height={coverImageData.height}
          priority
          quality={75}
        />
      )}
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
    margin: 5rem 0;
  }
`;

const Title = styled.h2`
  font-size: ${theme.fontSizes.larger};
  font-weight: ${theme.fontWeights.bold};
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
