import type { Metadata } from 'next';
import styled from 'styled-components';

import { getProjects } from '@/lib/contentfulData';
import ProjectCard from '@components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projekti',
  description: 'Projekti',
};

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <Container>
      {projects.map((project, index) => (
        <ProjectCard key={project.sys.id} project={project} priority={index < 2} />
      ))}
    </Container>
  );
};

export default ProjectsPage;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 4vh 4vw;
  width: 100%;
  justify-content: center;
  padding: 1rem 2rem;
  ${({ theme }) => theme.isMobile && `padding: 2rem 1rem;`}
  margin: 4rem 0;
`;
