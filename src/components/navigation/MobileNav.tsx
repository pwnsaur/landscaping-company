import { MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';

import NavItems from '@components/navigation/NavItems';

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
    visibility: visible;
  }
  100% {
    transform: translateX(100%);
    visibility: hidden;
  }
`;

type MobileNavProps = {
  isOpen: boolean;
  isVisible: boolean;
  currentPath: string;
  handleItemClick: (event: MouseEvent) => void;
};

const MobileNav = ({
  isOpen,
  isVisible,
  currentPath,
  handleItemClick,
}: MobileNavProps) => {
  if (!isVisible) return null;

  return (
    <Container>
      <Backdrop onClick={handleItemClick} />
      <StyledMobileNav $isOpen={isOpen} data-testid='mobile-nav'>
        <PanelTitle>Navigācija</PanelTitle>
        <NavItems
          currentPath={currentPath}
          isMobile
          onItemClick={handleItemClick}
        />
      </StyledMobileNav>
    </Container>
  );
};

export default MobileNav;

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 7;
`;

const Backdrop = styled.div`
  flex-grow: 1;
  height: 100%;
  background-color: rgba(3, 11, 8, 0.42);
  backdrop-filter: blur(2px);
`;

const StyledMobileNav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: min(23.5rem, 82vw);
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  padding: 5.7rem 1rem 1.3rem;
  background: linear-gradient(170deg, rgba(252, 252, 252, 0.98) 0%, #ececec 100%);
  border-left: 1px solid rgba(57, 65, 47, 0.22);
  box-shadow: -18px 0 42px rgba(13, 22, 16, 0.2);
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.27s ease-out
    forwards;
`;

const PanelTitle = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.16rem;
  font-size: 0.72rem;
  color: rgba(57, 65, 47, 0.72);
  margin-bottom: 0.95rem;
`;
