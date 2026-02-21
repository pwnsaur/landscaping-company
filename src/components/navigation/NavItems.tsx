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
  gap: ${({ theme, $mobile }) =>
    $mobile ? theme.spacing.xs : theme.spacing.xxs};
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
  font-size: ${({ theme, $mobile }) =>
    $mobile
      ? theme.components.nav.linkSizeMobile
      : theme.components.nav.linkSizeDesktop};
  letter-spacing: ${({ theme, $mobile }) =>
    $mobile
      ? theme.components.nav.linkTrackingMobile
      : theme.components.nav.linkTrackingDesktop};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.darkGreen : theme.semantic.text.strong};
  text-transform: uppercase;
  min-height: ${({ theme, $mobile }) =>
    $mobile
      ? theme.components.nav.linkHeightMobile
      : theme.components.nav.linkHeightDesktop};
  padding: ${({ theme, $mobile }) =>
    $mobile
      ? theme.components.nav.linkPaddingMobile
      : theme.components.nav.linkPaddingDesktop};
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.semantic.border.strong : 'transparent'};
  background: ${({ theme, $active, $mobile }) =>
    $active
      ? theme.semantic.interactive.active
      : $mobile
        ? theme.colors.glowSoft
        : 'transparent'};
  transition:
    color ${({ theme }) => theme.motion.normal} ${({ theme }) => theme.motion.easing},
    background-color ${({ theme }) => theme.motion.normal}
      ${({ theme }) => theme.motion.easing},
    border-color ${({ theme }) => theme.motion.normal}
      ${({ theme }) => theme.motion.easing},
    transform ${({ theme }) => theme.motion.normal}
      ${({ theme }) => theme.motion.easing};

  &:hover {
    color: ${({ theme }) => theme.colors.darkGreen};
    border-color: ${({ theme }) => theme.semantic.border.strong};
    background: ${({ theme }) => theme.semantic.interactive.ghost};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.semantic.border.strong};
    outline-offset: 2px;
  }
`;
