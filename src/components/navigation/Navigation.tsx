import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  const isMobile = useIsMobile();
  const pathname = usePathname();
  const currentPath = pathname || '/';

  const [startUpwardsScrollPos, setStartUpwardsScrollPos] = useState<
    number | null
  >(null);

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
      !isOpen ? 0 : 300,
    );
  };

  useEffect(() => {
    handleMenuItemClick();
  }, [isMobile, pathname, handleMenuItemClick]);

  useEffect(() => {
    if (!isMobile && (isOpen || isVisible)) {
      setIsOpen(false);
      setIsVisible(false);
    }
  }, [isMobile, isOpen, isVisible]);

  //navbar hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos <= 100) {
        setIsNavBarVisible(true);
        setStartUpwardsScrollPos(null);
      } else if (prevScrollPos > currentScrollPos) {
        if (startUpwardsScrollPos === null) {
          setStartUpwardsScrollPos(prevScrollPos);
        } else if (startUpwardsScrollPos - currentScrollPos >= 100) {
          setIsNavBarVisible(true);
          setStartUpwardsScrollPos(null);
        }
      } else if (prevScrollPos < currentScrollPos) {
        setIsNavBarVisible(false);
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
    <Container $isNavBarVisible={isNavBarVisible}>
      <Header>
        <BrandRow>
          {isMobile && <HamburgerIcon isOpen={isOpen} onClick={toggleMenu} />}
          <LinkLogo href='/'>
            <Logo
              src={logoImage}
              alt='logo'
              width={120}
              height={70}
              style={{ width: 'auto', height: 'auto' }}
              quality={50}
              sizes='120px'
              priority
            />
            <BrandText>B R A S I K A</BrandText>
          </LinkLogo>
        </BrandRow>
        {!isMobile && <DesktopNav currentPath={currentPath} />}
      </Header>
      {isMobile && (
        <MobileNav
          currentPath={currentPath}
          isVisible={isVisible}
          isOpen={isOpen}
          handleItemClick={handleMenuItemClick}
        />
      )}
    </Container>
  );
};

export default Navigation;

const Container = styled.div<{ $isNavBarVisible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.gradients.nav};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.semantic.border.subtle};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  z-index: ${({ theme }) => theme.zIndex.nav};
  position: sticky;
  top: 0;
  transform: ${({ $isNavBarVisible, theme }) =>
    $isNavBarVisible
      ? 'translateY(0)'
      : `translateY(${theme.layout.nav.hiddenOffset})`};
  transition: transform ${({ theme }) => theme.motion.slow}
    ${({ theme }) => theme.motion.easingEmphasized};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.container.wide};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Image)`
  height: auto;
  width: auto;
`;

const LinkLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 100%;
`;

const BrandText = styled.span`
  font-size: ${({ theme }) => theme.typography.label};
  letter-spacing: ${({ theme }) => theme.components.nav.brandTracking};
  color: ${({ theme }) => theme.semantic.text.muted};
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    display: none;
  }
`;
