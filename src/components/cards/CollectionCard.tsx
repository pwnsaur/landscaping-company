import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { media } from '@/styles/media';
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
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid ${theme.semantic.border.subtle};
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  background: ${theme.gradients.panelLight};
  box-shadow: ${theme.shadows.medium};
  transition:
    transform ${theme.motion.normal} ${theme.motion.easing},
    box-shadow ${theme.motion.normal} ${theme.motion.easing};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.strong};
  }
`;

const StyledLink = styled(Link).attrs({
  prefetch: false,
})`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  color: inherit;
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  min-height: 14rem;
  overflow: hidden;

  ${media.down('md')`
    min-height: 12rem;
  `}
`;

const MediaPlaceholder = styled.div`
  min-height: 14rem;
  background: ${theme.gradients.placeholder};
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-height: 13rem;
  gap: 1rem;
  padding: 1.9rem 1.65rem 2rem;
`;

const Meta = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.14rem;
  font-size: 0.72rem;
  color: ${theme.semantic.text.subtle};
`;

const Title = styled.h2`
  line-height: ${theme.typography.lineHeightHeading};
  font-size: clamp(1.3rem, 1.8vw, 1.9rem);
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Excerpt = styled.p`
  flex: 1;
  line-height: ${theme.typography.lineHeightBody};
  color: ${theme.semantic.text.primary};
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Action = styled.span`
  margin-top: auto;
  padding-top: 1.15rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.82rem;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.darkGreen};
`;
