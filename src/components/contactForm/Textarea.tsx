import styled from 'styled-components';

type TextareaProps = {
  id: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
};

const Textarea = ({
  id,
  value,
  placeholder,
  onChange,
  required,
}: TextareaProps) => {
  return (
    <StyledTextarea
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
};

export default Textarea;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 11rem;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.lineSoft};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.glowSoft};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: 1.55;
  resize: none;
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
