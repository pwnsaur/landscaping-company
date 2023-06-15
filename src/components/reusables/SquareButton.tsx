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
  padding: 0 1rem;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${({ theme, $inverted }) => {
    const { background, darkGreen } = theme.colors;

    return css`
      background-color: ${$inverted ? darkGreen : background};
      border: 2px solid ${$inverted ? background : darkGreen};
      color: ${$inverted ? background : darkGreen};

      &:hover {
        background-color: ${$inverted ? background : darkGreen};
        border-color: ${$inverted ? darkGreen : background};
        color: ${$inverted ? darkGreen : background};
      }
    `;
  }}
`;
