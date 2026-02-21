import { FormData } from '@/types/contactForm';

const sendEmail = async (formData: FormData): Promise<Response> => {
  return fetch('/api/send-mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
};

export default sendEmail;
