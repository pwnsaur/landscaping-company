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
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin: 15px 0;
  width: 100%;
  outline: none;

  &:focus {
    border-color: green;
  }

  ::placeholder {
    color: #aaa;
  }
`;
