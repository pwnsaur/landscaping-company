import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface ZoomedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  close: () => void;
}

const ZoomedImage = ({ src, alt, width, height, close }: ZoomedImageProps) => {
  const aspectRatio = height / width;

  return (
    <Overlay onClick={close}>
      <ImageWrapper aspectRatio={aspectRatio}>
        <Image src={src} alt={alt} fill />
      </ImageWrapper>
    </Overlay>
  );
};

export default ZoomedImage;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  z-index: 6;
`;

const ImageWrapper = styled.div<{ aspectRatio: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 80%;
  max-height: 80%;
  padding-bottom: calc(70% * ${({ aspectRatio }) => aspectRatio});
`;
