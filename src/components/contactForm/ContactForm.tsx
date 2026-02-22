import { useRef, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import styled from 'styled-components';

import {
  ContactFormErrors,
  ContactFormFieldName,
} from '@/types/contactForm';
import {
  CONTACT_FORM_LIMITS,
  getContactFieldError,
  hasContactFormErrors,
  isContactFormFieldName,
  normalizeContactFormFields,
  validateContactFormFields,
} from '@/utils/contactFormValidation';
import { submitEmail } from '@/utils/submitEmail';
import Button from '@components/contactForm/Button';
import Input from '@components/contactForm/Input';
import SubmitModal from '@components/contactForm/SubmitModal';
import Textarea from '@components/contactForm/Textarea';
import useContactForm from '@utils/hooks/useContactForm';
import { media } from '@/styles/media';
import { theme } from '@/styles/theme';

const RECAPTCHA_ACTION = 'contact_form_submit';
const FIELD_ORDER: ContactFormFieldName[] = ['name', 'email', 'phone', 'message'];

const ContactForm = () => {
  const [submitResult, setSubmitResult] = useState({
    isModalOpen: false,
    message: '',
    isError: false,
  });
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [website, setWebsite] = useState('');
  const formStartedAtRef = useRef(Date.now());

  const { formData, handleChange, resetForm } = useContactForm();

  const closeModal = () => {
    setSubmitResult((prev) => ({ ...prev, isModalOpen: false }));
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const openModal = (message: string, isError: boolean) => {
    setSubmitResult({ isModalOpen: true, message, isError });
  };

  const focusFirstInvalidField = (errors: ContactFormErrors) => {
    for (const field of FIELD_ORDER) {
      if (!errors[field]) {
        continue;
      }

      document.getElementById(field)?.focus();
      break;
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChange(e);
    const { id, value } = e.target;

    if (!isContactFormFieldName(id) || !formErrors[id]) {
      return;
    }

    const nextValues = normalizeContactFormFields({
      ...formData,
      [id]: value,
    });
    const nextError = getContactFieldError(id, nextValues);

    setFormErrors((prevState) => ({
      ...prevState,
      [id]: nextError,
    }));
  };

  const handleFieldBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id } = e.target;

    if (!isContactFormFieldName(id)) {
      return;
    }

    const normalized = normalizeContactFormFields(formData);

    setFormErrors((prevState) => ({
      ...prevState,
      [id]: getContactFieldError(id, normalized),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    const normalized = normalizeContactFormFields(formData);
    const validationErrors = validateContactFormFields(normalized);

    setFormErrors(validationErrors);

    if (hasContactFormErrors(validationErrors)) {
      setSubmitResult({
        isModalOpen: false,
        message: 'Lūdzu izlabo atzīmētos laukus un mēģini vēlreiz.',
        isError: true,
      });
      focusFirstInvalidField(validationErrors);
      return;
    }

    setSubmitResult({ isModalOpen: false, message: '', isError: false });
    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        openModal(
          'Drošības pārbaude nav gatava. Uzgaidi brīdi un mēģini vēlreiz.',
          true
        );
        return;
      }

      const recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTION);

      if (!recaptchaToken) {
        openModal(
          'Neizdevās pabeigt drošības pārbaudi. Mēģini vēlreiz pēc brīža.',
          true
        );
        return;
      }

      const result = await submitEmail({
        ...normalized,
        recaptcha: recaptchaToken,
        website,
        formStartedAt: formStartedAtRef.current,
      });

      if (result.errors) {
        setFormErrors((prevState) => ({
          ...prevState,
          ...result.errors,
        }));
      }

      openModal(result.message, !result.isSuccessful);

      if (result.isSuccessful) {
        resetForm();
        setFormErrors({});
        setWebsite('');
        formStartedAtRef.current = Date.now();
      }
    } catch {
      openModal('Ziņojumu neizdevās nosūtīt. Mēģini vēlreiz.', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate>
        <HoneypotField aria-hidden='true'>
          <label htmlFor='website'>Mājaslapa</label>
          <input
            id='website'
            name='website'
            type='text'
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            autoComplete='off'
            tabIndex={-1}
          />
        </HoneypotField>
        <Row>
          <Input
            id='name'
            label='Vārds'
            type='text'
            value={formData.name}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            placeholder='Vārds, uzvārds'
            autoComplete='name'
            maxLength={CONTACT_FORM_LIMITS.nameMax}
            error={formErrors.name}
            required
          />
          <Input
            id='email'
            label='E-pasts'
            type='email'
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            value={formData.email}
            placeholder='E-pasts'
            autoComplete='email'
            inputMode='email'
            error={formErrors.email}
            required
          />
        </Row>
        <Input
          id='phone'
          label='Tālrunis'
          type='tel'
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          value={formData.phone}
          placeholder='Tālrunis'
          autoComplete='tel'
          inputMode='tel'
          maxLength={CONTACT_FORM_LIMITS.phoneMax}
          error={formErrors.phone}
          required
        />
        <Textarea
          id='message'
          label='Ziņojums'
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          value={formData.message}
          placeholder='Aprakstiet situāciju, vēlmes un aptuveno teritorijas apjomu'
          maxLength={CONTACT_FORM_LIMITS.messageMax}
          error={formErrors.message}
          required
        />
        <ActionRow>
          <Button type='submit' disabled={isSubmitting} isLoading={isSubmitting}>
            {isSubmitting ? 'Sūta...' : 'Sūtīt'}
          </Button>
          <FormHint>
            Nospiežot sūtīt, piekrīti datu izmantošanai, lai ar tevi sazinātos
            par pieprasījumu.
          </FormHint>
        </ActionRow>
        <FormStatus
          role={submitResult.isError ? 'alert' : 'status'}
          $isError={submitResult.isError}
        >
          {submitResult.message}
        </FormStatus>
      </Form>
      <SubmitModal
        isOpen={submitResult.isModalOpen}
        message={submitResult.message}
        isError={submitResult.isError}
        onClose={closeModal}
      />
    </>
  );
};

export default ContactForm;

const Form = styled.form`
  width: 100%;
  margin: ${theme.spacing.lg} auto 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing.md};

  ${media.down('md')`
    grid-template-columns: 1fr;
  `}
`;

const ActionRow = styled.div`
  margin-top: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};

  ${media.down('sm')`
    flex-direction: column;
    align-items: stretch;
  `}
`;

const HoneypotField = styled.div`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const FormHint = styled.p`
  line-height: ${theme.typography.lineHeightBody};
  font-size: 0.84rem;
  max-width: 60ch;
  color: ${theme.semantic.text.primary};
`;

const FormStatus = styled.p<{ $isError: boolean }>`
  min-height: 1.25rem;
  margin: 0;
  font-size: ${theme.typography.meta};
  color: ${({ $isError }) => ($isError ? theme.colors.errorText : theme.semantic.text.primary)};
`;
