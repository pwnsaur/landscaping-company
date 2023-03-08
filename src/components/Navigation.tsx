import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';

const Navigation = () => {
  return (
    <StyledContainer>
      <StyledImage src={Logo} alt='logo' priority />
      <StyledLink href='/'>Sākums</StyledLink>
      <StyledLink href='/projects'>Projekti</StyledLink>
      <StyledLink href='/services'>Pakalpojumi</StyledLink>
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
  width: 100%;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  padding: 5px;
  padding-right: 100px;
  background-color: white;
  z-index: 1;
`;

const StyledImage = styled(Image)`
  max-height: 100%;
  width: auto;
`;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
`;
