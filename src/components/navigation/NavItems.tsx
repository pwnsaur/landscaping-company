import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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
  font-size: 1rem;
  color: black;
  text-transform: uppercase;
  height: 2rem;
  margin: auto 0;

  &:hover {
    color: #696767;
    text-decoration: underline;
  }

  @media (max-width: 40em) {
    font-size: 0.8rem;
  }
`;
