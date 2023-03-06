import ServiceCard from '@/components/ServiceCard';
import { NextSeo } from 'next-seo';
import { TypeService } from 'types';
// import { getStaticProps } from './api/servicesData';
import { getStaticPropsPage } from './api/getStaticPropsPage';

export const getStaticProps = getStaticPropsPage('service');

const Services = ({ services }: { services: TypeService[] }) => {
  console.log(services);
  return (
    <>
      <NextSeo
        title='Par mums'
        titleTemplate='Brasika | %s'
        description='Par mums'
      />
      <div className='container'>
        {services.map((service) => (
          <ServiceCard key={service.sys.id} service={service} />
        ))}

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
          }
        `}</style>
      </div>
    </>
  );
};

// export { getStaticProps };
export default Services;
