import Image from 'next/image';
import Link from 'next/link';
import { TypeService } from 'types';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, slug, title, description } = service.fields;

  return (
    <div className='card'>
      <Link href={`/services/${slug}`}>
        <div className='title'>{title}</div>
        <Image
          className='image'
          src={`https:${coverImage.fields.file.url}`}
          alt='cover-image'
          height={350}
          width={500}
        />
      </Link>

      <style jsx>{`
        .card {
          display: flex;
          justify-content: center;
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Service;
