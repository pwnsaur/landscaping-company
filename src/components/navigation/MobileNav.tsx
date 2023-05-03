import styled, { keyframes } from 'styled-components';
import { MouseEvent } from 'react';
import NavItems from '@components/navigation/NavItems';

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
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
    transform: translateX(-100%);
    visibility: hidden;
  }
`;

type MobileNavProps = {
  isOpen: boolean;
  isVisible: boolean;
  handleItemClick: (event: MouseEvent) => void;
};

const MobileNav = ({ isOpen, isVisible, handleItemClick }: MobileNavProps) => {
  if (!isVisible) return null;

  return (
    <Container>
      <TransparentContainer onClick={handleItemClick}></TransparentContainer>
      <StyledMobileNav $isOpen={isOpen} data-testid='mobile-nav'>
        <NavItems />
      </StyledMobileNav>
    </Container>
  );
};

export default MobileNav;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TransparentContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  background-color: transparent;
`;

const StyledMobileNav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 70%;
  position: fixed;
  /* background-color: ${({ theme }) => theme.colors.background}; */
  background-color: #228b22;
  height: 100%;
  padding-top: 5rem;
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.1s ease-in-out
    forwards;
  z-index: 5;
`;
