import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import logoImage from '@assets/logo.png';
import DesktopNav from '@components/navigation/DesktopNav';
import HamburgerIcon from '@components/navigation/HamburgerIcon';
import MobileNav from '@components/navigation/MobileNav';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavBarVisible, setisNavBarVisible] = useState(true);

  const theme = useContext(ThemeContext);
  const isMobile = Boolean(theme?.isMobile);
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
      !isOpen ? 0 : 300
    );
  };

  useEffect(() => {
    handleMenuItemClick();
  }, [isMobile, pathname, handleMenuItemClick]);

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
  background: rgba(248, 248, 248, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(57, 65, 47, 0.12);
  box-shadow: 0 8px 24px rgba(23, 34, 26, 0.08);
  z-index: 6;
  position: sticky;
  top: 0;
  transform: ${({ $isNavBarVisible }) =>
    $isNavBarVisible ? 'translateY(0)' : 'translateY(-106px)'};
  transition: transform 0.3s ease-in-out;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
  width: 100%;
  max-width: ${({ theme }) => theme.width.wide};
  padding: 0.85rem 1rem;
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
  gap: 0.5rem;
  height: 100%;
`;

const BrandText = styled.span`
  font-size: 0.78rem;
  letter-spacing: 0.24rem;
  color: rgba(57, 65, 47, 0.82);
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: 480px) {
    display: none;
  }
`;
