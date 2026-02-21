import styled from 'styled-components';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick }) => (
  <StyledHamburgerIcon
    onClick={onClick}
    open={isOpen}
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

const StyledHamburgerIcon = styled.button<{ open: boolean }>`
  width: 2.7rem;
  height: 2.7rem;
  position: ${({ open }) => (open ? 'fixed' : 'static')};
  top: ${({ open }) => (open ? '1.25rem' : 'auto')};
  left: ${({ open, theme }) => (open ? theme.spacing.md : 'auto')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  background: ${({ theme }) => theme.colors.glowSoft};
  border-radius: ${({ theme }) => theme.radii.sm};
  transform: rotate(0deg);
  transition: 0.28s ease-in-out;
  cursor: pointer;
  margin: 0;
  z-index: 8;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.lineStrong};
    outline-offset: 2px;
  }

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 1.3rem;
    background: ${({ theme }) => theme.colors.black};
    border-radius: 2px;
    opacity: 1;
    transform: rotate(0deg);
    transition: 0.24s ease-in-out;

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

  ${({ open }) =>
    open &&
    `
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
