import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { TypeProject } from 'types';
import ErrorBoundary from '@/utils/ErrorBoundary';

const ProjectCard = ({ project }: { project: TypeProject }) => {
  const { coverImage, slug, title } = project.fields;

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
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

const Title = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 5px;
  text-transform: uppercase;
`;
