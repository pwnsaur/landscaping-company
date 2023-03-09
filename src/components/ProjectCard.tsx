import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { TypeProject } from 'types';

const ProjectCard = ({ project }: { project: TypeProject }) => {
  const { coverImage, slug, title } = project.fields;

  return (
    <StyledCard>
      <Link href={`/projects/${slug}`}>
        <StyledTitle>{title}</StyledTitle>
        <StyledImage
          src={`https:${coverImage.fields.file.url}`}
          alt='cover-image'
          height={coverImage.fields.file.details.image!.height}
          width={coverImage.fields.file.details.image!.width}
        />
      </Link>
    </StyledCard>
  );
};

export default ProjectCard;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  /* height: 250px; */
  align-items: center;
  text-align: center;
  background-color: #f7efef;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
`;

const StyledTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 10px;
`;
