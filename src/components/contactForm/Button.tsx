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
  padding: 0.65rem 1.2rem;
  min-width: 8.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  background-color: ${({ theme }) => theme.colors.darkGreen};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.darkGreen};
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
    background-color: rgba(33, 65, 42, 0.35);
    border-color: rgba(33, 65, 42, 0.28);
    color: ${({ theme }) => theme.colors.grey};
    cursor: not-allowed;
  }
`;

export default Button;
