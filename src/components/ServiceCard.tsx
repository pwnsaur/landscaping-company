import Image from 'next/image';
import Link from 'next/link';
import { TypeService } from 'types';
import styled from 'styled-components';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, slug, title, description } = service.fields;

  return (
    <StyledCard>
      <Link href={`/services/${slug}`}>
        <StyledTitle>{title}</StyledTitle>
        <Image
          src={`https:${coverImage.fields.file.url}`}
          alt='cover-image'
          height={350}
          width={500}
        />
      </Link>
    </StyledCard>
  );
};

export default Service;

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;
