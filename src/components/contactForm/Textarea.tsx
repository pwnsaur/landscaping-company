import {
  FieldCounterText,
  FieldErrorText,
  FieldLabel,
  FieldMetaRow,
  FieldStack,
  FieldTextarea,
} from '@/components/ui/form/primitives';

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
    <FieldStack>
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
        <FieldErrorText id={errorId}>{error}</FieldErrorText>
        {maxLength && <FieldCounterText>{`${charCount}/${maxLength}`}</FieldCounterText>}
      </FieldMetaRow>
    </FieldStack>
  );
};

export default Textarea;
