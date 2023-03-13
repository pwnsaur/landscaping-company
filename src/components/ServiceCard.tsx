import Image from 'next/image';
import Link from 'next/link';
import { TypeService } from 'types';
import styled from 'styled-components';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, slug, title, description, excerpt } = service.fields;

  return (
    <Card>
      <StyledLink href={`/services/${slug}`}>
        <StyledImage
          src={`https:${coverImage.fields.file.url}`}
          alt='cover-image'
          height={coverImage.fields.file.details.image!.height}
          width={coverImage.fields.file.details.image!.width}
        />
        <Description>
          <Title>{title}</Title>
          <Excerpt>{excerpt}</Excerpt>
        </Description>
      </StyledLink>
    </Card>
  );
};

export default Service;

const Card = styled.div`
  /* display: flex;
  flex-direction: row; */
  justify-content: center;
  width: 100%;
  /* padding: 20px; */
  margin: 20px auto;
  text-align: center;
  /* background-color: #fff; */
`;

const Title = styled.div`
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
  width: 100%;
  /* width: 1100px; */
`;

const Excerpt = styled.p`
  margin: 10px 20px;
`;

const Description = styled.div`
  width: 100%;
`;
