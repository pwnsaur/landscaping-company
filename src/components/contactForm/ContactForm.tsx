import { useState } from 'react';
import styled from 'styled-components';
import Textarea from './Textarea';
import Input from './Input';
import Button from './Button';
import useContactForm from '@/utils/hooks/useContactForm';
import sendEmail from '@/utils/sendEmail';

const ContactForm = () => {
  const { values, handleChange } = useContactForm();
  const [responseMessage, setResponseMessage] = useState({
    isSuccessful: false,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const req = await sendEmail(values);
      if (req.status === 250) {
        setResponseMessage({
          isSuccessful: true,
          message: 'Thanks for the message!',
        });
      }
    } catch (e) {
      setResponseMessage({
        isSuccessful: false,
        message: 'get rekt lmao',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        id='name'
        type='text'
        value={values.name}
        onChange={handleChange}
        placeholder='Vārds, uzvārds'
        required
      />
      <Input
        id='email'
        type='email'
        onChange={handleChange}
        value={values.email}
        placeholder='Epasts'
        required
      />
      <Input
        id='phone'
        type='tel'
        onChange={handleChange}
        value={values.phone}
        placeholder='Tālrunis'
        required
      />
      <Textarea
        id='message'
        onChange={handleChange}
        value={values.message}
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
  margin: 2rem auto 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
