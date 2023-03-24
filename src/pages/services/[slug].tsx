import Image from 'next/image';
import { TypeService } from '@/types/contentfulTypes';
import styled from 'styled-components';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { NextSeo } from 'next-seo';
import { getStaticData } from '../api/getStaticDataSlug';

const { getStaticPaths, getStaticProps } = getStaticData('service');

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, description, title, excerpt } = service.fields;

  const descriptionDocument = description as Document;

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`Brasika | ${title}`}
        // description={excerpt}
      />

      <ServiceContainer>
        <CoverImage
          src={`https:${coverImage.fields.file.url}`}
          alt='cover image'
          width={coverImage.fields.file.details.image!.width}
          height={coverImage.fields.file.details.image!.height}
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
  font-size: 1.5rem;
  font-weight: bold;
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
