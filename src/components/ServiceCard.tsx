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
  const serviceExcerpt =
    excerpt ||
    'Praktisks un uzturams risinājums, pielāgots teritorijai un ikdienas lietojumam.';

  return (
    <Card>
      <StyledLink href={`/services/${slug}`}>
        {coverImageData && (
          <Media>
            <StyledImage
              src={coverImageData.src}
              alt={`${title} attēls`}
              fill
              quality={65}
              priority={priority}
              sizes='(max-width: 920px) 94vw, (max-width: 1280px) 46vw, 31vw'
            />
          </Media>
        )}
        {!coverImageData && <MediaPlaceholder aria-hidden='true' />}
        <Description>
          <Meta>Pakalpojums</Meta>
          <Title>{title}</Title>
          <Excerpt>{serviceExcerpt}</Excerpt>
          <Action>Skatīt vairāk</Action>
        </Description>
      </StyledLink>
    </Card>
  );
};

export default ServiceCard;

const Card = styled.div`
  width: 100%;
  border: 1px solid ${theme.colors.lineSoft};
  background: ${theme.gradients.panelLight};
  box-shadow: ${theme.shadows.medium};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.strong};
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: inherit;
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  min-height: 14rem;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 12rem;
  }
`;

const MediaPlaceholder = styled.div`
  min-height: 14rem;
  background: ${theme.gradients.placeholder};
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Description = styled.div`
  display: grid;
  align-content: start;
  gap: 0.8rem;
  padding: 1.4rem 1.3rem 1.5rem;
`;

const Meta = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.14rem;
  font-size: 0.72rem;
  color: ${theme.colors.textSubtle};
`;

const Title = styled.h2`
  text-transform: uppercase;
  line-height: 1.2;
  font-size: clamp(1.3rem, 1.8vw, 1.9rem);
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
`;

const Excerpt = styled.p`
  line-height: 1.6;
  color: ${theme.colors.text};
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Action = styled.span`
  margin-top: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.82rem;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.darkGreen};
`;
