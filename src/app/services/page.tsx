import type { Metadata } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import { getServices } from '@/lib/contentfulData';
import { theme } from '@/styles/theme';
import ServiceCard from '@components/ServiceCard';

export const metadata: Metadata = {
  title: 'Pakalpojumi',
  description: 'Pakalpojumi',
};

export const revalidate = 900;

const ServicesPage = async () => {
  const services = await getServices();

  return (
    <PageShell>
      <Hero>
        <Eyebrow>Pakalpojumi</Eyebrow>
        <Title>Ainavu darbi no ieceres līdz gatavam rezultātam</Title>
        <Lead>
          Plānojam, veidojam un sakārtojam teritorijas tā, lai rezultāts būtu
          estētisks, ilgtspējīgs un ērti kopjams ikdienā.
        </Lead>
      </Hero>

      {services.length > 0 ? (
        <Grid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.sys.id}
              service={service}
              priority={index < 2}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState>
          Pašlaik pakalpojumu sadaļa tiek papildināta. Uzraksti mums, un
          ieteiksim piemērotāko risinājumu tavai teritorijai.
        </EmptyState>
      )}

      <CtaPanel>
        <CtaTitle>Vajag konsultāciju pirms projekta sākuma?</CtaTitle>
        <CtaText>
          Uzraksti, un vienosimies par labāko risinājumu tavai teritorijai.
        </CtaText>
        <CtaLink href='/contacts'>Sazināties</CtaLink>
      </CtaPanel>
    </PageShell>
  );
};

export default ServicesPage;

const PageShell = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 6.5rem 1.4rem 7rem;
  background: ${theme.gradients.page};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 5.5rem 1rem 4.5rem;
  }
`;

const Hero = styled.section`
  width: min(70rem, 94vw);
  text-align: center;
  margin-bottom: 2rem;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 0.76rem;
  color: ${theme.colors.textSubtle};
  margin-bottom: 0.7rem;
`;

const Title = styled.h1`
  max-width: 44rem;
  margin: 0 auto;
  text-transform: uppercase;
  line-height: 1.14;
  font-size: clamp(1.6rem, 4.2vw, 3.15rem);
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
`;

const Lead = styled.p`
  max-width: 43rem;
  margin: 1.1rem auto 0;
  font-size: clamp(1rem, 1.5vw, 1.18rem);
  line-height: 1.7;
  color: ${theme.colors.text};
`;

const Grid = styled.section`
  width: min(75rem, 96vw);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17.5rem, 1fr));
  gap: 1rem;
`;

const EmptyState = styled.section`
  width: min(60rem, 96vw);
  text-align: center;
  line-height: 1.7;
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.lineSoft};
  background: ${theme.colors.surfaceElevatedSoft};
  padding: 1.5rem 1.2rem;
`;

const CtaPanel = styled.section`
  margin-top: 2rem;
  width: min(75rem, 96vw);
  padding: 1.8rem 1.4rem;
  text-align: center;
  border: 1px solid ${theme.colors.lineStrong};
  background: ${theme.gradients.panelDark};
  color: ${theme.colors.white};
`;

const CtaTitle = styled.h2`
  text-transform: uppercase;
  font-size: clamp(1.08rem, 2.3vw, 1.6rem);
  letter-spacing: 0.04rem;
`;

const CtaText = styled.p`
  margin: 0.7rem auto 1.2rem;
  max-width: 44ch;
  line-height: 1.6;
  color: ${theme.colors.textInverseSoft};
`;

const CtaLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.86rem;
  border: 1px solid ${theme.colors.lineOnDarkStrong};
  color: ${theme.colors.white};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.white};
    color: ${theme.colors.darkGreen};
  }
`;
