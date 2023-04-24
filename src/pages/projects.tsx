import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { TypeProject } from '@/types/contentfulTypes';
import ProjectCard from '@components/ProjectCard';
import { getStaticPropsPage } from '@pages/api/getStaticPropsPage';

export const getStaticProps = getStaticPropsPage('project');

const Projects = ({ projects }: { projects: TypeProject[] }) => {
  return (
    <>
      <NextSeo
        title='Projekti'
        titleTemplate='Brasika | %s'
        description='Projekti'
      />
      <Container>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.sys.id}
            project={project}
            priority={index < 2}
          />
        ))}
      </Container>
    </>
  );
};

export default Projects;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 4vh 4vw;
  width: 100%;
  justify-content: center;
  padding: 1rem 2rem;
  margin: 3rem 0;
`;
