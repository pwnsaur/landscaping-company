import styled from 'styled-components';

import { FieldTextarea } from '@/components/ui/form/primitives';
import { theme } from '@/styles/theme';

type TextareaProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  maxLength?: number;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
};

const Textarea = ({
  id,
  label,
  value,
  placeholder,
  maxLength,
  error,
  onChange,
  onBlur,
  required,
}: TextareaProps) => {
  const errorId = error ? `${id}-error` : undefined;
  const charCount = value.length;

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldTextarea
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      <FieldMetaRow>
        <FieldError id={errorId}>{error}</FieldError>
        {maxLength && <FieldCounter>{`${charCount}/${maxLength}`}</FieldCounter>}
      </FieldMetaRow>
    </Field>
  );
};

export default Textarea;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
`;

const FieldLabel = styled.label`
  font-size: ${theme.typography.labelStrong};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.trackingWide};
  color: ${theme.semantic.text.strong};
`;

const FieldMetaRow = styled.div`
  min-height: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.xs};
`;

const FieldError = styled.p`
  margin: 0;
  font-size: ${theme.typography.meta};
  color: ${theme.colors.errorText};
`;

const FieldCounter = styled.span`
  margin-left: auto;
  font-size: ${theme.typography.meta};
  color: ${theme.semantic.text.subtle};
`;
