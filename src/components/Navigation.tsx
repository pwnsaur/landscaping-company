import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';

const Navigation = () => {
  return (
    <StyledContainer>
      <StyledLink href='/services'>Pakalpojumi</StyledLink>
      <StyledLink href='/projects'>Projekti</StyledLink>
      <StyledLinkLogo href='/'>
        <StyledLogo src={Logo} alt='logo' unoptimized />
      </StyledLinkLogo>
      <StyledLink href='/about'>Par mums</StyledLink>
      <StyledLink href='/contacts'>Kontakti</StyledLink>
    </StyledContainer>
  );
};

export default Navigation;

const StyledContainer = styled.div`
  /* position: sticky;
  top: 0; */
  display: flex;
  justify-content: space-between;
  width: 70%;
  max-width: 768px;
  height: 70px;
  align-items: center;
  margin-top: 40px;
  padding: 5px;
  background-color: #ededed;
  z-index: 1;
`;
const StyledLogo = styled(Image)`
  height: 100%;
  width: auto;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: black;
  text-transform: uppercase;

  &:hover:not(:active) {
    color: #696767;
    text-decoration: underline;
  }
`;

const StyledLinkLogo = styled(StyledLink)`
  height: 100%;
`;
