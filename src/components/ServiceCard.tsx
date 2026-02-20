import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { theme } from '@/styles/theme';
import { TypeService } from '@/types/contentfulTypes';
import { getAssetImageData } from '@/utils/contentfulAsset';

const ServiceCard = ({
  service,
  priority,
}: {
  service: TypeService;
  priority: boolean;
}) => {
  const { coverImage, slug, title, excerpt } = service.fields;
  const coverImageData = getAssetImageData(coverImage);

  return (
    <>
      <Break />
      <Card>
        <StyledLink href={`/services/${slug}`}>
          {coverImageData && (
            <StyledImage
              src={coverImageData.src}
              alt='cover-image'
              height={coverImageData.height / 4}
              width={coverImageData.width / 4}
              quality={50}
              priority={priority}
            />
          )}
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
  background-color: ${theme.colors.black};
  margin: 1rem 0;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: clamp(
    ${theme.normalClamp.min},
    ${theme.normalClamp.preferred},
    ${theme.normalClamp.max}
  );
  font-weight: ${theme.fontWeights.normal};
  margin: auto;
`;

const StyledImage = styled(Image)`
  max-width: 40%;
  height: auto;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 1rem 2rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Excerpt = styled.p`
  margin: 10px 20px;
  font-size: clamp(
    ${theme.smallClamp.min},
    ${theme.smallClamp.preferred},
    ${theme.smallClamp.max}
  );
`;

const Description = styled.div`
  width: 100%;
`;
