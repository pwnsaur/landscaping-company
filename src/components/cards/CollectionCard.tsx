import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

type CollectionCardImage = {
  src: string;
  alt: string;
};

type CollectionCardProps = {
  href: string;
  image?: CollectionCardImage;
  priority?: boolean;
  sizes?: string;
  meta: string;
  title: string;
  excerpt: string;
  actionLabel: string;
};

const DEFAULT_SIZES = '(max-width: 920px) 94vw, (max-width: 1280px) 46vw, 31vw';

const CollectionCard = ({
  href,
  image,
  priority = false,
  sizes = DEFAULT_SIZES,
  meta,
  title,
  excerpt,
  actionLabel,
}: CollectionCardProps) => {
  return (
    <Card>
      <StyledLink href={href}>
        {image ? (
          <Media>
            <StyledImage
              src={image.src}
              alt={image.alt}
              fill
              quality={65}
              priority={priority}
              sizes={sizes}
            />
          </Media>
        ) : (
          <MediaPlaceholder aria-hidden='true' />
        )}
        <Description>
          <Meta>{meta}</Meta>
          <Title>{title}</Title>
          <Excerpt>{excerpt}</Excerpt>
          <Action>{actionLabel}</Action>
        </Description>
      </StyledLink>
    </Card>
  );
};

export default CollectionCard;

const Card = styled.div`
  width: 100%;
  border: 1px solid ${theme.colors.lineSoft};
  background: ${theme.gradients.panelLight};
  box-shadow: ${theme.shadows.medium};
  transition:
    transform ${theme.motion.normal} ${theme.motion.easing},
    box-shadow ${theme.motion.normal} ${theme.motion.easing};

  &:hover {
    transform: translateY(${theme.components.card.hoverLift});
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
  min-height: ${theme.components.card.mediaMinHeight};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: ${theme.components.card.mediaMinHeightCompact};
  }
`;

const MediaPlaceholder = styled.div`
  min-height: ${theme.components.card.mediaMinHeight};
  background: ${theme.gradients.placeholder};
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Description = styled.div`
  display: grid;
  align-content: start;
  gap: ${theme.components.card.descriptionGap};
  padding: ${theme.components.card.descriptionPadding};
`;

const Meta = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.14rem;
  font-size: ${theme.components.card.metaSize};
  color: ${theme.colors.textSubtle};
`;

const Title = styled.h2`
  text-transform: uppercase;
  line-height: 1.2;
  font-size: ${theme.components.card.titleSize};
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
  margin-top: ${theme.spacing.xxs};
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: ${theme.components.card.actionSize};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.darkGreen};
`;
