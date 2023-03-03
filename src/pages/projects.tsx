import ProjectCard from '@/components/ProjectCard';
import { NextSeo } from 'next-seo';
import { TypeProject } from 'types';
import { getStaticProps } from './api/projectsData';

const Projects = ({ projects }: { projects: TypeProject[] }) => {
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
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            grid-template-rows: 1fr;
            column-gap: 15px;
            row-gap: 15px;
            padding: 30px;
          }
        `}</style>
      </div>
    </>
  );
};

export { getStaticProps };
export default Projects;
