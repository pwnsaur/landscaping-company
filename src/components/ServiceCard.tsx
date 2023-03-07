import Image from 'next/image';
import Link from 'next/link';
import { TypeService } from 'types';
import styled from 'styled-components';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, slug, title, description } = service.fields;

  return (
    <Card>
      <Link href={`/services/${slug}`}>
        <Title>{title}</Title>
        <Image
          src={`https:${coverImage.fields.file.url}`}
          alt='cover-image'
          height={350}
          width={500}
        />
      </Link>
    </Card>
  );
};

export default Service;

const Card = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;
