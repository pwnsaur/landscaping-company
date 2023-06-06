import { Asset } from 'contentful';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  imagesLength = 0,
}: ZoomedImageProps) => {
  const [leftDisabled, setLeftDisabled] = useState(false);
  const [rightDisabled, setRightDisabled] = useState(false);

  useEffect(() => {
    setLeftDisabled(zoomedImageIndex === 0);
    setRightDisabled(zoomedImageIndex === imagesLength - 1);
  }, [zoomedImageIndex, imagesLength]);

  const aspectRatio = height / width;

  return (
    <Overlay onClick={close}>
      <ArrowContainerLeft
        onClick={(e) => {
          e.stopPropagation();
          previous();
        }}
        disabled={leftDisabled}
      >
        <Arrow disabled={leftDisabled}>{'<'}</Arrow>
      </ArrowContainerLeft>
      <ImageWrapper $aspectRatio={aspectRatio}>
        <StyledImage src={src} alt={alt} width={width} height={height} />
      </ImageWrapper>
      <ArrowContainerRight
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        disabled={rightDisabled}
      >
        <Arrow disabled={rightDisabled}>{'>'}</Arrow>
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
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 6;
`;

const Arrow = styled.button`
  position: absolute;
  z-index: 7;
  top: 50%;
  color: ${({ theme }) => theme.colors.black};
  background: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.superLarge};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  transform: translateY(-50%);
  cursor: pointer;

  &[disabled] {
    color: ${({ theme }) => theme.colors.borderGrey};
    cursor: default;
  }
`;

const ArrowContainer = styled.div<{ disabled: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 70px;
  display: flex;
  justify-content: center;
  cursor: pointer;

  &:not([disabled]):hover {
    background: rgba(200, 200, 200, 0.6);
  }

  &:not([disabled]) {
    background: rgba(200, 200, 200, 0.3);
  }

  &[disabled] {
    cursor: default;
  }
`;

const ArrowContainerLeft = styled(ArrowContainer)`
  left: 0;
`;

const ArrowContainerRight = styled(ArrowContainer)`
  right: 0;
`;
