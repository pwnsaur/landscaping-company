import Image from 'next/image';
import Link from 'next/link';
import { TypeService } from '@/types/contentfulTypes';
import styled from 'styled-components';
import ErrorBoundary from '@/utils/ErrorBoundary';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, slug, title, description, excerpt } = service.fields;

  return (
    <ErrorBoundary>
      <Break />
      <Card>
        <StyledLink href={`/services/${slug}`}>
          <StyledImage
            src={`https:${coverImage.fields.file.url}`}
            alt='cover-image'
            height={coverImage.fields.file.details.image!.height}
            width={coverImage.fields.file.details.image!.width}
          />
          <Description>
            <Title>{title}</Title>
            <Excerpt>{excerpt}</Excerpt>
          </Description>
        </StyledLink>
      </Card>
    </ErrorBoundary>
  );
};

export default Service;

const Break = styled.hr`
  border: none;
  height: 1px;
  background-color: black;
  margin: 20px 0;
  width: 100%;
`;

const Card = styled.div`
  justify-content: center;
  width: 100%;
  margin: 20px auto;
  text-align: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin: auto;
`;

const StyledImage = styled(Image)`
  width: 40%;
  height: auto;

  @media screen and (max-width: 40em) {
    width: 100%;
    margin: 0 1rem 2rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 40em) {
    display: flex;
    flex-direction: column;
  }
`;

const Excerpt = styled.p`
  margin: 10px 20px;
`;

const Description = styled.div`
  width: 100%;
`;
