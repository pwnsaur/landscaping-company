import { ContactFormPayload } from '@/types/contactForm';

const sendEmail = async (
  formData: ContactFormPayload,
  signal?: AbortSignal
): Promise<Response> => {
  return fetch('/api/send-mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    signal,
    body: JSON.stringify(formData),
  });
};

export default sendEmail;
