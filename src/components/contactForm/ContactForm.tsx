import { useState } from 'react';
import styled from 'styled-components';
import { FormData } from '@/types/contentfulTypes';
import Textarea from './Textarea';
import Input from './Input';
import Button from './Button';

type ContactFormProps = {
  onSubmit: (formData: FormData) => void;
};

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
      message,
    };

    try {
      console.log(formData);
      onSubmit(formData);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder='Vārds, uzvārds'
        required
      />
      <Input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder='Epasts'
        required
      />
      <Input
        type='tel'
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        placeholder='Tālrunis'
        required
      />
      <Textarea
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder='Ievadiet ziņojumu'
        required
      />
      <Button type='submit'>Apstiprināt</Button>
    </Form>
  );
};

export default ContactForm;

const Form = styled.form`
  width: 100%;
  /* max-width: 500px; */
  margin: 2rem auto 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
