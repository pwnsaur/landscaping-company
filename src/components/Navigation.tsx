import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';

const Navigation = () => {
  return (
    <StyledContainer>
      <StyledLink href='/projects'>Projekti</StyledLink>
      <StyledLink href='/services'>Pakalpojumi</StyledLink>
      <StyledLink href='/'>
        <StyledLogo src={Logo} alt='logo' priority />
      </StyledLink>
      <StyledLink href='/about'>Par mums</StyledLink>
      <StyledLink href='/contacts'>Kontakti</StyledLink>
    </StyledContainer>
  );
};

export default Navigation;

const StyledContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  align-items: center;
  padding: 5px;
  padding: 0 220px;
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
  height: 100%;
  font-size: 1.2rem;
`;
