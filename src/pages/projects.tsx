import ProjectCard from '@/components/ProjectCard';
import { NextSeo } from 'next-seo';
import { TypeProject } from '@/types/contentfulTypes';
import { getStaticPropsPage } from './api/getStaticPropsPage';
import styled from 'styled-components';

export const getStaticProps = getStaticPropsPage('project');

const Projects = ({ projects }: { projects: TypeProject[] }) => {
  console.log(projects);
  return (
    <>
      <NextSeo
        title='Projekti'
        titleTemplate='Brasika | %s'
        description='Projekti'
      />
      <Container>
        {projects.map((project) => (
          <ProjectCard key={project.sys.id} project={project} />
        ))}
      </Container>
    </>
  );
};

export default Projects;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 0));
  grid-template-rows: 1fr;
  gap: 20px 40px;
  width: 100%;
  max-width: 1600px;
  justify-content: center;
  padding: 8vh 6vw;
  margin-top: 50px;
`;
