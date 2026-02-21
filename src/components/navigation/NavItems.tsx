import Link from 'next/link';
import { MouseEvent } from 'react';
import styled from 'styled-components';

type NavItemsProps = {
  currentPath: string;
  isMobile?: boolean;
  onItemClick?: (event: MouseEvent<HTMLElement>) => void;
};

const links = [
  { href: '/', label: 'Sākums' },
  { href: '/services', label: 'Pakalpojumi' },
  { href: '/projects', label: 'Projekti' },
  { href: '/about', label: 'Par mums' },
  { href: '/contacts', label: 'Kontakti' },
];

const isActivePath = (currentPath: string, href: string) => {
  if (href === '/') {
    return currentPath === '/';
  }

  return currentPath.startsWith(href);
};

const NavItems = ({ currentPath, isMobile, onItemClick }: NavItemsProps) => {
  return (
    <List $mobile={isMobile}>
      {links.map((link) => {
        const isActive = isActivePath(currentPath, link.href);

        return (
          <Item key={link.href}>
            <StyledLink
              href={link.href}
              $active={isActive}
              $mobile={isMobile}
              onClick={onItemClick}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </StyledLink>
          </Item>
        );
      })}
    </List>
  );
};

export default NavItems;

const List = styled.ul<{ $mobile?: boolean }>`
  display: flex;
  flex-direction: ${({ $mobile }) => ($mobile ? 'column' : 'row')};
  align-items: ${({ $mobile }) => ($mobile ? 'stretch' : 'center')};
  gap: ${({ $mobile }) => ($mobile ? '0.4rem' : '0.3rem')};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
`;

const StyledLink = styled(Link)<{ $active: boolean; $mobile?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $mobile }) => ($mobile ? 'space-between' : 'center')};
  width: ${({ $mobile }) => ($mobile ? '100%' : 'auto')};
  font-size: ${({ $mobile }) => ($mobile ? '1.15rem' : '0.92rem')};
  letter-spacing: ${({ $mobile }) => ($mobile ? '0.06rem' : '0.05rem')};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.darkGreen : theme.colors.title};
  text-transform: uppercase;
  min-height: ${({ $mobile }) => ($mobile ? '2.8rem' : '2.35rem')};
  padding: ${({ $mobile }) => ($mobile ? '0.7rem 0.95rem' : '0.55rem 0.85rem')};
  white-space: nowrap;
  border: 1px solid
    ${({ $active }) => ($active ? 'rgba(33, 65, 42, 0.35)' : 'transparent')};
  background: ${({ $active, $mobile }) =>
    $active
      ? 'rgba(33, 65, 42, 0.09)'
      : $mobile
        ? 'rgba(255, 255, 255, 0.42)'
        : 'transparent'};
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.darkGreen};
    border-color: rgba(33, 65, 42, 0.3);
    background: rgba(33, 65, 42, 0.08);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(33, 65, 42, 0.38);
    outline-offset: 2px;
  }
`;
