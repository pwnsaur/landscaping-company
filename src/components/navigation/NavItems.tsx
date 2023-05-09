import Link from 'next/link';
import styled from 'styled-components';

const NavItems = () => {
  return (
    <>
      <StyledLink href='/'>Sākums</StyledLink>
      <StyledLink href='/services'>Pakalpojumi</StyledLink>
      <StyledLink href='/projects'>Projekti</StyledLink>
      <StyledLink href='/about'>Par mums</StyledLink>
      <StyledLink href='/contacts'>Kontakti</StyledLink>
    </>
  );
};

export default NavItems;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.larger};
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  height: 4rem;
  padding: 0 1rem;
  white-space: nowrap;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.grey};
  }
`;
