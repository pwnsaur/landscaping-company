import { useState } from 'react';

import { FormData } from '@/types/contactForm';
import sendEmail from '@/utils/sendEmail';

const useEmailSubmit = () => {
  const [responseMessage, setResponseMessage] = useState({
    isSuccessful: false,
    message: '',
  });

  const submitEmail = async (formData: FormData) => {
    try {
      const req = await sendEmail(formData);
      if (req.ok) {
        setResponseMessage({
          isSuccessful: true,
          message: 'Ziņojums nosūtīts, paldies!',
        });
        return true;
      }

      const body = (await req.json().catch(() => null)) as
        | { error?: string }
        | null;
      setResponseMessage({
        isSuccessful: false,
        message: body?.error || 'Ziņojumu neizdevās nosūtīt.',
      });
      return false;
    } catch (e) {
      setResponseMessage({
        isSuccessful: false,
        message:
          e instanceof Error && e.message
            ? e.message
            : 'Ziņojumu neizdevās nosūtīt.',
      });
    }
    return false;
  };

  return {
    responseMessage,
    submitEmail,
  };
};

export default useEmailSubmit;
