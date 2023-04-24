import styled from 'styled-components';
import { useState } from 'react';
import useContactForm from '@utils/hooks/useContactForm';
import useEmailSubmit from '@utils/hooks/useEmailSubmit';
import Textarea from '@components/contactForm/Textarea';
import Input from '@components/contactForm/Input';
import Button from '@components/contactForm/Button';
import SubmitModal from '@components/contactForm/SubmitModal';

const ContactForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Sūtīt');

  const { formData, handleChange, resetForm } = useContactForm();
  const { responseMessage, submitEmail } = useEmailSubmit();

  const handleModalClose = () => setModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setButtonText('Sūta');
    await submitEmail(formData);
    resetForm();
    setModalOpen(true);
    setDisabled(false);
    setButtonText('Sūtīt');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          id='name'
          type='text'
          value={formData.name}
          onChange={handleChange}
          placeholder='Vārds, uzvārds'
          required
        />
        <Input
          id='email'
          type='email'
          onChange={handleChange}
          value={formData.email}
          placeholder='Epasts'
          required
        />
        <Input
          id='phone'
          type='tel'
          onChange={handleChange}
          value={formData.phone}
          placeholder='Tālrunis'
          required
        />
        <Textarea
          id='message'
          onChange={handleChange}
          value={formData.message}
          placeholder='Ievadiet ziņojumu'
          required
        />
        <Button type='submit' disabled={disabled}>
          {buttonText}
        </Button>
      </Form>
      <SubmitModal
        isOpen={modalOpen}
        message={responseMessage.message}
        isError={!responseMessage.isSuccessful}
        onClose={handleModalClose}
      />
    </>
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
