import type { Metadata } from 'next';
import styled from 'styled-components';

import { getServices } from '@/lib/contentfulData';
import ServiceCard from '@components/ServiceCard';

export const metadata: Metadata = {
  title: 'Pakalpojumi',
  description: 'Pakalpojumi',
};

const ServicesPage = async () => {
  const services = await getServices();

  return (
    <Container>
      <Title>A short description of types of services we offer to our clients</Title>
      {services.map((service, index) => (
        <ServiceCard key={service.sys.id} service={service} priority={index === 0} />
      ))}
    </Container>
  );
};

export default ServicesPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.width.wide};
  max-width: 48rem;
  padding: 8vh 3vw 18vh;
  ${({ theme }) => theme.isMobile && `padding: 6rem 2rem;`}
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
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-top: 2rem;
  padding-bottom: 3rem;
`;
