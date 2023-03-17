import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../public/logo.png';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <Header>
        <StyledHamburger isOpen={isOpen} onClick={toggleMenu}>
          {isOpen ? 'X' : 'NAV'}
        </StyledHamburger>
        <StyledLinkLogo href='/'>
          <Logo src={logoImage} alt='logo' width={120} height={70} />
        </StyledLinkLogo>
        <DesktopNav />
        {isOpen && (
          <MobileNav isOpen={isOpen} handleItemClick={handleMenuItemClick} />
        )}
      </Header>
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
  background-color: ${(props) => props.theme.colors.background};
  z-index: 1;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 768px;

  @media (min-width: 40em) {
    flex-direction: column;
  }
`;

const StyledHamburger = styled.button<{ isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 1rem 2rem;
  font-weight: 1000;
  z-index: ${(props) => (props.isOpen ? 101 : 1)};

  @media (max-width: 40em) {
    display: block;
  }
`;

const Logo = styled(Image)`
  height: 100%;
  width: auto;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1rem;
  text-transform: uppercase;
  height: 2rem;
  margin: auto 0;

  &:hover {
    color: #696767;
    text-decoration: underline;
  }

  @media (max-width: 40em) {
    font-size: 0.8rem;
  }
`;

const StyledLinkLogo = styled(StyledLink)`
  height: 100%;
  margin: 1rem auto 2rem;

  @media (max-width: 40em) {
    width: 100%;
    justify-content: end;
    margin-right: 1rem;
  }
`;
