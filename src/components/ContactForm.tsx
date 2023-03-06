import { useState } from 'react';
import styled from 'styled-components';
import { FromData } from 'types';

type ContactFormProps = {
  onSubmit: (formData: FromData) => void;
};

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      message,
    };

    try {
      console.log(formData);
      onSubmit(formData);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Vārds, uzvārds'
          required
        />
      </Label>

      <Label>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='Epasts'
          required
        />
      </Label>

      <Label>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder='Ievadiet ziņojumu'
          required
        />
      </Label>

      <Button type='submit'>Apstiprināt</Button>
    </Form>
  );
};

export default ContactForm;

const Form = styled.form`
  width: 70vw;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  width: 100%;

  input,
  textarea {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;
  }
  input:focus,
  textarea:focus {
    outline: none;
    border-color: green;
  }
  textarea {
    height: 200px;
    resize: none;
  }
  ::placeholder {
    color: #aaa;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #05ac05;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px green;
  }
`;
