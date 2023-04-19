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
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #05ac05;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px green;
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #05ac05;
  }

  &:focus:not(:disabled) {
    outline: none;
    box-shadow: 0 0 0 2px green;
  }
`;

export default Button;
