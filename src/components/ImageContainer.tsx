import Image from 'next/image';
import styled from 'styled-components';
import { Asset } from 'contentful';
import ZoomedImage from '@components/ZoomedImage';
import React, { useState } from 'react';
import useIsMobile from '@/utils/hooks/useIsMobile';

const ImageContainer = ({ images }: { images: Asset[] | undefined }) => {
  const [zoomedImage, setZoomedImage] = useState<{
    src: string;
    width: number;
    height: number;
  } | null>(null);

  const isMobile = useIsMobile();

  const handleClick = (src: string, width: number, height: number) => {
    if (isMobile) return;
    setZoomedImage({ src, width, height });
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    if (isMobile) return;
    setZoomedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Container>
        {images &&
          images.map((image) => (
            <ImageWrapper
              key={image.sys.id}
              onClick={() =>
                handleClick(
                  `https:${image.fields.file.url}`,
                  image.fields.file.details.image!.width,
                  image.fields.file.details.image!.height
                )
              }
            >
              <StyledImage
                src={`https:${image.fields.file.url}`}
                alt='project image'
                height={image.fields.file.details.image!.height / 4}
                width={image.fields.file.details.image!.width / 4}
                quality={75}
              />
            </ImageWrapper>
          ))}
      </Container>
      {zoomedImage && !isMobile && (
        <ZoomedImage
          src={zoomedImage.src}
          alt='zoomed image'
          width={zoomedImage.width}
          height={zoomedImage.height}
          close={handleClose}
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
