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
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  margin: 1.5rem 0 2.5rem;
  width: 100%;
  height: 10rem;
  resize: none;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.lightGreen};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;
