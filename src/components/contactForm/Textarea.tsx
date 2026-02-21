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
  padding: 0.85rem;
  border: 1px solid rgba(57, 65, 47, 0.24);
  background: rgba(255, 255, 255, 0.88);
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: 1.55;
  resize: none;
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
