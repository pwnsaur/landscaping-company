import styled, { css } from 'styled-components';

import { theme } from '@/styles/theme';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerIcon = ({ isOpen, onClick }: HamburgerIconProps) => (
  <StyledHamburgerIcon
    onClick={onClick}
    $open={isOpen}
    aria-label={isOpen ? 'Aizvērt navigāciju' : 'Atvērt navigāciju'}
    aria-expanded={isOpen}
    aria-controls='mobile-nav'
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </StyledHamburgerIcon>
);

export default HamburgerIcon;

const StyledHamburgerIcon = styled.button<{ $open: boolean }>`
  width: 2.7rem;
  height: 2.7rem;
  position: ${({ $open }) => ($open ? 'fixed' : 'static')};
  top: ${({ $open }) => ($open ? '1.25rem' : 'auto')};
  left: ${({ $open }) => ($open ? theme.spacing.md : 'auto')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${theme.semantic.border.strong};
  background: ${theme.colors.glowSoft};
  border-radius: ${theme.radii.sm};
  transform: rotate(0deg);
  transition: transform ${theme.motion.slow} ${theme.motion.easingEmphasized};
  cursor: pointer;
  margin: 0;
  z-index: ${theme.zIndex.floating};

  &:focus-visible {
    outline: 2px solid ${theme.semantic.border.strong};
    outline-offset: 2px;
  }

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 1.3rem;
    background: ${theme.colors.black};
    border-radius: ${theme.radii.sm};
    opacity: 1;
    transform: rotate(0deg);
    transition:
      transform ${theme.motion.normal} ${theme.motion.easing},
      top ${theme.motion.normal} ${theme.motion.easing},
      width ${theme.motion.normal} ${theme.motion.easing};

    &:nth-child(1) {
      top: 0.86rem;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 1.28rem;
    }

    &:nth-child(4) {
      top: 1.7rem;
    }
  }

  ${({ $open }) =>
    $open &&
    css`
      span:nth-child(1) {
        top: 1.28rem;
        width: 0%;
      }

      span:nth-child(2) {
        transform: rotate(45deg);
      }

      span:nth-child(3) {
        transform: rotate(-45deg);
      }

      span:nth-child(4) {
        top: 1.28rem;
        width: 0%;
      }
    `}
`;
