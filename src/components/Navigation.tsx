import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../public/logo.png';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';
import useIsMobile from '@/utils/hooks/useIsMobile';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  // useEffect(() => {
  //   document.body.style.overflow = isOpen ? 'hidden' : '';
  // }, [isOpen]);

  return (
    <Container>
      <Header>
        {isMobile && (
          <Hamburger onClick={toggleMenu} isOpen={isOpen}>
            {isOpen ? 'X' : 'B'}
          </Hamburger>
        )}
        <LinkLogo href='/'>
          <Logo src={logoImage} alt='logo' width={120} height={70} />
        </LinkLogo>
        {!isMobile ? (
          <DesktopNav />
        ) : (
          <MobileNav
            isVisible={isVisible}
            isOpen={isOpen}
            handleItemClick={handleMenuItemClick}
          />
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
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 768px;
  ${({ theme }) => !theme.isMobile && `flex-direction: column;`}
`;

const Hamburger = styled.button<{ isOpen: boolean }>`
  display: block;
  background: none;
  border: none;
  font-size: 1.5rem;
  margin: 1rem 2rem;
  font-weight: 1000;
  cursor: pointer;
  z-index: 3;
  position: ${({ isOpen }) => isOpen && 'fixed'};
  top: ${({ isOpen }) => isOpen && '1.5rem'};
`;

const Logo = styled(Image)`
  height: 100%;
  width: auto;
`;

const LinkLogo = styled(Link)`
  display: flex;
  height: 100%;
  margin: 1rem auto 2rem;

  ${({ theme }) =>
    theme.isMobile &&
    `
      width: 100%;
      justify-content: end;
      margin-right: 1rem;
  `}
`;
