import ProjectCard from '@/components/ProjectCard';
import { NextSeo } from 'next-seo';

const projects = [
  { id: 1, title: 'pirmais projekts' },
  { id: 2, title: 'otrais projekts' },
  { id: 3, title: 'trešais projekts' },
  { id: 4, title: 'ceturtais projekts' },
  { id: 5, title: 'piektais projekts' },
  { id: 6, title: 'sestais projekts' },
];

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: '1' } }],
//     fallback: true,
//   };
// }

type Props = {};

const Projects = (props: Props) => {
  return (
    <>
      <NextSeo
        title='Projekti'
        titleTemplate='Brasika | %s'
        description='Projekti'
      />
      <div className='container'>
        {projects.map((project) => (
          <ProjectCard key={project.id} title={project.title} />
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

export default Projects;
