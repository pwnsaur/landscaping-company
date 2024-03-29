import styled from 'styled-components';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick }) => (
  <StyledHamburgerIcon onClick={onClick} open={isOpen}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </StyledHamburgerIcon>
);

export default HamburgerIcon;

const StyledHamburgerIcon = styled.div<{ open: boolean }>`
  width: 45px;
  height: 28px;
  position: ${({ open }) => (open ? 'fixed' : 'static')};
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;
  margin: 2rem;
  z-index: 4;

  span {
    display: block;
    position: absolute;
    height: 5px;
    width: 100%;
    background: ${({ theme }) => theme.colors.black};
    border-radius: 5px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 12px;
    }

    &:nth-child(4) {
      top: 24px;
    }
  }

  ${({ open }) =>
    open &&
    `
    span:nth-child(1) {
      top: 12px;
      width: 0%;
      left: 50%;
    }

    span:nth-child(2) {
      transform: rotate(45deg);
    }

    span:nth-child(3) {
      transform: rotate(-45deg);
    }

    span:nth-child(4) {
      top: 12px;
      width: 0%;
      left: 50%;
    }
  `}
`;
