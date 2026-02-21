import styled from 'styled-components';

import { ActionLink } from '@/components/ui/actions/primitives';

interface SquareButtonProps {
  name: string;
  destination: 'services' | 'projects' | 'contacts';
  isInverted?: boolean;
}

const SquareButton = ({ name, destination, isInverted }: SquareButtonProps) => {
  return (
    <Button
      href={`/${destination}`}
      $variant={isInverted ? 'inverse' : 'outline'}
      $size='md'
    >
      {name}
    </Button>
  );
};

export default SquareButton;

const Button = styled(ActionLink)`
  min-width: ${({ theme }) => theme.components.action.squareMinWidth};
  min-height: ${({ theme }) => theme.components.action.squareMinHeight};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  letter-spacing: ${({ theme }) => theme.components.action.squareTracking};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;
