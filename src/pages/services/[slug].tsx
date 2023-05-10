import Image from 'next/image';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

import { TypeService } from '@/types/contentfulTypes';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { getStaticData } from '@pages/api/getStaticDataSlug';

const { getStaticPaths, getStaticProps } = getStaticData('service');

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, description, title, excerpt } = service.fields;

  const descriptionDocument = description as Document;

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`Brasika | ${title}`}
        description={excerpt}
      />

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
        <Desription>
          {documentToReactComponents(descriptionDocument)}
        </Desription>
      </ServiceContainer>
    </>
  );
};

export { getStaticPaths, getStaticProps };
export default Service;

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
      margin: 0;
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

const Desription = styled.div`
  margin: 1rem 0;
  width: 80%;
`;
