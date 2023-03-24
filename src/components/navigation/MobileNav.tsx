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
    <StyledMobileNav>
      <NavItems handleItemClick={handleItemClick} isOpen={isOpen} />
    </StyledMobileNav>
  );
};

export default MobileNav;

const StyledMobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  background-color: green;

  z-index: 1;
  padding-top: 1rem;
`;
