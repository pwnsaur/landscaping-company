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
  website: string;
  formStartedAt: number;
};

export type ContactFormApiErrorCode =
  | 'mail_config_missing'
  | 'mail_app_password_required'
  | 'mail_auth_failed'
  | 'mail_transport_unavailable'
  | 'mail_send_failed';

export type ContactFormApiResponse = {
  success: boolean;
  message: string;
  errors?: ContactFormErrors;
  code?: ContactFormApiErrorCode;
};
