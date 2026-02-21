import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import styled from 'styled-components';

import Button from '@components/contactForm/Button';
import Input from '@components/contactForm/Input';
import SubmitModal from '@components/contactForm/SubmitModal';
import Textarea from '@components/contactForm/Textarea';
import useContactForm from '@utils/hooks/useContactForm';
import useEmailSubmit from '@utils/hooks/useEmailSubmit';

const ContactForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Sūtīt');
  const [fallbackError, setFallbackError] = useState('');

  const { formData, handleChange, resetForm } = useContactForm();
  const { responseMessage, submitEmail } = useEmailSubmit();

  const handleModalClose = () => setModalOpen(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFallbackError('');
    setDisabled(true);
    setButtonText('Sūta...');

    if (!executeRecaptcha) {
      setFallbackError(
        'Drošības pārbaude nav gatava. Uzgaidi brīdi un mēģini vēlreiz.'
      );
      setModalOpen(true);
      setDisabled(false);
      setButtonText('Sūtīt');
      return;
    }

    const recaptchaToken = await executeRecaptcha('contact_form_submit');

    const isSuccessful = await submitEmail({
      ...formData,
      recaptcha: recaptchaToken,
    });

    if (!isSuccessful) {
      console.log('get rekt robot');
    } else {
      resetForm();
    }

    setModalOpen(true);
    setDisabled(false);
    setButtonText('Sūtīt');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Input
            id='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='Vārds, uzvārds'
            autoComplete='name'
            required
          />
          <Input
            id='email'
            type='email'
            onChange={handleChange}
            value={formData.email}
            placeholder='E-pasts'
            autoComplete='email'
            required
          />
        </Row>
        <Input
          id='phone'
          type='tel'
          onChange={handleChange}
          value={formData.phone}
          placeholder='Tālrunis'
          autoComplete='tel'
          required
        />
        <Textarea
          id='message'
          onChange={handleChange}
          value={formData.message}
          placeholder='Aprakstiet situaciju, velmes un aptuveno teritorijas apjomu'
          required
        />
        <ActionRow>
          <Button type='submit' disabled={disabled}>
            {buttonText}
          </Button>
          <FormHint>
            Nospiežot sūtīt, piekrīti datu izmantošanai, lai ar tevi sazinātos
            par pieprasījumu.
          </FormHint>
        </ActionRow>
      </Form>
      <SubmitModal
        isOpen={modalOpen}
        message={fallbackError || responseMessage.message}
        isError={fallbackError ? true : !responseMessage.isSuccessful}
        onClose={handleModalClose}
      />
    </>
  );
};

export default ContactForm;

const Form = styled.form`
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing.lg} auto 0`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ActionRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FormHint = styled.p`
  line-height: 1.55;
  font-size: ${({ theme }) => theme.components.contacts.formHintSize};
  max-width: 60ch;
  color: ${({ theme }) => theme.colors.text};
`;
