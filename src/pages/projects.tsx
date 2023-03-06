import ProjectCard from '@/components/ProjectCard';
import { NextSeo } from 'next-seo';
import { TypeProject } from 'types';
import { getStaticPropsPage } from './api/getStaticPropsPage';

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
      <div className='container'>
        {projects.map((project) => (
          <ProjectCard key={project.sys.id} project={project} />
        ))}

        <style jsx>{`
          .container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 0));
            grid-template-rows: 1fr;
            column-gap: 40px;
            row-gap: 40px;
            width: 100%;
            max-width: 1600px;
            justify-content: center;
            padding: 8vh 6vw;
          }
        `}</style>
      </div>
    </>
  );
};

export default Projects;
