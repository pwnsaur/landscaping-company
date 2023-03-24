import { MouseEvent } from 'react';
import styled from 'styled-components';
import NavItems from './NavItems';

type MobileNavProps = {
  isOpen: boolean;
  handleItemClick?: (event: MouseEvent) => void;
};

const MobileNav = ({ isOpen, handleItemClick }: MobileNavProps) => {
  if (!isOpen) return null;

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
  height: 100vh;
  width: 70vw;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? 0 : '-70vw')};
  /* background-color: ${({ theme }) => theme.colors.background}; */
  background-color: #228b22;
  z-index: 1;
  padding-top: 1rem;
  height: 100%;
  transition: left 0.3s ease-in-out;
  padding-top: 5rem;
`;
