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
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.lineSoft};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.glowSoft};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: 1.4;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.darkGreen};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
