import { Asset } from 'contentful';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import useIsMobile from '@/utils/hooks/useIsMobile';
import ZoomedImage from '@components/ZoomedImage';

type Props = {
  images: Asset[] | undefined;
};

const ImageContainer = ({ images }: Props) => {
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const handleClick = (index: number) => {
    if (!isMobile) {
      setZoomedImageIndex(index);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleClose = useCallback(() => {
    setZoomedImageIndex(null);
    document.body.style.overflow = 'auto';
  }, [setZoomedImageIndex]);

  const navigateImage = useCallback(
    (direction: number) => {
      if (!images || zoomedImageIndex === null) {
        return;
      }

      const newIndex = zoomedImageIndex + direction;
      if (newIndex >= 0 && newIndex < images.length) {
        setZoomedImageIndex(newIndex);
      }
    },
    [images, zoomedImageIndex]
  );

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (zoomedImageIndex !== null) {
      window.addEventListener('keydown', handleKeydown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [zoomedImageIndex, navigateImage, handleClose]);

  return (
    <>
      <Container>
        {images?.map((image, index) => (
          <ImageWrapper key={image.sys.id} onClick={() => handleClick(index)}>
            <StyledImage
              src={`https:${image.fields.file.url}`}
              alt='project image'
              height={image.fields.file.details.image!.height / 4}
              width={image.fields.file.details.image!.width / 4}
              quality={50}
            />
          </ImageWrapper>
        ))}
      </Container>
      {zoomedImageIndex !== null && !isMobile && images && (
        <ZoomedImage
          src={`https:${images[zoomedImageIndex].fields.file.url}`}
          alt='zoomed image'
          width={images[zoomedImageIndex].fields.file.details.image!.width}
          height={images[zoomedImageIndex].fields.file.details.image!.height}
          close={handleClose}
          previous={() => navigateImage(-1)}
          next={() => navigateImage(1)}
          zoomedImageIndex={zoomedImageIndex}
          imagesLength={images.length}
        />
      )}
    </>
  );
};

export default ImageContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  width: 100%;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const StyledImage = styled(Image)`
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66%;
  overflow: hidden;
  ${({ theme }) => !theme.isMobile && `cursor: pointer;`}
`;
