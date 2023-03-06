import Image from 'next/image';
import { TypeService } from 'types';
import { getStaticPaths, getStaticProps } from '../api/serviceData';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, description, slug, title } = service.fields;

  return (
    <>
      <h2>{title}</h2>
      <Image
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
