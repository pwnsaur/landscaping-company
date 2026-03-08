'use client';

import { Asset } from 'contentful';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';
import { getAssetImageData } from '@/utils/contentfulAsset';
import useBodyScrollLock from '@/utils/hooks/useBodyScrollLock';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import ZoomedImage from '@components/ZoomedImage';

type Props = {
  images: Asset[] | undefined;
};

type ImageWithData = {
  id: string;
  imageData: {
    src: string;
    width: number;
    height: number;
  };
};

const ImageContainer = ({ images }: Props) => {
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const canHover = useMediaQuery('(hover: hover)');
  const imagesWithData: ImageWithData[] = (images ?? [])
    .map((asset) => {
      const imageData = getAssetImageData(asset);
      return imageData ? { id: asset.sys.id, imageData } : null;
    })
    .filter((image): image is ImageWithData => image !== null);

  useBodyScrollLock(zoomedImageIndex !== null);

  const handleClick = (index: number) => {
    if (!canHover) return;
    setZoomedImageIndex(index);
  };

  const handleClose = () => {
    setZoomedImageIndex(null);
  };

  const navigateImage = (direction: number) => {
    setZoomedImageIndex((currentIndex) => {
      if (currentIndex === null || !imagesWithData.length) {
        return currentIndex;
      }

      const nextIndex = currentIndex + direction;

      if (nextIndex < 0 || nextIndex >= imagesWithData.length) {
        return currentIndex;
      }

      return nextIndex;
    });
  };

  useEffect(() => {
    if (
      zoomedImageIndex !== null &&
      (zoomedImageIndex < 0 || zoomedImageIndex >= imagesWithData.length)
    ) {
      setZoomedImageIndex(null);
    }
  }, [imagesWithData.length, zoomedImageIndex]);

  useEffect(() => {
    if (zoomedImageIndex === null) {
      return;
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setZoomedImageIndex((currentIndex) => {
          if (currentIndex === null) {
            return currentIndex;
          }

          return currentIndex > 0 ? currentIndex - 1 : currentIndex;
        });
      } else if (e.key === 'ArrowRight') {
        setZoomedImageIndex((currentIndex) => {
          if (currentIndex === null) {
            return currentIndex;
          }

          return currentIndex < imagesWithData.length - 1
            ? currentIndex + 1
            : currentIndex;
        });
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [zoomedImageIndex, imagesWithData.length]);

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
      {zoomedImageIndex !== null && imagesWithData[zoomedImageIndex] && (
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
  object-fit: cover;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66%;
  overflow: hidden;
  cursor: default;

  @media (hover: hover) {
    cursor: zoom-in;
  }
`;
