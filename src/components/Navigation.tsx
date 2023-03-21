import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../public/logo.png';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';
import useDeviceType from '@/utils/hooks/useDeviceType';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isOnMobile, isOnDesktop } = useDeviceType();
  console.log(isOnMobile, isOnDesktop);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <Header>
        <Hamburger onClick={toggleMenu}>{isOpen ? 'X' : 'B'}</Hamburger>
        <LinkLogo href='/'>
          <Logo src={logoImage} alt='logo' width={120} height={70} />
        </LinkLogo>
        {isOnDesktop && <DesktopNav />}
        {isOnMobile && (
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

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  margin: 1rem 2rem;
  font-weight: 1000;
  z-index: 2;

  @media (max-width: 40em) {
    display: block;
  }
`;

const Logo = styled(Image)`
  height: 100%;
  width: auto;
`;

const LinkLogo = styled(Link)`
  display: flex;
  height: 100%;
  margin: 1rem auto 2rem;

  @media (max-width: 40em) {
    width: 100%;
    justify-content: end;
    margin-right: 1rem;
  }
`;
