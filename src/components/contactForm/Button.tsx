import styled from 'styled-components';

type ButtonProps = {
  type: 'submit';
  children: React.ReactNode;
  disabled: boolean;
  onClick?: () => void;
};

const Button = ({ children, type, disabled, onClick }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  min-width: 8.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  background-color: ${({ theme }) => theme.colors.darkGreen};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.darkGreen};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    background-color: transparent;
    color: ${({ theme }) => theme.colors.darkGreen};
  }

  &:disabled {
    transform: none;
    background-color: ${({ theme }) => theme.colors.interactiveMuted};
    border-color: ${({ theme }) => theme.colors.interactiveMutedBorder};
    color: ${({ theme }) => theme.colors.grey};
    cursor: not-allowed;
  }
`;

export default Button;
