import styled, { css } from 'styled-components';
import Link from 'next/link';

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

// const Button = styled.button<{ $inverted?: boolean }>`
//   min-width: 6rem;
//   height: 3rem;
//   padding: 0 1rem;
//   background-color: ${({ theme, $inverted }) =>
//     $inverted ? theme.colors.darkGreen : theme.colors.background};
//   border: 2px solid
//     ${({ theme, $inverted }) =>
//       $inverted ? theme.colors.background : theme.colors.darkGreen};
//   color: ${({ theme, $inverted }) =>
//     $inverted ? theme.colors.background : theme.colors.darkGreen};
//   text-transform: uppercase;
//   font-weight: 600;
//   font-size: 1rem;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     background-color: ${({ theme, $inverted }) =>
//       $inverted ? theme.colors.background : theme.colors.darkGreen};
//     border-color: ${({ theme, $inverted }) =>
//       $inverted ? theme.colors.darkGreen : theme.colors.background};
//     color: ${({ theme, $inverted }) =>
//       $inverted ? theme.colors.darkGreen : theme.colors.background};
//   }
// `;

const Button = styled.button<{ $inverted?: boolean }>`
  min-width: 6rem;
  height: 3rem;
  padding: 0 1rem;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

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
