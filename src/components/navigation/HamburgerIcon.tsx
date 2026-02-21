import styled, { css } from 'styled-components';

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
  width: ${({ theme }) => theme.components.iconButton.size};
  height: ${({ theme }) => theme.components.iconButton.size};
  position: ${({ $open }) => ($open ? 'fixed' : 'static')};
  top: ${({ $open, theme }) =>
    $open ? theme.components.iconButton.topOffset : 'auto'};
  left: ${({ $open, theme }) => ($open ? theme.spacing.md : 'auto')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  background: ${({ theme }) => theme.colors.glowSoft};
  border-radius: ${({ theme }) => theme.radii.sm};
  transform: rotate(0deg);
  transition: transform ${({ theme }) => theme.motion.slow}
    ${({ theme }) => theme.motion.easingEmphasized};
  cursor: pointer;
  margin: 0;
  z-index: ${({ theme }) => theme.zIndex.floating};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.lineStrong};
    outline-offset: 2px;
  }

  span {
    display: block;
    position: absolute;
    height: ${({ theme }) => theme.components.iconButton.lineThickness};
    width: ${({ theme }) => theme.components.iconButton.lineWidth};
    background: ${({ theme }) => theme.colors.black};
    border-radius: ${({ theme }) => theme.radii.sm};
    opacity: 1;
    transform: rotate(0deg);
    transition: transform ${({ theme }) => theme.motion.normal}
        ${({ theme }) => theme.motion.easing},
      top ${({ theme }) => theme.motion.normal} ${({ theme }) => theme.motion.easing},
      width ${({ theme }) => theme.motion.normal}
        ${({ theme }) => theme.motion.easing};

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
