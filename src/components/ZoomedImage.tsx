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

  return (
    <Overlay onClick={close}>
      <ArrowContainerLeft
        onClick={(e) => {
          e.stopPropagation();
          previous();
        }}
        $disabled={leftDisabled}
      >
        <Arrow disabled={leftDisabled}>&#8249;</Arrow>
      </ArrowContainerLeft>
      <ImageWrapper $aspectRatio={aspectRatio}>
        <StyledImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={70}
          sizes='(max-width: 768px) calc(100vw - 2rem), calc(100vw - 140px)'
        />
      </ImageWrapper>
      <ArrowContainerRight
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        $disabled={rightDisabled}
      >
        <Arrow disabled={rightDisabled}>&#8250;</Arrow>
      </ArrowContainerRight>
    </Overlay>
  );
};

export default ZoomedImage;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div<{ $aspectRatio: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 140px);
  height: auto;
  max-height: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.overlayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: ${theme.zIndex.overlay};
`;

const Arrow = styled.button`
  position: absolute;
  z-index: ${theme.zIndex.floating};
  top: 50%;
  color: ${theme.colors.black};
  background: transparent;
  border: none;
  font-size: ${theme.fontSizes.superLarge};
  font-weight: ${theme.fontWeights.bold};
  transform: translateY(-50%);
  cursor: pointer;

  &[disabled] {
    color: ${theme.colors.borderGrey};
    cursor: default;
  }

  ::selection {
    background: none;
  }
`;

const ArrowContainer = styled.div<{ $disabled: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 70px;
  display: flex;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  background: ${({ $disabled }) =>
    $disabled ? 'transparent' : theme.colors.overlayHoverSoft};

  &:hover {
    background: ${({ $disabled }) =>
      $disabled ? 'transparent' : theme.colors.overlayHoverStrong};
  }
`;

const ArrowContainerLeft = styled(ArrowContainer)`
  left: 0;
`;

const ArrowContainerRight = styled(ArrowContainer)`
  right: 0;
`;
