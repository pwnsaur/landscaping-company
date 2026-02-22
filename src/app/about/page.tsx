import type { Metadata } from 'next';
import Image from 'next/image';
import styled from 'styled-components';

import cato from '@/assets/cato.jpg';
import { ActionLink } from '@/components/ui/actions/primitives';
import {
  CardGrid,
  ContentContainer,
  PageShell,
  PlainSection,
} from '@/components/ui/layout/primitives';
import { MediaFrame, MutedPanel, SoftPanel } from '@/components/ui/surfaces/primitives';
import {
  BodyText,
  DisplayTitle,
  Eyebrow as SharedEyebrow,
  FeatureTitle,
  LeadText,
  SectionTitle as SharedSectionTitle,
  SectionText as SharedSectionText,
} from '@/components/ui/typography/primitives';
import { theme } from '@/styles/theme';

export const metadata: Metadata = {
  title: 'Par mums',
  description: 'Par mums',
};

const AboutPage = () => {
  return (
    <PageShell $surface='page'>
      <ContentContainer $size='wide'>
        <Hero>
          <HeroMedia>
            <StyledImage
              src={cato}
              alt='komandas darbs objekta'
              fill
              priority
              quality={85}
              sizes='(max-width: 920px) 94vw, 44vw'
              placeholder='empty'
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
              <ActionLink href='/contacts' $variant='primary'>
                Sazinaties
              </ActionLink>
              <ActionLink href='/projects' $variant='outline'>
                Skatit projektus
              </ActionLink>
            </Actions>
          </HeroContent>
        </Hero>
      </ContentContainer>

      <ContentContainer $size='wide'>
        <PlainSection $mt='6rem'>
          <AboutCardGrid $min='18rem'>
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
          </AboutCardGrid>
        </PlainSection>
      </ContentContainer>

      <ContentContainer $size='wide'>
        <PlainSection $mt='5rem'>
          <ValuesTitle>Principi, pie kuriem turamies</ValuesTitle>
          <AboutCardGrid $min='16rem'>
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
          </AboutCardGrid>
        </PlainSection>
      </ContentContainer>
    </PageShell>
  );
};

export default AboutPage;

const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 1.6rem;
  align-items: stretch;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const HeroMedia = styled(MediaFrame)`
  width: 100%;
  aspect-ratio: 5 / 6;
  min-height: 28rem;
  background: ${theme.colors.surfaceElevatedMuted};

  @media (max-width: ${theme.breakpoints.lg}) {
    aspect-ratio: 4 / 5;
    min-height: 16rem;
  }
`;

const HeroContent = styled(SoftPanel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 2.4rem;
`;

const Eyebrow = styled(SharedEyebrow)``;

const Title = styled(DisplayTitle)``;

const Lead = styled(LeadText)`
  margin-top: 1.1rem;
  max-width: 52ch;
`;

const Actions = styled.div`
  margin-top: 1.8rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AboutCardGrid = styled(CardGrid)`
  gap: 1.9rem;
`;

const SectionCard = styled(MutedPanel)`
  display: block;
`;

const SectionTitle = styled(SharedSectionTitle)``;

const SectionText = styled(SharedSectionText)`
  margin-top: 1rem;
  line-height: 1.7;
`;

const ValuesTitle = styled(SharedSectionTitle)`
  margin-bottom: 1.1rem;
`;

const ValueCard = styled(SoftPanel)`
  padding: 2rem 1.6rem;
`;

const ValueName = styled(FeatureTitle)``;

const ValueText = styled(BodyText)`
  margin-top: 0.6rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`;
