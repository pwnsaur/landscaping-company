import React from 'react';
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
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin: 15px 0;
  width: 100%;
  height: 200px;
  resize: none;
  outline: none;

  &:focus {
    border-color: green;
  }

  ::placeholder {
    color: #aaa;
  }
`;
