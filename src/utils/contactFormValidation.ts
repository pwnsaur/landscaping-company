import type {
  ContactFormErrors,
  ContactFormFieldName,
  ContactFormFields,
} from '@/types/contactForm';

export const CONTACT_FORM_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  phoneMin: 7,
  phoneMax: 32,
  messageMin: 10,
  messageMax: 1500,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_PATTERN = /^[+\d][\d\s().-]{6,31}$/;
const CONTROL_CHAR_PATTERN = /[\u0000-\u001f\u007f]/g;

const sanitizeSingleLine = (value: string) => {
  return value
    .replace(CONTROL_CHAR_PATTERN, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const sanitizeMultiline = (value: string) => {
  return value
    .replace(CONTROL_CHAR_PATTERN, '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const asString = (value: unknown) => {
  return typeof value === 'string' ? value : '';
};

export const normalizeContactFormFields = (
  input: Partial<Record<ContactFormFieldName, unknown>>
): ContactFormFields => {
  return {
    name: sanitizeSingleLine(asString(input.name)),
    email: sanitizeSingleLine(asString(input.email)).toLowerCase(),
    phone: sanitizeSingleLine(asString(input.phone)),
    message: sanitizeMultiline(asString(input.message)),
  };
};

export const validateContactFormFields = (
  values: ContactFormFields
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!values.name) {
    errors.name = 'Lūdzu ievadiet vārdu.';
  } else if (values.name.length < CONTACT_FORM_LIMITS.nameMin) {
    errors.name = 'Vārdam jābūt vismaz 2 rakstzīmēm.';
  } else if (values.name.length > CONTACT_FORM_LIMITS.nameMax) {
    errors.name = 'Vārds ir pārāk garš.';
  }

  if (!values.email) {
    errors.email = 'Lūdzu ievadiet e-pastu.';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Ievadiet derīgu e-pasta adresi.';
  }

  if (!values.phone) {
    errors.phone = 'Lūdzu ievadiet tālruni.';
  } else if (
    values.phone.length < CONTACT_FORM_LIMITS.phoneMin ||
    values.phone.length > CONTACT_FORM_LIMITS.phoneMax ||
    !PHONE_PATTERN.test(values.phone)
  ) {
    errors.phone = 'Ievadiet derīgu tālruņa numuru.';
  }

  if (!values.message) {
    errors.message = 'Lūdzu ievadiet ziņojumu.';
  } else if (values.message.length < CONTACT_FORM_LIMITS.messageMin) {
    errors.message = 'Ziņojumam jābūt vismaz 10 rakstzīmēm.';
  } else if (values.message.length > CONTACT_FORM_LIMITS.messageMax) {
    errors.message = 'Ziņojums ir pārāk garš.';
  }

  return errors;
};

export const hasContactFormErrors = (errors: ContactFormErrors) => {
  return Object.values(errors).some(Boolean);
};

export const getContactFieldError = (
  fieldName: ContactFormFieldName,
  values: ContactFormFields
) => {
  return validateContactFormFields(values)[fieldName];
};

export const isContactFormFieldName = (value: string): value is ContactFormFieldName => {
  return ['name', 'email', 'phone', 'message'].includes(value);
};

export const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};
