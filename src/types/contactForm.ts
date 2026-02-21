export type ContactFormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFormFieldName = keyof ContactFormFields;

export type ContactFormErrors = Partial<Record<ContactFormFieldName, string>>;

export type ContactFormPayload = ContactFormFields & {
  recaptcha: string;
  website?: string;
  formStartedAt?: number;
};

export type ContactFormApiResponse = {
  success: boolean;
  message: string;
  errors?: ContactFormErrors;
};
