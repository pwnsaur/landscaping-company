import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import logoImage from '@assets/logo.png';
import DesktopNav from '@components/navigation/DesktopNav';
import HamburgerIcon from '@components/navigation/HamburgerIcon';
import MobileNav from '@components/navigation/MobileNav';
import useIsMobile from '@utils/hooks/useIsMobile';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isMobile = useIsMobile();
  const router = useRouter();

  const handleMenuItemClick = useCallback(() => {
    setIsOpen(false);
    setIsVisible(false);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setTimeout(
      () => {
        setIsVisible(!isOpen);
      },
      !isOpen ? 0 : 100
    );
  };

  useEffect(() => {
    const handleRouteChange = () => handleMenuItemClick();
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events, handleMenuItemClick]);

  useEffect(() => {
    handleMenuItemClick();
  }, [isMobile, handleMenuItemClick]);

  // useEffect(() => {
  //   document.body.style.overflow = isOpen ? 'hidden' : '';
  // }, [isOpen]);

  return (
    <Container>
      <Header>
        {isMobile && <HamburgerIcon isOpen={isOpen} onClick={toggleMenu} />}
        {/* <LinkLogo href='/'>
          <Logo src={logoImage} alt='logo' width={120} height={70} priority />
        </LinkLogo> */}
        {isMobile ? (
          <MobileNav
            isVisible={isVisible}
            isOpen={isOpen}
            handleItemClick={handleMenuItemClick}
          />
        ) : (
          <DesktopNav />
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
  z-index: 3;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.width.normal};
  ${({ theme }) => theme.isMobile && `flex-direction: row;`}
  ${({ theme }) => theme.isMobile && `height: 0`}
`;

const Logo = styled(Image)`
  height: 100%;
  width: auto;
`;

const LinkLogo = styled(Link)`
  display: flex;
  height: 100%;
  margin: 1rem auto 1rem;

  ${({ theme }) =>
    theme.isMobile &&
    `
      width: 100%;
      justify-content: end;
      margin-right: 1rem;
  `}
`;
