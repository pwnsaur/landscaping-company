'use client';

import { Asset } from 'contentful';
import Image from 'next/image';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { getAssetImageData } from '@/utils/contentfulAsset';
import useIsMobile from '@/utils/hooks/useIsMobile';
import ZoomedImage from '@components/ZoomedImage';
import { theme } from '@/styles/theme';

type Props = {
  images: Asset[] | undefined;
};

const ImageContainer = ({ images }: Props) => {
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const imagesWithData = useMemo(
    () =>
      (images ?? [])
        .map((asset) => {
          const imageData = getAssetImageData(asset);
          return imageData ? { id: asset.sys.id, imageData } : null;
        })
        .filter(
          (
            image
          ): image is {
            id: string;
            imageData: {
              src: string;
              width: number;
              height: number;
            };
          } => image !== null
        ),
    [images]
  );

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
      if (!imagesWithData.length || zoomedImageIndex === null) {
        return;
      }

      const newIndex = zoomedImageIndex + direction;
      if (newIndex >= 0 && newIndex < imagesWithData.length) {
        setZoomedImageIndex(newIndex);
      }
    },
    [imagesWithData, zoomedImageIndex]
  );

  useEffect(() => {
    if (
      zoomedImageIndex !== null &&
      (zoomedImageIndex < 0 || zoomedImageIndex >= imagesWithData.length)
    ) {
      setZoomedImageIndex(null);
    }
  }, [imagesWithData.length, zoomedImageIndex]);

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
        {imagesWithData.map((image, index) => (
          <ImageWrapper key={image.id} onClick={() => handleClick(index)}>
            <StyledImage
              src={image.imageData.src}
              alt='project image'
              fill
              quality={60}
              sizes='(max-width: 768px) 94vw, (max-width: 1280px) 46vw, 31vw'
            />
          </ImageWrapper>
        ))}
      </Container>
      {zoomedImageIndex !== null && !isMobile && imagesWithData[zoomedImageIndex] && (
        <ZoomedImage
          src={imagesWithData[zoomedImageIndex].imageData.src}
          alt='zoomed image'
          width={imagesWithData[zoomedImageIndex].imageData.width}
          height={imagesWithData[zoomedImageIndex].imageData.height}
          close={handleClose}
          previous={() => navigateImage(-1)}
          next={() => navigateImage(1)}
          zoomedImageIndex={zoomedImageIndex}
          imagesLength={imagesWithData.length}
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
  gap: ${theme.layout.grid.gap};
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
  cursor: zoom-in;

  @media (max-width: ${theme.breakpoints.md}) {
    cursor: default;
  }
`;
