import ProjectCard from '@/components/ProjectCard';
import { NextSeo } from 'next-seo';
import { TypePost } from 'types';
import { getStaticProps } from './api/projectsData';

const Projects = ({ projects }: { projects: TypePost[] }) => {
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
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 20px;
            padding: 20px;
          }
        `}</style>
      </div>
    </>
  );
};

export { getStaticProps };
export default Projects;
