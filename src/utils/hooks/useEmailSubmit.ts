import axios from 'axios';
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
      if (req.status === 250) {
        setResponseMessage({
          isSuccessful: true,
          message: 'Ziņojums nosūtīts, paldies!',
        });
        return true;
      }
    } catch (e) {
      const responseErrorMessage = axios.isAxiosError(e)
        ? (e.response?.data as { error?: string } | undefined)?.error
        : undefined;

      setResponseMessage({
        isSuccessful: false,
        message: responseErrorMessage || 'Ziņojumu neizdevās nosūtīt.',
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
