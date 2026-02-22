import { MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';

import NavItems from '@components/navigation/NavItems';
import { theme } from '@/styles/theme';

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
  z-index: ${theme.zIndex.overlay};
`;

const Backdrop = styled.div`
  flex-grow: 1;
  height: 100%;
  background-color: ${theme.colors.overlayBackdrop};
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
  padding: ${theme.layout.nav.mobilePanelTopOffset} ${theme.spacing.md} ${theme.spacing.md};
  background: ${theme.gradients.nav};
  border-left: 1px solid ${theme.colors.lineSoft};
  box-shadow: ${theme.shadows.sidePanel};
  animation: ${({ $isOpen }) => $isOpen ? slideIn : slideOut}
    ${theme.motion.slow} ease-out forwards;
`;

const PanelTitle = styled.p`
  text-transform: uppercase;
  letter-spacing: ${theme.typography.eyebrowTracking};
  font-size: ${theme.typography.label};
  color: ${theme.colors.textMuted};
  margin-bottom: ${theme.spacing.sm};
`;
