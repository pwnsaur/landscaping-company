import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../public/logo.png';

const Navigation = () => {
  return (
    <Container>
      <StyledLinkLogo href='/'>
        <Logo src={logoImage} alt='logo' width={120} height={70} />
      </StyledLinkLogo>
      <Nav>
        <StyledLink href='/'>Sākums</StyledLink>
        <StyledLink href='/services'>Pakalpojumi</StyledLink>
        <StyledLink href='/projects'>Projekti</StyledLink>
        <StyledLink href='/about'>Par mums</StyledLink>
        <StyledLink href='/contacts'>Kontakti</StyledLink>
      </Nav>
    </Container>
  );
};

export default Navigation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 5px;
  background-color: ${(props) => props.theme.colors.background};
  z-index: 1;
`;

const Logo = styled(Image)`
  height: 100%;
  width: auto;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  max-width: 768px;

  @media (max-width: 36em) {
    flex-wrap: wrap;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: black;
  text-transform: uppercase;
  height: 2rem;
  margin: auto 0;

  &:hover {
    color: #696767;
    text-decoration: underline;
  }

  @media (max-width: 36em) {
    font-size: 0.8rem;
    margin: 0.2rem 0;
  }
`;

const StyledLinkLogo = styled(StyledLink)`
  height: 100%;
  margin-bottom: 1rem;

  @media (max-width: 36em) {
    width: 100%;
    justify-content: center;
  }
`;
