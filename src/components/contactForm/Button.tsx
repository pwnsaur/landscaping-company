import styled from 'styled-components';

type ButtonProps = {
  type: 'submit';
  children: React.ReactNode;
  disabled: boolean;
  onClick?: () => void;
};

const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 0.5rem;
  min-width: 5rem;
  background-color: ${({ theme }) => theme.colors.darkGreen};
  color: white;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGreen};
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;

export default Button;
