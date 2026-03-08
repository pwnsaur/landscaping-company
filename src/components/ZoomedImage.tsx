import Image from 'next/image';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

interface ZoomedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  close: () => void;
  previous: () => void;
  next: () => void;
  zoomedImageIndex: number;
  imagesLength: number;
}

const ZoomedImage = ({
  src,
  alt,
  width,
  height,
  close,
  previous,
  next,
  zoomedImageIndex,
  imagesLength,
}: ZoomedImageProps) => {
  const leftDisabled = zoomedImageIndex === 0;
  const rightDisabled = zoomedImageIndex === imagesLength - 1;

  const aspectRatio = width / height;
  const imagePositionLabel = `${zoomedImageIndex + 1} / ${imagesLength}`;

  return (
    <Overlay onClick={close}>
      <Lightbox
        role='dialog'
        aria-modal='true'
        aria-label='Project image zoom view'
        onClick={(e) => e.stopPropagation()}
      >
        <TopBar>
          <Counter>{imagePositionLabel}</Counter>
          <CloseButton
            type='button'
            aria-label='Close zoomed image'
            onClick={close}
          >
            <span aria-hidden='true'>×</span>
          </CloseButton>
        </TopBar>
        <Viewport>
          <NavButton
            type='button'
            aria-label='Previous image'
            onClick={previous}
            disabled={leftDisabled}
          >
            <span aria-hidden='true'>‹</span>
          </NavButton>
          <ImageFrame $aspectRatio={aspectRatio}>
            <StyledImage
              src={src}
              alt={alt}
              width={width}
              height={height}
              quality={70}
              sizes='(max-width: 768px) calc(100vw - 7rem), calc(100vw - 17rem)'
            />
          </ImageFrame>
          <NavButton
            type='button'
            aria-label='Next image'
            onClick={next}
            disabled={rightDisabled}
          >
            <span aria-hidden='true'>›</span>
          </NavButton>
        </Viewport>
      </Lightbox>
    </Overlay>
  );
};

export default ZoomedImage;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(243, 246, 241, 0.92)),
    ${theme.colors.overlayLight};
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  z-index: ${theme.zIndex.overlay};
`;

const Lightbox = styled.div`
  width: min(92vw, 82rem);
  max-height: min(88vh, 58rem);
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border: 1px solid rgba(20, 39, 28, 0.08);
  border-radius: ${theme.radii.xl};
  background: rgba(255, 255, 255, 0.86);
  box-shadow: ${theme.shadows.strong};

  @media (max-width: ${theme.breakpoints.md}) {
    width: calc(100vw - 1.25rem);
    max-height: calc(100vh - 1.25rem);
    padding: ${theme.spacing.sm};
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
`;

const Counter = styled.p`
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0 ${theme.spacing.md};
  border-radius: ${theme.radii.full};
  background: rgba(20, 39, 28, 0.07);
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.bold};
  letter-spacing: ${theme.typography.trackingWide};
  text-transform: uppercase;
`;

const Viewport = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  min-height: 0;
  flex: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xs};
  }
`;

const ImageFrame = styled.div<{ $aspectRatio: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 72vw);
  height: auto;
  max-height: min(74vh, 48rem);
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};

  @media (max-width: ${theme.breakpoints.lg}) {
    width: min(100%, 68vw);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    max-height: calc(100vh - 10rem);
  }
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border: 1px solid rgba(20, 39, 28, 0.12);
  border-radius: ${theme.radii.full};
  background: rgba(255, 255, 255, 0.82);
  color: ${theme.colors.black};
  box-shadow: ${theme.shadows.soft};
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;

  span {
    font-size: 2rem;
    line-height: 1;
    transform: translateY(-0.04em);
  }

  &:not(:disabled):hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.96);
    border-color: rgba(20, 39, 28, 0.2);
    box-shadow: ${theme.shadows.medium};
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
    box-shadow: none;
  }
`;

const NavButton = styled(IconButton)`
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 2.9rem;
    height: 2.9rem;

    span {
      font-size: 1.65rem;
    }
  }
`;

const CloseButton = styled(IconButton)`
  span {
    font-size: 2.15rem;
  }
`;
