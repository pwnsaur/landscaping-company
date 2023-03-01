import { NextSeo } from 'next-seo';

type Props = {};

const About = (props: Props) => {
  return (
    <>
      <NextSeo
        title='Par mums'
        titleTemplate='Brasika | %s'
        description='Par mums'
      />
      <div>about</div>
    </>
  );
};

export default About;
