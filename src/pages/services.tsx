import ServiceCard from '@components/ServiceCard';
import { getStaticPropsPage } from '@pages/api/getStaticPropsPage';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

import { TypeService } from '@/types/contentfulTypes';

export const getStaticProps = getStaticPropsPage('service');

const Services = ({ services }: { services: TypeService[] }) => {
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
        {services.map((service, index) => (
          <ServiceCard
            key={service.sys.id}
            service={service}
            priority={index === 0}
          />
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
  max-width: ${({ theme }) => theme.width.wide};
  max-width: 48rem;
  padding: 8vh 3vw;
`;

const Title = styled.h1`
  max-width: ${({ theme }) => theme.width.narrow};
  text-align: center;
  text-transform: uppercase;
  font-size: ${({ theme }) => `
    clamp(${theme.normalClamp.min},
      ${theme.normalClamp.preferred},
      ${theme.normalClamp.max})
  `};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  padding-bottom: 3rem;
`;
