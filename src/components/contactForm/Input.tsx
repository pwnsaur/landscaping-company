import styled from 'styled-components';

import {
  FieldErrorText,
  FieldInput,
  FieldLabel,
  FieldStack,
} from '@/components/ui/form/primitives';

type InputProps = {
  id: string;
  type: string;
  label: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
  maxLength?: number;
  required?: boolean;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = ({
  id,
  type,
  label,
  value,
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  onChange,
  onBlur,
  required,
  error,
}: InputProps) => {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <FieldStack>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldInput
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </FieldStack>
  );
};

export default Input;

const FieldError = styled(FieldErrorText)`
  min-height: 1.15rem;
`;
