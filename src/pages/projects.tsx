import ProjectCard from '@/components/ProjectCard';
import { NextSeo } from 'next-seo';
import { TypePost } from 'types';
import { createClient } from 'contentful';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    environment: 'master',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const res = await client.getEntries({ content_type: 'post' });

  return {
    props: { projects: res.items },
    revalidate: 60,
  };
}

const Projects = ({ projects }: { projects: TypePost[] }) => {
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
