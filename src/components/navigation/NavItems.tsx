import Link from 'next/link';
import styled from 'styled-components';
import { MouseEvent } from 'react';

type NavItemsProps = {
  handleItemClick?: (event: MouseEvent) => void;
  isOpen?: boolean;
};

const NavItems = ({ handleItemClick }: NavItemsProps) => {
  return (
    <>
      <StyledLink href='/' onClick={handleItemClick}>
        Sākums
      </StyledLink>
      <StyledLink href='/services' onClick={handleItemClick}>
        Pakalpojumi
      </StyledLink>
      <StyledLink href='/projects' onClick={handleItemClick}>
        Projekti
      </StyledLink>
      <StyledLink href='/about' onClick={handleItemClick}>
        Par mums
      </StyledLink>
      <StyledLink href='/contacts' onClick={handleItemClick}>
        Kontakti
      </StyledLink>
    </>
  );
};

export default NavItems;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: black;
  text-transform: uppercase;
  height: 4rem;
  margin: 1rem 0;
  padding: 0 1rem;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #696767;
    text-decoration: none;
  }
`;
