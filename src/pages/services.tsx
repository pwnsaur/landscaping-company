import { NextSeo } from 'next-seo';

type Props = {};

const Services = (props: Props) => {
  return (
    <>
      <NextSeo
        title='Par mums'
        titleTemplate='Brasika | %s'
        description='Par mums'
      />
      <div>Services</div>
    </>
  );
};

export default Services;
