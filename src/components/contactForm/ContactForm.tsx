import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useContactForm from '@utils/hooks/useContactForm';
import useEmailSubmit from '@utils/hooks/useEmailSubmit';
import Textarea from '@components/contactForm/Textarea';
import Input from '@components/contactForm/Input';
import Button from '@components/contactForm/Button';
import SubmitModal from '@components/contactForm/SubmitModal';

const ContactForm = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { formData, handleChange, reset } = useContactForm();
  const { responseMessage, submitEmail } = useEmailSubmit();

  const handleModalClose = () => setModalOpen(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log('get rekt robot');
      return;
    }

    const recaptchaToken = await executeRecaptcha('contact_form_submit');

    await submitEmail({ ...formData, recaptcha: recaptchaToken });
    reset();
    setModalOpen(true);
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
        <Button type='submit'>Apstiprināt</Button>
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
