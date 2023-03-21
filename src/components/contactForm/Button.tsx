import styled from 'styled-components';

type ButtonProps = {
  type: 'submit';
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ type, onClick, children }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #05ac05;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px green;
  }
`;

export default Button;
