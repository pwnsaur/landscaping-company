import { NextSeo } from 'next-seo';

type Props = {};

const Projects = (props: Props) => {
  return (
    <>
      <NextSeo
        title='Projekti'
        titleTemplate='Brasika | %s'
        description='Projekti'
      />
      <div>Projects</div>
    </>
  );
};

export default Projects;
