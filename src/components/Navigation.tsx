import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../public/logo.png';

const Navigation = () => {
  return (
    <Container>
      <Nav>
        <StyledLink href='/services'>Pakalpojumi</StyledLink>
        <StyledLink href='/projects'>Projekti</StyledLink>
        <StyledLinkLogo href='/'>
          <Logo src={logoImage} alt='logo' width={120} height={70} />
        </StyledLinkLogo>
        <StyledLink href='/about'>Par mums</StyledLink>
        <StyledLink href='/contacts'>Kontakti</StyledLink>
      </Nav>
    </Container>
  );
};

export default Navigation;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  margin-top: 3rem;
  padding: 5px;
  background-color: #ededed;
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
    display: flex;
    flex-direction: column;

    img {
      display: none;
    }
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
`;

const StyledLinkLogo = styled(StyledLink)`
  height: 100%;
`;
