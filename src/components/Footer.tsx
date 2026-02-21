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
  padding-top: 3rem;
  background:
    radial-gradient(circle at 10% 0%, rgba(255, 255, 255, 0.08), transparent 32%),
    linear-gradient(160deg, #1d3d29 0%, #142d1f 100%);
  z-index: 2;
`;

const FooterInner = styled.div`
  width: min(75rem, 96vw);
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.85fr) minmax(0, 1fr);
  gap: 1.1rem;
  padding: 0 0 2rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const BrandBlock = styled.section`
  padding-right: 1rem;
`;

const BrandTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.16rem;
  font-size: clamp(1.1rem, 2.3vw, 1.65rem);
  color: ${({ theme }) => theme.colors.white};
`;

const BrandText = styled.p`
  margin-top: 0.75rem;
  max-width: 40ch;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
`;

const LinksColumn = styled.nav`
  display: grid;
  align-content: start;
  gap: 0.32rem;
`;

const LinksTitle = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.12rem;
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.35rem;
`;

const FooterLink = styled(Link)`
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: 0.86rem;
  color: rgba(255, 255, 255, 0.94);
  border-bottom: 1px solid transparent;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    border-color: rgba(255, 255, 255, 0.55);
  }
`;

const ActionCard = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(12, 25, 18, 0.3);
  padding: 1.1rem 1.05rem;
`;

const ActionTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
`;

const ActionText = styled.p`
  margin-top: 0.45rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.88);
`;

const ActionLink = styled(Link)`
  margin-top: 0.9rem;
  display: inline-block;
  padding: 0.62rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.07rem;
  font-size: 0.82rem;
  border: 1px solid rgba(255, 255, 255, 0.6);
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
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding: 0.95rem 1rem 1.1rem;
`;

const FooterText = styled.p`
  width: min(75rem, 96vw);
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.83rem;
  letter-spacing: 0.03rem;
`;
