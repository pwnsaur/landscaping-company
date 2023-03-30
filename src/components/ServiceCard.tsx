import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { TypeService } from '@/types/contentfulTypes';

const ServiceCard = ({
  service,
  priority,
}: {
  service: TypeService;
  priority: boolean;
}) => {
  const { coverImage, slug, title, description, excerpt } = service.fields;

  return (
    <>
      <Break />
      <Card>
        <StyledLink href={`/services/${slug}`}>
          <StyledImage
            src={`https:${coverImage.fields.file.url}`}
            alt='cover-image'
            height={coverImage.fields.file.details.image!.height}
            width={coverImage.fields.file.details.image!.width}
            priority={priority}
          />
          <Description>
            <Title>{title}</Title>
            <Excerpt>{excerpt}</Excerpt>
          </Description>
        </StyledLink>
      </Card>
    </>
  );
};

export default ServiceCard;

const Break = styled.hr`
  border: none;
  height: 1px;
  background-color: black;
  margin: 1.5rem 0;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1.5rem auto;
  text-align: center;
`;

const Title = styled.h3`
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-weight: 400;
  margin: auto;
`;

const StyledImage = styled(Image)`
  max-width: 40%;
  height: auto;

  ${({ theme }) =>
    theme.isMobile &&
    `
      max-width: 100%;
      margin: 0 1rem 2rem;`}
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.isMobile && `flex-direction: column;`}
`;

const Excerpt = styled.p`
  margin: 10px 20px;
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
`;

const Description = styled.div`
  width: 100%;
`;
