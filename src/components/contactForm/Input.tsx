import styled from 'styled-components';

import { FieldInput } from '@/components/ui/form/primitives';

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
    <Field>
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
    </Field>
  );
};

export default Input;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.labelStrong};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.trackingWide};
  color: ${({ theme }) => theme.semantic.text.strong};
`;

const FieldError = styled.p`
  min-height: 1.15rem;
  margin: 0;
  font-size: ${({ theme }) => theme.typography.meta};
  color: ${({ theme }) => theme.colors.errorText};
`;
