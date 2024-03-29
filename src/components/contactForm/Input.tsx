import styled from 'styled-components';

type InputProps = {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  id,
  type,
  value,
  placeholder,
  onChange,
  required,
}: InputProps) => {
  return (
    <StyledInput
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  margin: 15px 0;
  width: 100%;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.lightGreen};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;
