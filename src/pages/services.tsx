import ServiceCard from '@/components/ServiceCard';
import { NextSeo } from 'next-seo';
import { TypeService } from '@/types/contentfulTypes';
import styled from 'styled-components';
import { getStaticPropsPage } from '@/pages/api/getStaticPropsPage';

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
        <Title>
          A short description of types of services we offer to our clients
        </Title>
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
  padding: 8vh 3vw;
`;

const Title = styled.h1`
  max-width: 20em;
  text-align: center;
  text-transform: uppercase;
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-weight: 500;
  padding-bottom: 3rem;
`;
