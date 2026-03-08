import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { media } from '@/styles/media';
import { theme } from '@/styles/theme';
import logoImage from '@assets/logo.png';
import DesktopNav from '@components/navigation/DesktopNav';
import HamburgerIcon from '@components/navigation/HamburgerIcon';
import MobileNav from '@components/navigation/MobileNav';
import useBodyScrollLock from '@utils/hooks/useBodyScrollLock';
import useIsMobile from '@utils/hooks/useIsMobile';

const MOBILE_NAV_ANIMATION_MS = 300;
const NAV_VISIBILITY_SCROLL_THRESHOLD = 100;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);
  const menuVisibilityTimeoutRef = useRef<number | null>(null);
  const prevScrollPosRef = useRef(0);
  const startUpwardsScrollPosRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const currentPath = pathname || '/';

  useBodyScrollLock(isOpen);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (!isMobile && isOpen) {
      closeMenu();
    }
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (menuVisibilityTimeoutRef.current !== null) {
      window.clearTimeout(menuVisibilityTimeoutRef.current);
      menuVisibilityTimeoutRef.current = null;
    }

    if (isOpen) {
      setIsVisible(true);
      return;
    }

    menuVisibilityTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      menuVisibilityTimeoutRef.current = null;
    }, MOBILE_NAV_ANIMATION_MS);

    return () => {
      if (menuVisibilityTimeoutRef.current !== null) {
        window.clearTimeout(menuVisibilityTimeoutRef.current);
        menuVisibilityTimeoutRef.current = null;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const prevScrollPos = prevScrollPosRef.current;
      const startUpwardsScrollPos = startUpwardsScrollPosRef.current;

      if (currentScrollPos <= NAV_VISIBILITY_SCROLL_THRESHOLD) {
        setIsNavBarVisible(true);
        startUpwardsScrollPosRef.current = null;
      } else if (currentScrollPos < prevScrollPos) {
        if (startUpwardsScrollPos === null) {
          startUpwardsScrollPosRef.current = prevScrollPos;
        } else if (
          startUpwardsScrollPos - currentScrollPos >= NAV_VISIBILITY_SCROLL_THRESHOLD
        ) {
          setIsNavBarVisible(true);
          startUpwardsScrollPosRef.current = null;
        }
      } else if (currentScrollPos > prevScrollPos) {
        setIsNavBarVisible(false);
        startUpwardsScrollPosRef.current = null;
      }

      prevScrollPosRef.current = currentScrollPos;
    };

    prevScrollPosRef.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Container $isNavBarVisible={isNavBarVisible}>
        <Header>
          <BrandRow>
            <HamburgerWrapper>
              <HamburgerIcon isOpen={isOpen} onClick={toggleMenu} />
            </HamburgerWrapper>
            <LinkLogo href='/'>
              <Logo
                src={logoImage.src}
                alt='logo'
                width={120}
                height={70}
                decoding='async'
              />
              <BrandText>B R A S I K A</BrandText>
            </LinkLogo>
          </BrandRow>
          <DesktopNav currentPath={currentPath} />
        </Header>
      </Container>
      <MobileNav
        currentPath={currentPath}
        isVisible={isVisible}
        isOpen={isOpen}
        onClose={closeMenu}
      />
    </>
  );
};

export default Navigation;

const Container = styled.div<{ $isNavBarVisible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${theme.gradients.nav};
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${theme.semantic.border.subtle};
  z-index: ${theme.zIndex.nav};
  position: sticky;
  top: 0;
  transform: ${({ $isNavBarVisible }) =>
    $isNavBarVisible
      ? 'translateY(0)'
      : `translateY(${theme.layout.nav.hiddenOffset})`};
  transition: transform ${theme.motion.slow} ${theme.motion.easingEmphasized};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  width: 100%;
  max-width: ${theme.layout.container.wide};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
`;

const HamburgerWrapper = styled.div`
  display: none;

  ${media.down('tablet')`
    display: flex;
  `}
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  flex-shrink: 0;
`;

const LinkLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  height: 100%;
`;

const BrandText = styled.span`
  font-size: ${theme.typography.label};
  letter-spacing: 0.16rem;
  color: ${theme.semantic.text.muted};
  text-transform: uppercase;
  white-space: nowrap;

  ${media.down('xs')`
    display: none;
  `}
`;
