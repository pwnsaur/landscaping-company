import ServiceCard from '@/components/ServiceCard';
import { NextSeo } from 'next-seo';
import { TypeService } from 'types';
import { getStaticPropsPage } from './api/getStaticPropsPage';
import styled from 'styled-components';

export const getStaticProps = getStaticPropsPage('service');

const Services = ({ services }: { services: TypeService[] }) => {
  console.log(services);
  return (
    <>
      <NextSeo
        title='Pakalpojumi'
        titleTemplate='Brasika | %s'
        description='Pakalpojumi'
      />
      <Container>
        {services.map((service) => (
          <>
            <Break />
            <ServiceCard key={service.sys.id} service={service} />
          </>
        ))}
      </Container>
    </>
  );
};

export default Services;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 8vh 6vw;
`;

const Break = styled.hr`
  border: none;
  height: 1px;
  background-color: black;
  margin: 20px 0;
  width: 100%;
`;
