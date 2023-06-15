import { motion } from 'framer-motion';
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
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavBarVisible, setisNavBarVisible] = useState(true);

  const [startUpwardsScrollPos, setStartUpwardsScrollPos] = useState<
    number | null
  >(null);

  const isMobile = useIsMobile();
  const router = useRouter();

  //mobile menu
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
      !isOpen ? 0 : 300
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

  //navbar hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos <= 100) {
        setisNavBarVisible(true);
        setStartUpwardsScrollPos(null);
      } else if (prevScrollPos > currentScrollPos) {
        if (startUpwardsScrollPos === null) {
          setStartUpwardsScrollPos(prevScrollPos);
        } else if (startUpwardsScrollPos - currentScrollPos >= 100) {
          setisNavBarVisible(true);
          setStartUpwardsScrollPos(null);
        }
      } else if (prevScrollPos < currentScrollPos) {
        setisNavBarVisible(false);
        setStartUpwardsScrollPos(null);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, startUpwardsScrollPos]);

  //scrollbar compensation
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [isOpen]);

  return (
    <Container
      initial={{ y: 0 }}
      animate={{ y: isNavBarVisible ? 0 : -142 }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
    >
      <Header>
        {isMobile && <HamburgerIcon isOpen={isOpen} onClick={toggleMenu} />}
        <LinkLogo href='/'>
          <Logo
            src={logoImage}
            alt='logo'
            width={120}
            height={70}
            quality={50}
            priority
          />
        </LinkLogo>
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

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 3;
  position: sticky;
  top: 0;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.width.normal};
  ${({ theme }) => theme.isMobile && `flex-direction: row;`};
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
