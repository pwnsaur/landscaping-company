import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import cato from '@/assets/cato.jpg';
import { theme } from '@/styles/theme';

export const metadata: Metadata = {
  title: 'Par mums',
  description: 'Par mums',
};

const AboutPage = () => {
  return (
    <PageShell>
      <Hero>
        <HeroMedia>
          <StyledImage
            src={cato}
            alt='komandas darbs objekta'
            fill
            priority
            quality={75}
            sizes='(max-width: 920px) 94vw, 44vw'
          />
        </HeroMedia>

        <HeroContent>
          <Eyebrow>Par mums</Eyebrow>
          <Title>Ainavu komanda ar konkretu, uzturamu rezultatu</Title>
          <Lead>
            Mes planojam, ierikojam un attistam teritorijas ta, lai vide butu
            estetikiski skaidra, ikdiena erta un viegli uzturama ilgtermina.
          </Lead>
          <Actions>
            <PrimaryLink href='/contacts'>Sazinaties</PrimaryLink>
            <SecondaryLink href='/projects'>Skatit projektus</SecondaryLink>
          </Actions>
        </HeroContent>
      </Hero>

      <Sections>
        <SectionCard>
          <SectionTitle>Ko mes daram</SectionTitle>
          <SectionText>
            No pirmas idejas lidz realizacijai: teritorijas planosana,
            apstadijumi, segumi, maza arhitektura un pabeigts kopskats bez
            liekas sarezgitibas.
          </SectionText>
        </SectionCard>

        <SectionCard>
          <SectionTitle>Ka mes stradajam</SectionTitle>
          <SectionText>
            Sakam ar vietas novertejumu, tad veidojam skaidru darbu secibu un
            budzetam atbilstosu risinajumu. Katrs solis tiek saskanos ar klientu
            pirms nakama etapa.
          </SectionText>
        </SectionCard>
      </Sections>

      <Values>
        <ValuesTitle>Principi, pie kuriem turamies</ValuesTitle>
        <ValuesGrid>
          <ValueCard>
            <ValueName>Praktiskums</ValueName>
            <ValueText>
              Dizains nav tikai skats. Katrs lemums tiek pienemts pec realas
              lietosanas un uzturesanas vajadzibam.
            </ValueText>
          </ValueCard>
          <ValueCard>
            <ValueName>Kvalitate</ValueName>
            <ValueText>
              Izvelamies materialus un tehniskos risinajumus, kas strada
              ilgtermina, nevis tikai pirmaja sezona.
            </ValueText>
          </ValueCard>
          <ValueCard>
            <ValueName>Skaidra sadarbiba</ValueName>
            <ValueText>
              Klients vienmer zina, kas tiek darits, kada seciba un kads ir
              sagaidamais rezultats katra etapa.
            </ValueText>
          </ValueCard>
        </ValuesGrid>
      </Values>
    </PageShell>
  );
};

export default AboutPage;

const PageShell = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 6.5rem 1.2rem 6rem;
  background:
    radial-gradient(circle at 14% 0%, rgba(33, 65, 42, 0.18), transparent 35%),
    radial-gradient(circle at 86% 14%, rgba(57, 65, 47, 0.12), transparent 33%),
    linear-gradient(180deg, #f3f3f3 0%, #ededed 100%);

  @media (max-width: 768px) {
    padding: 5.5rem 1rem 4.5rem;
  }
`;

const Hero = styled.section`
  display: flex;
  width: min(75rem, 96vw);
  gap: 1.2rem;
  align-items: stretch;
  margin-bottom: 2rem;

  @media (max-width: 920px) {
    flex-direction: column;
  }
`;

const HeroMedia = styled.div`
  position: relative;
  flex: 1;
  min-height: 28rem;
  border: 1px solid rgba(57, 65, 47, 0.16);
  overflow: hidden;
  box-shadow: 0 20px 46px rgba(22, 33, 25, 0.12);

  @media (max-width: 920px) {
    min-height: 16rem;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 1.6rem;
  border: 1px solid rgba(57, 65, 47, 0.16);
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, #f4f4f4 100%);
  box-shadow: 0 18px 38px rgba(21, 31, 24, 0.08);
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 0.76rem;
  color: rgba(57, 65, 47, 0.72);
  margin-bottom: 0.7rem;
`;

const Title = styled.h1`
  text-transform: uppercase;
  line-height: 1.12;
  font-size: clamp(1.55rem, 4vw, 3rem);
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
`;

const Lead = styled.p`
  margin-top: 1rem;
  line-height: 1.7;
  font-size: clamp(1rem, 1.45vw, 1.15rem);
  color: ${theme.colors.text};
  max-width: 52ch;
`;

const Actions = styled.div`
  margin-top: 1.3rem;
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
`;

const PrimaryLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.07rem;
  font-size: 0.84rem;
  background: ${theme.colors.darkGreen};
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.darkGreen};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(28, 54, 37, 0.18);
  }
`;

const SecondaryLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.07rem;
  font-size: 0.84rem;
  border: 1px solid rgba(33, 65, 42, 0.5);
  color: ${theme.colors.darkGreen};
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(33, 65, 42, 0.08);
  }
`;

const Sections = styled.section`
  width: min(75rem, 96vw);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SectionCard = styled.article`
  border: 1px solid rgba(57, 65, 47, 0.16);
  background: rgba(255, 255, 255, 0.75);
  padding: 1.35rem 1.25rem;
`;

const SectionTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: clamp(1.05rem, 2.1vw, 1.55rem);
  color: ${theme.colors.title};
`;

const SectionText = styled.p`
  margin-top: 0.65rem;
  line-height: 1.7;
  color: ${theme.colors.text};
`;

const Values = styled.section`
  width: min(75rem, 96vw);
`;

const ValuesTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: clamp(1.15rem, 2.4vw, 1.8rem);
  color: ${theme.colors.title};
  margin-bottom: 0.8rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
`;

const ValueCard = styled.article`
  border: 1px solid rgba(57, 65, 47, 0.16);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, #f4f4f4 100%);
  padding: 1.25rem 1.2rem;
`;

const ValueName = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: 0.95rem;
  color: ${theme.colors.darkGreen};
`;

const ValueText = styled.p`
  margin-top: 0.55rem;
  line-height: 1.65;
  color: ${theme.colors.text};
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;
