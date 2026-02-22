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
        <PanelHeader>
          <BrandText>B R A S I K A</BrandText>
          <CloseButton onClick={handleItemClick} aria-label='Aizvērt navigāciju' />
        </PanelHeader>
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
  bottom: 0;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.gradients.nav};
  border-left: 1px solid ${theme.colors.lineSoft};
  box-shadow: ${theme.shadows.sidePanel};
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)}
    ${theme.motion.slow} ease-out forwards;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.lineSoft};
`;

const BrandText = styled.span`
  font-size: ${theme.typography.label};
  letter-spacing: 0.16rem;
  color: ${theme.semantic.text.muted};
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  width: 2.7rem;
  height: 2.7rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.semantic.border.strong};
  background: ${theme.colors.glowSoft};
  border-radius: ${theme.radii.sm};
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 1.3rem;
    height: 2px;
    background: ${theme.colors.black};
    border-radius: ${theme.radii.sm};
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:focus-visible {
    outline: 2px solid ${theme.semantic.border.strong};
    outline-offset: 2px;
  }
`;
