import Image from 'next/image';
import styled from 'styled-components';
import { Asset } from 'contentful';
import ZoomedImage from './ZoomedImage';
import React, { useState } from 'react';

const ImageContainer = ({ images }: { images: Asset[] | undefined }) => {
  const [zoomedImage, setZoomedImage] = useState<{
    src: string;
    width: number;
    height: number;
  } | null>(null);

  const handleClick = (src: string, width: number, height: number) => {
    setZoomedImage({ src, width, height });
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
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
                objectFit='cover'
                quality={75}
              />
            </ImageWrapper>
          ))}
      </Container>
      {zoomedImage && (
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
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  width: 90%;
  gap: 1rem;
  justify-items: center;
  margin-top: 2rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%;
  overflow: hidden;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
