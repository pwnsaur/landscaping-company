import Image from 'next/image';
import { TypeService } from 'types';
import { getStaticPaths, getStaticProps } from '../api/serviceData';
import styled from 'styled-components';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, description, slug, title } = service.fields;
  // console.log(description.content[0].content[0].value);

  return (
    <>
      <Title>{title}</Title>
      <CoverImage
        src={`https:${coverImage.fields.file.url}`}
        alt='cover image'
        width={coverImage.fields.file.details.image!.width / 3}
        height={coverImage.fields.file.details.image!.height / 3}
      />
      {/* <div>{description.content[0].content[0].value}</div> */}
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
