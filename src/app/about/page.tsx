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
        <PlainSection $mt={theme.components.about.heroToSectionsTop}>
          <AboutCardGrid $min={theme.components.about.sectionCardMinWidth}>
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
        <PlainSection $mt={theme.components.about.betweenSectionsTop}>
          <ValuesTitle>Principi, pie kuriem turamies</ValuesTitle>
          <AboutCardGrid $min={theme.components.about.valueCardMinWidth}>
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
  gap: ${theme.components.about.heroGap};
  align-items: stretch;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const HeroMedia = styled(MediaFrame)`
  width: 100%;
  aspect-ratio: ${theme.components.about.heroMediaAspect};
  min-height: ${theme.components.about.heroMediaMinHeight};
  background: ${theme.colors.surfaceElevatedMuted};

  @media (max-width: ${theme.breakpoints.lg}) {
    aspect-ratio: ${theme.components.about.heroMediaAspectCompact};
    min-height: ${theme.components.about.heroMediaMinHeightCompact};
  }
`;

const HeroContent = styled(SoftPanel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: ${theme.components.about.heroPanelPadding};
`;

const Eyebrow = styled(SharedEyebrow)``;

const Title = styled(DisplayTitle)`
  text-transform: uppercase;
`;

const Lead = styled(LeadText)`
  margin-top: ${theme.components.about.leadTop};
  max-width: 52ch;
`;

const Actions = styled.div`
  margin-top: ${theme.components.about.actionsTop};
  display: flex;
  gap: ${theme.components.about.actionsGap};
  flex-wrap: wrap;
`;

const AboutCardGrid = styled(CardGrid)`
  gap: ${theme.components.about.sectionGap};
`;

const SectionCard = styled(MutedPanel)`
  display: block;
`;

const SectionTitle = styled(SharedSectionTitle)``;

const SectionText = styled(SharedSectionText)`
  margin-top: ${theme.components.about.sectionTextTop};
  line-height: 1.7;
`;

const ValuesTitle = styled(SharedSectionTitle)`
  letter-spacing: ${theme.typography.trackingWide};
  margin-bottom: ${theme.components.about.valuesTitleBottom};
`;

const ValueCard = styled(SoftPanel)`
  padding: ${theme.components.about.valueCardPadding};
`;

const ValueName = styled(FeatureTitle)``;

const ValueText = styled(BodyText)`
  margin-top: ${theme.components.about.valueTextTop};
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`;
