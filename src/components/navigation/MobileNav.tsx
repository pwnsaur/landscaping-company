import styled, { keyframes } from 'styled-components';
import { MouseEvent } from 'react';
import NavItems from './NavItems';

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
  handleItemClick?: (event: MouseEvent) => void;
};

const MobileNav = ({ isOpen, isVisible, handleItemClick }: MobileNavProps) => {
  if (!isVisible) return null;

  return (
    <StyledMobileNav isOpen={isOpen}>
      <NavItems handleItemClick={handleItemClick} isOpen={isOpen} />
    </StyledMobileNav>
  );
};

export default MobileNav;

const StyledMobileNav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* height: 100vh; */
  width: 70%;
  position: fixed;
  /* top: 0; */
  /* left: 0; */
  /* background-color: ${({ theme }) => theme.colors.background}; */
  background-color: #228b22;
  /* z-index: 1; */
  height: 100%;
  padding-top: 5rem;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.2s ease-in-out
    forwards;
`;
