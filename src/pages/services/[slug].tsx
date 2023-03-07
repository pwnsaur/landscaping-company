import Image from 'next/image';
import { TypeService } from 'types';
import { getStaticPaths, getStaticProps } from '../api/serviceData';
import styled from 'styled-components';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, description, slug, title } = service.fields;

  return (
    <>
      <Title>{title}</Title>
      <CoverImage
        src={`https:${coverImage.fields.file.url}`}
        alt='cover image'
        width={coverImage.fields.file.details.image!.width / 3}
        height={coverImage.fields.file.details.image!.height / 3}
      />
    </>
  );
};

export { getStaticPaths, getStaticProps };
export default Service;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CoverImage = styled(Image)`
  border-radius: 8px;
  margin: 1rem 0;
`;
