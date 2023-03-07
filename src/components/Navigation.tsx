import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';

const Navigation = () => {
  return (
    <StyledContainer>
      <StyledImage src={Logo} alt='logo' priority />
      <Link href='/'>Sākums</Link>
      <Link href='/projects'>Projekti</Link>
      <Link href='/services'>Pakalpojumi</Link>
      <Link href='/about'>Par mums</Link>
      <Link href='/contacts'>Kontakti</Link>
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
