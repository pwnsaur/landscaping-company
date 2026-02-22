import Link from 'next/link';
import styled from 'styled-components';

import { ActionLink } from '@/components/ui/actions/primitives';
import { ContentContainer } from '@/components/ui/layout/primitives';
import { theme } from '@/styles/theme';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterInner $size='wide'>
        <BrandBlock>
          <BrandTitle>Brasika</BrandTitle>
          <BrandText>
            Ainavu darbi, kur funkcionalitate un estetika strada kopa ilgtermina.
          </BrandText>
        </BrandBlock>

        <LinksColumn>
          <LinksTitle>Lapas</LinksTitle>
          <FooterLink href='/services'>Pakalpojumi</FooterLink>
          <FooterLink href='/projects'>Projekti</FooterLink>
          <FooterLink href='/about'>Par mums</FooterLink>
          <FooterLink href='/contacts'>Kontakti</FooterLink>
        </LinksColumn>

        <ActionCard>
          <ActionTitle>Sac savu projektu</ActionTitle>
          <ActionText>
            Uzraksti mums, un sakartosim nakamo soli tavai teritorijai.
          </ActionText>
          <ActionCta href='/contacts'>Sazinaties</ActionCta>
        </ActionCard>
      </FooterInner>

      <BottomBar>
        <FooterBottom $size='wide'>
          <FooterText>Copyright {currentYear} Brasika</FooterText>
        </FooterBottom>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;
  padding-top: ${theme.spacing.xl};
  background: ${theme.gradients.footer};
  z-index: ${theme.zIndex.nav};
`;

const FooterInner = styled(ContentContainer)`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.85fr) minmax(0, 1fr);
  gap: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const BrandBlock = styled.section`
  padding-right: ${theme.spacing.md};
`;

const BrandTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.12rem;
  font-size: ${theme.typography.sectionHeading};
  color: ${theme.semantic.text.onAccent};
`;

const BrandText = styled.p`
  margin-top: ${theme.spacing.sm};
  max-width: 40ch;
  line-height: 1.7;
  color: ${theme.colors.glowSurface};
`;

const LinksColumn = styled.nav`
  display: grid;
  align-content: start;
  gap: ${theme.spacing.xxs};
`;

const LinksTitle = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.12rem;
  font-size: ${theme.typography.label};
  color: ${theme.colors.textInverseSoft};
  margin-bottom: ${theme.spacing.xxs};
`;

const FooterLink = styled(Link)`
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: 0.82rem;
  color: ${theme.colors.textInverse};
  border-bottom: 1px solid transparent;
  transition:
    color ${theme.motion.normal} ${theme.motion.easing},
    border-color ${theme.motion.normal} ${theme.motion.easing};

  &:hover {
    color: ${theme.colors.white};
    border-color: ${theme.colors.lineOnDarkStrong};
  }
`;

const ActionCard = styled.section`
  border: 1px solid ${theme.colors.lineOnDarkSoft};
  border-radius: ${theme.radii.lg};
  background: ${theme.colors.surfaceDarkSoft};
  padding: ${theme.spacing.lg} ${theme.spacing.md};
`;

const ActionTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.semantic.text.onAccent};
`;

const ActionText = styled.p`
  margin-top: ${theme.spacing.xs};
  line-height: 1.65;
  color: ${theme.colors.glowSurface};
`;

const ActionCta = styled(ActionLink).attrs({
  $variant: 'inverse',
})`
  margin-top: ${theme.spacing.sm};
`;

const BottomBar = styled.div`
  width: 100%;
  border-top: 1px solid ${theme.colors.lineOnDarkMuted};
  padding: ${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.md};
`;

const FooterBottom = styled(ContentContainer)``;

const FooterText = styled.p`
  width: 100%;
  color: ${theme.colors.textInverseMuted};
  font-size: 0.82rem;
  letter-spacing: 0.03rem;
`;
