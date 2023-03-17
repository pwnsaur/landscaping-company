import ProjectCard from '@/components/ProjectCard';
import { NextSeo } from 'next-seo';
import { TypeProject } from '@/types/contentfulTypes';
import styled from 'styled-components';
import { getStaticPropsPage } from '@/pages/api/getStaticPropsPage';

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
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 2vh 4vw;
  width: 100%;
  justify-content: center;
  padding: 1rem 2rem;
  margin-top: 3rem;
`;
