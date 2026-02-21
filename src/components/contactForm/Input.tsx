import { FieldInput } from '@/components/ui/form/primitives';

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
    <FieldInput
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
