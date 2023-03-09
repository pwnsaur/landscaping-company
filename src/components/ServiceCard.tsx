import Image from 'next/image';
import Link from 'next/link';
import { TypeService } from 'types';
import styled from 'styled-components';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, slug, title, description } = service.fields;

  return (
    <StyledCard>
      <StyledLink href={`/services/${slug}`}>
        <StyledImage
          src={`https:${coverImage.fields.file.url}`}
          alt='cover-image'
          height={coverImage.fields.file.details.image!.height}
          width={coverImage.fields.file.details.image!.width}
        />
        <StyledTitle>{title}</StyledTitle>
      </StyledLink>
    </StyledCard>
  );
};

export default Service;

const StyledCard = styled.div`
  /* display: flex; */
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  /* margin-bottom: 10px; */
  margin: auto;
`;

const StyledImage = styled(Image)`
  width: 40%;
  height: auto;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 1100px;
`;
