import Image from 'next/image';
import { TypeProject } from 'types';
import { getStaticPaths, getStaticProps } from '../api/projectData';
import styled from 'styled-components';

const Project = ({ project }: { project: TypeProject }) => {
  const { content, coverImage, date, excerpt, slug, title } = project.fields;

  return (
    <ProjectContainer>
      <Title>{title}</Title>
      <CoverImage
        src={`https:${coverImage.fields.file.url}`}
        alt='cover image'
        width={coverImage.fields.file.details.image!.width / 3}
        height={coverImage.fields.file.details.image!.height / 3}
      />
    </ProjectContainer>
  );
};

export { getStaticPaths, getStaticProps };
export default Project;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CoverImage = styled(Image)`
  border-radius: 8px;
  margin-bottom: 1rem;
`;
