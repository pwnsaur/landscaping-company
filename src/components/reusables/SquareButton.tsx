import Link from 'next/link';
import styled, { css } from 'styled-components';

interface SqareButtonProps {
  name: string;
  destination: 'services' | 'projects' | 'contacts';
  isInverted?: boolean;
}

const SqareButton = ({ name, destination, isInverted }: SqareButtonProps) => {
  return (
    <Link href={`/${destination}`}>
      <Button $inverted={isInverted}>{name}</Button>
    </Link>
  );
};

export default SqareButton;

const Button = styled.button<{ $inverted?: boolean }>`
  min-width: 9rem;
  height: 3rem;
  padding: 0 ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  letter-spacing: 0.04rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${({ theme, $inverted }) => {
    const { darkGreen } = theme.colors;

    return css`
      background-color: ${$inverted ? darkGreen : theme.colors.surfaceElevated};
      border: 1px solid ${$inverted ? theme.colors.surfaceElevated : darkGreen};
      color: ${$inverted ? theme.colors.surfaceElevated : darkGreen};
      box-shadow: ${theme.shadows.soft};

      &:hover {
        transform: translateY(-1px);
        background-color: ${$inverted ? theme.colors.surfaceElevated : darkGreen};
        border-color: ${$inverted ? darkGreen : theme.colors.surfaceElevated};
        color: ${$inverted ? darkGreen : theme.colors.surfaceElevated};
      }
    `;
  }}
`;
