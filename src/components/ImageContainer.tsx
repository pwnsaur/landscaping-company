import Image from 'next/image';
import styled from 'styled-components';
import { Asset } from 'contentful';

const ImageContainer = ({ images }: { images: Asset[] | undefined }) => {
  return (
    <Container>
      {images &&
        images.map((image) => (
          <StyledImage
            key={image.sys.id}
            src={`https:${image.fields.file.url}`}
            alt='project image'
            height={image.fields.file.details.image!.height}
            width={image.fields.file.details.image!.width}
          />
        ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`;

const StyledImage = styled(Image)`
  margin: 0.5rem;
  width: 47%;
  height: auto;
  object-fit: cover;

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export default ImageContainer;
