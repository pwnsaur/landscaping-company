import Link from 'next/link';
import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterInner>
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
          <ActionLink href='/contacts'>Sazinaties</ActionLink>
        </ActionCard>
      </FooterInner>

      <BottomBar>
        <FooterText>Copyright {currentYear} Brasika</FooterText>
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
  margin: auto 0 0;
  padding-top: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.gradients.footer};
  z-index: 2;
`;

const FooterInner = styled.div`
  width: min(75rem, 96vw);
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.85fr) minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const BrandBlock = styled.section`
  padding-right: ${({ theme }) => theme.spacing.md};
`;

const BrandTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.16rem;
  font-size: clamp(1.1rem, 2.3vw, 1.65rem);
  color: ${({ theme }) => theme.colors.white};
`;

const BrandText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  max-width: 40ch;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.glowSurface};
`;

const LinksColumn = styled.nav`
  display: grid;
  align-content: start;
  gap: 0.32rem;
`;

const LinksTitle = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.12rem;
  font-size: ${({ theme }) => theme.typography.label};
  color: ${({ theme }) => theme.colors.textInverseSoft};
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

const FooterLink = styled(Link)`
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: 0.86rem;
  color: ${({ theme }) => theme.colors.textInverse};
  border-bottom: 1px solid transparent;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.lineOnDarkStrong};
  }
`;

const ActionCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.lineOnDarkSoft};
  background: ${({ theme }) => theme.colors.surfaceDarkSoft};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
`;

const ActionTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
`;

const ActionText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.glowSurface};
`;

const ActionLink = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  text-transform: uppercase;
  letter-spacing: 0.07rem;
  font-size: 0.82rem;
  border: 1px solid ${({ theme }) => theme.colors.lineOnDarkStrong};
  color: ${({ theme }) => theme.colors.white};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.darkGreen};
  }
`;

const BottomBar = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.lineOnDarkMuted};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.md}`};
`;

const FooterText = styled.p`
  width: min(75rem, 96vw);
  color: ${({ theme }) => theme.colors.textInverseMuted};
  font-size: 0.83rem;
  letter-spacing: 0.03rem;
`;
