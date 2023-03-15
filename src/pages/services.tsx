import ServiceCard from '@/components/ServiceCard';
import { NextSeo } from 'next-seo';
import { TypeService } from '@/types/contentfulTypes';
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
        <PageTitle>
          A short description of types of services we offer to our clients
        </PageTitle>
        {services.map((service) => (
          <ServiceCard key={service.sys.id} service={service} />
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

const PageTitle = styled.h1`
  max-width: 20em;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 500;
  padding-bottom: 3rem;
`;
