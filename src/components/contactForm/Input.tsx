import styled from 'styled-components';

type InputProps = {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  id,
  type,
  value,
  placeholder,
  autoComplete,
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
      autoComplete={autoComplete}
      required={required}
    />
  );
};

export default Input;

const StyledInput = styled.input`
  width: 100%;
  min-height: 2.9rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid rgba(57, 65, 47, 0.24);
  background: rgba(255, 255, 255, 0.88);
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: 1.4;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.darkGreen};
    box-shadow: 0 0 0 3px rgba(33, 65, 42, 0.12);
  }

  ::placeholder {
    color: rgba(57, 65, 47, 0.6);
  }
`;
