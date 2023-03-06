import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { TypeProject } from 'types';

const ProjectCard = ({ project }: { project: TypeProject }) => {
  const { content, coverImage, date, excerpt, slug, title } = project.fields;

  return (
    <StyledCard className='card'>
      <Link href={`/projects/${slug}`}>
        <StyledTitle className='title'>{title}</StyledTitle>
        <Image
          className='image'
          src={`https:${coverImage.fields.file.url}`}
          alt='cover-image'
          height={250}
          width={300}
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
  height: 290px;
  align-items: center;
  text-align: center;
  background-color: #f7efef;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px;
`;
