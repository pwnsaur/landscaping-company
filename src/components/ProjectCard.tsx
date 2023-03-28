import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { TypeProject } from '@/types/contentfulTypes';

const ProjectCard = ({ project }: { project: TypeProject }) => {
  const { coverImage, slug, title } = project.fields;

  return (
    <StyledCard>
      <Link href={`/projects/${slug}`}>
        <StyledImage
          src={`https:${coverImage.fields.file.url}`}
          alt='cover-image'
          height={coverImage.fields.file.details.image!.height}
          width={coverImage.fields.file.details.image!.width}
        />
      </Link>
      <Title>{title}</Title>
    </StyledCard>
  );
};

export default ProjectCard;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  text-align: center;
  background-color: #ededed;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
`;

const Title = styled.h3`
  font-size: clamp(0.8rem, 1.1vw, 1rem);
  font-weight: 500;
  margin: 0.6rem;
  text-transform: uppercase;
`;
